
import { bandaInterface } from "@/interface/interfaces";
import { ClienteBrowserSupabase } from "@/lib/supabase";

export async function getBandas() {
    try {
        const { data, error } = await ClienteBrowserSupabase.from('bandas').select('*');

        if (error) {
            console.error(error);
            return [];
        }
        return  data as bandaInterface[];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getBandaById(id: string) {
    try {
        const { data, error } = await ClienteBrowserSupabase.from('bandas').select('*').eq('id', id);
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
        if(categoria === 'todas' || categoria === '') {
            return await getBandas();
        }
        const { data, error } = await ClienteBrowserSupabase.from('bandas').select('*').eq('categoria', categoria);
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
        const { data, error } = await ClienteBrowserSupabase.from('bandas').update(banda).eq('id', id);
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
        const { data, error } = await ClienteBrowserSupabase.from('bandas').delete().eq('id', id);
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

