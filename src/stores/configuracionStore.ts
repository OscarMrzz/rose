import type { configuracionInterface } from "@/interface/interfaces";
import {
  createConfiguracion,
  updateConfiguracion,
} from "@/lib/services/configuracionServices";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type TipoDistribucion =
  | "tabla"
  | "aleatorio"
  | "manual_grupo"
  | "manual_grupo_subgrupo";
export type CantidadEventos = 6 | 8 | 12 | 14 | 18 | 20 | 24;
/** Vista preferida: todo el listado vs uno a uno */
export type TipoMostrar = "todo" | "1a1";

const STORAGE_KEY = "rose-configuracion";

const VALID_TIPOS: TipoDistribucion[] = [
  "tabla",
  "aleatorio",
  "manual_grupo",
  "manual_grupo_subgrupo",
];

function parseTipoDistribucion(
  value: string | null | undefined,
): TipoDistribucion {
  if (value && VALID_TIPOS.includes(value as TipoDistribucion)) {
    return value as TipoDistribucion;
  }
  return "tabla";
}

function parseCantidad(
  value: number | null | undefined,
): CantidadEventos {
  const allowed: CantidadEventos[] = [6, 8, 12, 14, 18, 20, 24];
  if (value != null && allowed.includes(value as CantidadEventos)) {
    return value as CantidadEventos;
  }
  return 6;
}

function parseTipoMostrar(value: string | null | undefined): TipoMostrar {
  return value === "1a1" ? "1a1" : "todo";
}

export type ConfiguracionStore = {
  id_configuracion: string | null;
  tipo_distribucion: TipoDistribucion;
  cantidad_eventos: CantidadEventos;
  tipo_mostrar: TipoMostrar;
  relacion_anfitrion: string;

  setTipoDistribucion: (v: TipoDistribucion) => void;
  setCantidadEventos: (v: CantidadEventos) => void;
  setTipoMostrar: (v: TipoMostrar) => void;
  setRelacionAnfitrion: (v: string) => void;

  /** Rellena estado desde una fila de Supabase (tras iniciar sesión). */
  applyFromServer: (row: configuracionInterface) => void;

  /** Crea o actualiza en Supabase y deja guardado `id_configuracion`. */
  persistToSupabase: () => Promise<{ ok: boolean; message: string }>;

  /** Restablece el store a valores por defecto (al cerrar sesión). */
  reset: () => void;
};

export const useConfiguracionStore = create<ConfiguracionStore>()(
  persist(
    (set, get) => ({
      id_configuracion: null,
      tipo_distribucion: "tabla",
      cantidad_eventos: 6,
      tipo_mostrar: "todo",
      relacion_anfitrion: "",

      setTipoDistribucion: (v) => set({ tipo_distribucion: v }),
      setCantidadEventos: (v) => set({ cantidad_eventos: v }),
      setTipoMostrar: (v) => set({ tipo_mostrar: v }),
      setRelacionAnfitrion: (v) => set({ relacion_anfitrion: v }),

      reset: () =>
        set({
          id_configuracion: null,
          tipo_distribucion: "tabla",
          cantidad_eventos: 6,
          tipo_mostrar: "todo",
          relacion_anfitrion: "",
        }),

      applyFromServer: (row) => {
        set({
          id_configuracion: row.id_configuracion,
          tipo_distribucion: parseTipoDistribucion(row.tipo_distribucion),
          cantidad_eventos: parseCantidad(row.cantidad_eventos),
          tipo_mostrar: parseTipoMostrar(row.tipo_mostrar),
          relacion_anfitrion: row.relacion_anfitrion ?? "",
        });
      },

      persistToSupabase: async () => {
        const s = get();
        const base = {
          tipo_distribucion: s.tipo_distribucion,
          cantidad_eventos: s.cantidad_eventos,
          tipo_mostrar: s.tipo_mostrar,
          relacion_anfitrion: s.relacion_anfitrion.trim() || null,
        };

        if (s.id_configuracion) {
          const { error } = await updateConfiguracion(s.id_configuracion, base);
          if (error) {
            console.error(error);
            return { ok: false, message: "No se pudo actualizar en el servidor." };
          }
          return { ok: true, message: "Configuración guardada." };
        }

        const id = crypto.randomUUID();
        const row: configuracionInterface = {
          id_configuracion: id,
          created_at: new Date().toISOString(),
          ...base,
        };
        const { error } = await createConfiguracion(row);
        if (error) {
          console.error(error);
          return { ok: false, message: "No se pudo crear el registro." };
        }
        set({ id_configuracion: id });
        return { ok: true, message: "Configuración creada y guardada." };
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        id_configuracion: state.id_configuracion,
        tipo_distribucion: state.tipo_distribucion,
        cantidad_eventos: state.cantidad_eventos,
        tipo_mostrar: state.tipo_mostrar,
        relacion_anfitrion: state.relacion_anfitrion,
      }),
    },
  ),
);
