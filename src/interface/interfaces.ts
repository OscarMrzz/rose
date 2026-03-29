

export interface bandaInterface {
    id_banda: string;
    nombre_banda: string;
    categoria_banda: string;
    path_image_banda: string;
    created_at_banda: string;
}
export interface tablaInterface {
    id_posicion: string;
    categoria_posicion: string;
    posicion: number;
    id_foranea_banda: string;
    created_at_posicion: string;
}

export interface grupoBandasInterface {
    id_grupo: string;
    nombre_grupo: string;
    nombre_subgrupo: string;
    id_foranea_banda: string;
    created_at_grupo: string;
}

export interface eventosInterface {
    id_evento: string;
    lugar_vento: string;
    fecha_evento: string;
    created_at_evento: string;
}
export interface conexionEventoGrupoInterface {
    id_conexion_grupos_ventos: number;
    id_foranea_evento: string;
    id_foranea_grupo: string;
    created_at_conexion_grupos_ventos: string;
}




