import { bandaInterface } from "@/interface/interfaces";
import type { TipoDistribucion } from "@/stores/configuracionStore";
import { updateGruposBanda } from "../services/bandasServices";

/** Grupo fijado pero subgrupo se reparte al azar (Fisher-Yates) dentro de cada grupo. */
function distribuirManualSoloSubgrupo(
    subGrupos: number,
    bandasList: bandaInterface[],
): void {
    const gruposPorClave = new Map<string, bandaInterface[]>();
    for (const banda of bandasList) {
        const g = banda.grupo_banda?.trim();
        if (!g) continue;
        if (!gruposPorClave.has(g)) gruposPorClave.set(g, []);
        gruposPorClave.get(g)!.push(banda);
    }

    gruposPorClave.forEach((bandasGrupo) => {
        const n = bandasGrupo.length;
        if (n === 0) return;
        const etiquetasSg: string[] = [];
        for (let i = 0; i < n; i++) {
            etiquetasSg.push(((i % subGrupos) + 1).toString());
        }
        for (let i = etiquetasSg.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [etiquetasSg[i], etiquetasSg[j]] = [etiquetasSg[j], etiquetasSg[i]];
        }
        bandasGrupo.forEach((banda, idx) => {
            void updateGruposBanda(
                banda.id_banda,
                banda.grupo_banda,
                etiquetasSg[idx]!,
            );
        });
    });

    console.log("========================================");
    console.log("Fin: manual_grupo — subgrupos aleatorios por grupo");
    console.log("========================================");
}

export function distribuir(
    tipoDistribucion: TipoDistribucion,
    cantidadGrupos: number,
    subGrupos: number,
    bandasList: bandaInterface[],
): void {
    if (tipoDistribucion === "manual_grupo_subgrupo") {
        return;
    }

    if (tipoDistribucion === "manual_grupo") {
        distribuirManualSoloSubgrupo(subGrupos, bandasList);
        return;
    }

    if (tipoDistribucion === "tabla") {
        // 1. Agrupar por categoría
        const bandasPorCategoria = Object.groupBy(bandasList, (banda) => banda.categoria_banda);
        const bandasConGrupos: bandaInterface[] = [];

        // 2. Asignar grupos y subgrupos a cada banda por categoría
        Object.entries(bandasPorCategoria).forEach(([categoria, bandas]) => {
            if (!bandas) return;

            // Ordenar por posición en tabla
            bandas.sort((a, b) => a.posicion_tabla - b.posicion_tabla);

            bandas.forEach((banda, index) => {
                const numGrupo = (index % cantidadGrupos) + 1;
                const numSubGrupo = (Math.floor(index / cantidadGrupos) % subGrupos) + 1;

                bandasConGrupos.push({
                    ...banda,
                    grupo_banda: numGrupo.toString(),
                    subgrupo_banda: numSubGrupo.toString()
                });

                console.log(`Banda: ${banda.nombre_banda} | Categoria: ${categoria} | G: ${numGrupo} | SG: ${numSubGrupo}`);
            });
        });

        // 3. Intercalar: Primero ordenar por subgrupo, luego por grupo
        // Esto crea el patrón: G1-SG1, G2-SG1, G1-SG2, G2-SG2, etc.
        const DatosFinales = bandasConGrupos.sort((a, b) => {
            const sgA = parseInt(a.subgrupo_banda);
            const sgB = parseInt(b.subgrupo_banda);
            const gA = parseInt(a.grupo_banda);
            const gB = parseInt(b.grupo_banda);

            // Primero por subgrupo, luego por grupo
            if (sgA !== sgB) return sgA - sgB;
            return gA - gB;
        });

        DatosFinales.forEach(banda => {
            updateGruposBanda(banda.id_banda, banda.grupo_banda, banda.subgrupo_banda);
        });

        console.log("========================================");
        console.log("Fin del proceso de distribución");
        console.log("========================================");
    }


    if (tipoDistribucion === "aleatorio") {
        // 1. Agrupar por categoría
        const bandasPorCategoria = Object.groupBy(bandasList, (banda) => banda.categoria_banda);
        const bandasConGrupos: bandaInterface[] = [];

        // 2. Asignar grupos y subgrupos aleatoriamente por categoría
        Object.entries(bandasPorCategoria).forEach(([categoria, bandas]) => {
            if (!bandas) return;

            // Crear todas las combinaciones posibles de grupo-subgrupo
            const combinaciones: string[] = [];
            for (let g = 1; g <= cantidadGrupos; g++) {
                for (let sg = 1; sg <= subGrupos; sg++) {
                    combinaciones.push(`G${g}-SG${sg}`);
                }
            }

            // Mezclar las combinaciones aleatoriamente
            const combinacionesMezcladas = [...combinaciones];
            for (let i = combinacionesMezcladas.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [combinacionesMezcladas[i], combinacionesMezcladas[j]] = [combinacionesMezcladas[j], combinacionesMezcladas[i]];
            }

            // Crear una distribución uniforme para las bandas
            let indexCombinacion = 0;
            const asignacionesUsadas: string[] = [];

            bandas.forEach((banda) => {
                let combinacionAsignada: string;

                // Buscar una combinación que no sea la misma que la anterior
                let intentos = 0;
                do {
                    combinacionAsignada = combinacionesMezcladas[indexCombinacion % combinacionesMezcladas.length];
                    indexCombinacion++;
                    intentos++;

                    // Si después de varios intentos no encontramos una diferente, usamos la primera disponible
                    if (intentos > combinaciones.length) {
                        break;
                    }
                } while (
                    asignacionesUsadas.length > 0 &&
                    asignacionesUsadas[asignacionesUsadas.length - 1] === combinacionAsignada &&
                    intentos < combinaciones.length
                );

                // Extraer grupo y subgrupo de la combinación
                const [grupo, subgrupo] = combinacionAsignada.split('-');
                const numGrupo = grupo.replace('G', '');
                const numSubGrupo = subgrupo.replace('SG', '');

                bandasConGrupos.push({
                    ...banda,
                    grupo_banda: numGrupo,
                    subgrupo_banda: numSubGrupo
                });

                asignacionesUsadas.push(combinacionAsignada);

                console.log(`Banda: ${banda.nombre_banda} | Categoria: ${categoria} | G: ${numGrupo} | SG: ${numSubGrupo}`);
            });
        });

        // 3. Intercalar: Primero ordenar por subgrupo, luego por grupo
        const DatosFinales = bandasConGrupos.sort((a, b) => {
            const sgA = parseInt(a.subgrupo_banda);
            const sgB = parseInt(b.subgrupo_banda);
            const gA = parseInt(a.grupo_banda);
            const gB = parseInt(b.grupo_banda);

            // Primero por subgrupo, luego por grupo
            if (sgA !== sgB) return sgA - sgB;
            return gA - gB;
        });

        DatosFinales.forEach(banda => {
            updateGruposBanda(banda.id_banda, banda.grupo_banda, banda.subgrupo_banda);
        });

        console.log("========================================");
        console.log("Fin del proceso de distribución aleatoria");
        console.log("========================================");
    }
}

/** True si falta grupo o subgrupo (vacío / null / solo espacios). */
export function bandaSinGrupoOSubgrupo(b: bandaInterface): boolean {
    return (
        !String(b.grupo_banda ?? "").trim() ||
        !String(b.subgrupo_banda ?? "").trim()
    );
}
