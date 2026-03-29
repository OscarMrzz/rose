"use client";
import { obtenerUrlLogoBanda } from "@/lib/services/bandasServices";
import Image from "next/image";
import React, { useState } from "react";
import BotonTresPuntos from "./Botones/BotonTresPuntos";
import { bandaInterface } from "@/interface/interfaces";
import FormularioEditarbanda from "@/components/Formularios/FormularioBandas/FormularioEditarbanda";
type Props = {
 banda:bandaInterface
  entradaAnimacion?: number;
};

export default function BandasCardCompnent({
  banda,
  entradaAnimacion,
}: Props) {
  const [imagen, setImagen] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
    const [openFormularioEditar, setOpenFormularioEditar] = useState(false);


  React.useEffect(() => {
    if (banda.path_image_banda &&  banda.path_image_banda.trim() !== "") {
      setIsLoading(true);
      setError(null);
      obtenerUrlLogoBanda(banda.path_image_banda)
        .then((url) => {
          if (url) {
            setImagen(url);
          } else {
            setError("No se pudo cargar la imagen");
          }
        })
        .catch((err) => {
          console.error("Error cargando imagen:", err);
          setError("Error al cargar la imagen");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setImagen(null);
      setError(null);
    }
  }, [banda.path_image_banda]);
  return (
    <>
       <FormularioEditarbanda
        open={openFormularioEditar}
        onClose={() => setOpenFormularioEditar(false)}
        bandaAEditar={banda}
      />
      
    
 
    <div
      className="flex flex-col w-full h-90 bg-white shadow animate-zoom-in"
      style={{ animationDelay: `${(entradaAnimacion || 0) * 0.2}s` }}
    >
      <div className="bg-slate-300 h-56 flex items-center justify-center">
        {isLoading ? (
          <div className="text-gray-500">Cargando imagen...</div>
        ) : imagen ? (
          <Image
            src={imagen}
            alt={banda.nombre_banda}
            width={100}
            height={100}
            className="object-cover w-full h-full"
          />
        ) : error ? (
          <div className="text-gray-500 text-center p-2">
            <div className="text-sm">Sin imagen</div>
          </div>
        ) : (
          <div className="text-gray-500 text-center p-2">
            <div className="text-sm">Sin imagen</div>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{banda.nombre_banda}</h2>
          <BotonTresPuntos
           onEdit={() => setOpenFormularioEditar(true)}
           />
        </div>
        <p className="text-gray-600">{banda.categoria_banda}</p>
     
      </div>
    </div>
       </>
  );
}
