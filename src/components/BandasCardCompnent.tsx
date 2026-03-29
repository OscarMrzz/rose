"use client";
import { obtenerUrlLogoBanda } from "@/lib/services/bandasServices";
import Image from "next/image";
import React from "react";
import BotonTresPuntos from "./Botones/BotonTresPuntos";
type Props = {
  nombre: string;
  categoria: string;
  grupo: "Grupo 1" | "Grupo 2";
  subcGrupo: "1" | "2";
  path_image_banda: string;
  entradaAnimacion?: number;
};

export default function BandasCardCompnent({
  nombre,
  categoria,
  grupo,
  subcGrupo,
  path_image_banda,
  entradaAnimacion,
}: Props) {
  const [imagen, setImagen] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (path_image_banda && path_image_banda.trim() !== "") {
      setIsLoading(true);
      setError(null);
      obtenerUrlLogoBanda(path_image_banda)
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
  }, [path_image_banda]);
  return (
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
            alt={nombre}
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
          <h2 className="text-lg font-semibold">{nombre}</h2>
          <BotonTresPuntos />
        </div>
        <p className="text-gray-600">{categoria}</p>
        <p className="text-sm text-gray-500">
          {grupo} - {subcGrupo}
        </p>
      </div>
    </div>
  );
}
