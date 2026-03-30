
import { bandaInterface } from "@/interface/interfaces";
import { ClienteBrowserSupabase } from "@/lib/supabase";

export async function getAllBandas() {
    try {
        const { data, error } = await ClienteBrowserSupabase.from('bandas').select('*').order('nombre_banda', { ascending: true });

        if (error) {
            console.error(error);
            return [];
        }
        return data as bandaInterface[];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getBandaById(id: string) {
    try {
        const { data, error } = await ClienteBrowserSupabase.from('bandas').select('*').eq('id_banda', id);
        if (error) {
            console.error(error);
            return [];
        }
        return data as bandaInterface[];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getFilterByCategoria(categoria: string) {
    try {
        if (categoria === 'todas' || categoria === '') {
            return await getAllBandas();
        }
        const { data, error } = await ClienteBrowserSupabase.from('bandas').select('*').eq('categoria_banda', categoria);
        if (error) {
            console.error(error);
            return [];
        }
        return data as bandaInterface[];
    } catch (error) {
        console.error(error);
        return [];
    }
}


export async function createBanda(banda: bandaInterface) {
    try {
        const { data, error } = await ClienteBrowserSupabase.from('bandas').insert(banda);
        if (error) {
            console.error(error);
            return { data: null, error };
        }
        return { data, error: null };
    } catch (error) {
        console.error(error);
        return { data: null, error };
    }
}

export async function updateBanda(id: string, banda: bandaInterface) {
    try {
        const { data, error } = await ClienteBrowserSupabase.from('bandas').update(banda).eq('id_banda', id);
        if (error) {
            console.error(error);
            return { data: null, error };
        }
        return { data, error: null };
    } catch (error) {
        console.error(error);
        return { data: null, error };
    }
}

export async function deleteBanda(id: string) {
    try {
        const { data, error } = await ClienteBrowserSupabase.from('bandas').delete().eq('id_banda', id);
        if (error) {
            console.error(error);
            return { data: null, error };
        }
        return { data, error: null };
    } catch (error) {
        console.error(error);
        return { data: null, error };
    }
}


export async function subirLogoBanda(file: File, nombreArchivo: string): Promise<string | null> {

    const nombreFinal = `${nombreArchivo}`;
    const { data, error } = await ClienteBrowserSupabase.storage
        .from('imgLogoBandas')
        .upload(nombreFinal, file, {
            cacheControl: '3600',
            upsert: true
        });
    if (error) {
        console.error("❌ Error subiendo el logo de la banda:", error);
        throw error;
    }
    return data.path;
}


export async function obtenerUrlLogoBanda(path: string): Promise<string | null> {
    if (!path || path === "") {
        return null;
    }

    try {
        const { data, error } = await ClienteBrowserSupabase.storage
            .from('imgLogoBandas')
            .createSignedUrl(path, 60 * 60 * 24 * 365);

        if (error) {
            console.error("Error obteniendo URL del logo:", error);
            return null;
        }

        return data?.signedUrl ?? null;
    } catch (error) {
        console.error("Error inesperado obteniendo URL del logo:", error);
        return null;
    }
}


export async function editarLogoBanda(file: File, nombreArchivo: string): Promise<string | null> {

    const nombreFinal = `${nombreArchivo}`;
    const { data, error } = await ClienteBrowserSupabase.storage
        .from('imgLogoBandas')
        .update(nombreFinal, file, {
            cacheControl: '3600',
            upsert: true
        });
    if (error) {
        console.error("❌ Error editando el logo de la banda:", error);
        throw error;
    }
    return data.path;
}

export async function updateGruposBanda(id: string, grupo: string, subgrupo: string) {
    try {
        const { data, error } = await ClienteBrowserSupabase
            .from('bandas')
            .update({
                grupo_banda: grupo,
                subgrupo_banda: subgrupo
            })
            .eq('id_banda', id);

        if (error) {
            console.error(error);
            return { data: null, error };
        }
        return { data, error: null };
    } catch (error) {
        console.error(error);
        return { data: null, error };
    }
}

