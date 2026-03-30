"use client";
import {
  deleteBanda,
  obtenerUrlLogoBanda,
} from "@/lib/services/bandasServices";
import Image from "next/image";
import React, { useState } from "react";
import BotonTresPuntos from "./Botones/BotonTresPuntos";
import { bandaInterface } from "@/interface/interfaces";
import FormularioEditarbanda from "@/components/Formularios/FormularioBandas/FormularioEditarbanda";
import ApprovateMessage from "./Message/ApprovateMessage";
import ConfirmDeleteModal from "./Message/ConfirmDeleteModal";
type Props = {
  banda: bandaInterface;
  entradaAnimacion?: number;
  refrescar?: () => void;
};

export default function BandaMiniCard({
  banda,
  entradaAnimacion,
  refrescar,
}: Props) {
  const [imagen, setImagen] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [openFormularioEditar, setOpenFormularioEditar] = useState(false);
  const [openConfirmarEliminar, setOpenConfirmarEliminar] = useState(false);

  React.useEffect(() => {
    if (banda?.path_image_banda && banda.path_image_banda.trim() !== "") {
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
  }, [banda?.path_image_banda]);

  // Early return if banda is undefined
  if (!banda) {
    return (
      <div className="flex flex-col w-full h-full bg-white shadow animate-zoom-in">
        <div className="text-gray-500 text-center p-2">
          <div className="text-sm p-2">Banda no disponible</div>
        </div>
      </div>
    );
  }

  const abrirDialogConfirmarEliminar = () => {
    setOpenConfirmarEliminar(true);
  };

  const EliminarBanda = async () => {
    await deleteBanda(banda.id_banda);
    refrescar?.();
  };

  return (
    <>
      <FormularioEditarbanda
        open={openFormularioEditar}
        onClose={() => setOpenFormularioEditar(false)}
        bandaAEditar={banda}
        refrescar={refrescar}
      />

      <ConfirmDeleteModal
        open={openConfirmarEliminar}
        onClose={() => setOpenConfirmarEliminar(false)}
        onConfirm={EliminarBanda}
        nombreElemento={banda.nombre_banda}
        titulo="Eliminar Banda"
      />

      <div className="flex flex-col w-full h-full bg-white shadow animate-zoom-in">
        {isLoading ? (
          <div className="text-gray-500 p-2">Cargando imagen...</div>
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
            <div className="text-sm  p-2">Sin imagen</div>
          </div>
        ) : (
          <div className="text-gray-500 text-center p-2">
            <div className="text-sm p-2">Sin imagen</div>
          </div>
        )}

        <div className="p-4"></div>
      </div>
    </>
  );
}
