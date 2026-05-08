import { configuracionInterface } from "@/interface/interfaces";
import { ClienteBrowserSupabase } from "@/lib/supabase";

export async function getAllConfiguraciones() {
    try {
        const { data, error } = await ClienteBrowserSupabase.from("configuracion")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error(error);
            return [];
        }
        return data as configuracionInterface[];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getConfiguracionById(id: string) {
    try {
        const { data, error } = await ClienteBrowserSupabase.from("configuracion")
            .select("*")
            .eq("id_configuracion", id);
        if (error) {
            console.error(error);
            return [];
        }
        return data as configuracionInterface[];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getFilterByTipoDistribucion(tipo: string) {
    try {
        if (tipo === "todas" || tipo === "") {
            return await getAllConfiguraciones();
        }
        const { data, error } = await ClienteBrowserSupabase.from("configuracion")
            .select("*")
            .eq("tipo_distribucion", tipo);
        if (error) {
            console.error(error);
            return [];
        }
        return data as configuracionInterface[];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function createConfiguracion(registro: configuracionInterface) {
    try {
        const { data, error } = await ClienteBrowserSupabase.from("configuracion").insert(registro);
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

export async function updateConfiguracion(id: string, registro: Partial<configuracionInterface>) {
    try {
        const { data, error } = await ClienteBrowserSupabase.from("configuracion")
            .update(registro)
            .eq("id_configuracion", id);
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

export async function deleteConfiguracion(id: string) {
    try {
        const { data, error } = await ClienteBrowserSupabase.from("configuracion")
            .delete()
            .eq("id_configuracion", id);
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
