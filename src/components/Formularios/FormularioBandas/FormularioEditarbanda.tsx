import Modal from "@/components/modal/Modal";
import {
  obtenerUrlLogoBanda,
  updateBanda,
  editarLogoBanda,
} from "@/lib/services/bandasServices";
import { bandaInterface } from "@/interface/interfaces";
import { useConfiguracionStore } from "@/stores/configuracionStore";
import { useState, useEffect } from "react";
import Image from "next/image";

type Props = {
  open: boolean;
  onClose: () => void;
  bandaAEditar: bandaInterface;
  refrescar?: () => void;
};

export default function FormularioEditarbanda({
  open,
  onClose,
  bandaAEditar,
  refrescar,
}: Props) {
  const tipoDistribucion = useConfiguracionStore((s) => s.tipo_distribucion);
  const mostrarGrupo =
    tipoDistribucion === "manual_grupo" ||
    tipoDistribucion === "manual_grupo_subgrupo";
  const mostrarSubgrupo = tipoDistribucion === "manual_grupo_subgrupo";

  const [formData, setFormData] = useState<Partial<bandaInterface>>({
    nombre_banda: bandaAEditar.nombre_banda,
    categoria_banda: bandaAEditar.categoria_banda,
    path_image_banda: bandaAEditar.path_image_banda,
    posicion_tabla: bandaAEditar.posicion_tabla,
    grupo_banda: bandaAEditar.grupo_banda,
    subgrupo_banda: bandaAEditar.subgrupo_banda,
  });
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const cargarImagen = async () => {
      if (
        open &&
        bandaAEditar.path_image_banda &&
        bandaAEditar.path_image_banda.trim() !== ""
      ) {
        try {
          const url = await obtenerUrlLogoBanda(bandaAEditar.path_image_banda);
          if (url) {
            setPreviewUrl(url);
          }
        } catch (err) {
          console.error("Error cargando imagen existente:", err);
        }
      } else if (open) {
        setPreviewUrl("");
      }
    };

    cargarImagen();
  }, [open, bandaAEditar.path_image_banda]);

  useEffect(() => {
    setFormData({
      nombre_banda: bandaAEditar.nombre_banda,
      categoria_banda: bandaAEditar.categoria_banda,
      path_image_banda: bandaAEditar.path_image_banda,
      posicion_tabla: bandaAEditar.posicion_tabla,
      grupo_banda: bandaAEditar.grupo_banda,
      subgrupo_banda: bandaAEditar.subgrupo_banda,
    });
    setErrorMsg(null);
  }, [bandaAEditar]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFormData((prev) => ({
        ...prev,
        path_image_banda: file.name,
      }));
    }
  };

  const handleSubmit = async (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    setErrorMsg(null);

    if (!formData.nombre_banda?.trim()) {
      setErrorMsg("El nombre de la banda es obligatorio.");
      return;
    }
    if (!formData.categoria_banda) {
      setErrorMsg("Seleccione una categoría.");
      return;
    }
    if (mostrarGrupo && !formData.grupo_banda) {
      setErrorMsg("Seleccione el grupo de la banda.");
      return;
    }
    if (mostrarSubgrupo && !formData.subgrupo_banda) {
      setErrorMsg("Seleccione el subgrupo de la banda.");
      return;
    }

    let URLLogo = "";
    if (selectedFile && formData.nombre_banda) {
      URLLogo = `${formData.nombre_banda.replace(/\s+/g, "_")}_logo`;
    } else {
      URLLogo = bandaAEditar.path_image_banda;
    }

    const nuevaBanda: Omit<bandaInterface, "id_banda" | "created_at_banda"> = {
      nombre_banda: formData.nombre_banda || "",
      categoria_banda: formData.categoria_banda || "",
      path_image_banda: URLLogo,
      posicion_tabla: formData.posicion_tabla || 0,
      grupo_banda: mostrarGrupo ? (formData.grupo_banda || "") : "",
      subgrupo_banda: mostrarSubgrupo ? (formData.subgrupo_banda || "") : "",
    };

    try {
      await updateBanda(bandaAEditar.id_banda, nuevaBanda as bandaInterface);
      if (selectedFile) {
        const resultadoLogo = await editarLogoBanda(selectedFile, URLLogo);
        if (!resultadoLogo) {
          console.error("Error al subir el logo de la banda.");
        }
      }
      onClose();
      refrescar?.();
    } catch (error) {
      console.error("Error al editar la banda:", error);
      setErrorMsg("Ocurrió un error al guardar la banda.");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-4 text-slate-700">Editar Banda</h2>
        <form className="flex flex-col gap-4 px-16" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="nombre_banda">Nombre</label>
            <input
              type="text"
              id="nombre_banda"
              name="nombre_banda"
              placeholder="Nombre de la banda"
              value={formData.nombre_banda || ""}
              onChange={handleInputChange}
              className="bg-slate-100 p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="categoria_banda">Categoria</label>
            <select
              name="categoria_banda"
              id="categoria_banda"
              value={formData.categoria_banda || ""}
              className="bg-slate-200 p-2 rounded"
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Seleccione una categoria
              </option>
              <option value="PREMIER">Premier</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="posicion_tabla">Posicion en tabla</label>
            <input
              type="number"
              id="posicion_tabla"
              name="posicion_tabla"
              placeholder="Posicion en tabla"
              min="0"
              value={formData.posicion_tabla ?? ""}
              onChange={handleInputChange}
              className="bg-slate-100 p-2 rounded"
            />
          </div>

          {mostrarGrupo && (
            <div className="flex flex-col">
              <label htmlFor="grupo_banda">Grupo</label>
              <select
                name="grupo_banda"
                id="grupo_banda"
                value={formData.grupo_banda || ""}
                className="bg-slate-200 p-2 rounded"
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Seleccione un grupo
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
          )}

          {mostrarSubgrupo && (
            <div className="flex flex-col">
              <label htmlFor="subgrupo_banda">Subgrupo</label>
              <select
                name="subgrupo_banda"
                id="subgrupo_banda"
                value={formData.subgrupo_banda || ""}
                className="bg-slate-200 p-2 rounded"
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Seleccione un subgrupo
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
          )}

          <div className="flex flex-col">
            <label className="text-gray-200 mb-1" htmlFor="path_image_banda">
              Logo de la Banda
            </label>
            <label className="relative w-32 h-32 bg-gray-300 cursor-pointer hover:bg-gray-400 transition-colors overflow-hidden rounded">
              <input
                type="file"
                id="path_image_banda"
                name="path_image_banda"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
              {previewUrl ? (
                <Image
                  fill
                  src={previewUrl}
                  alt="Logo de la Banda"
                  className="object-contain"
                />
              ) : (
                <span className="text-gray-600 text-2xl font-black w-full h-full flex justify-center items-center overflow-hidden">
                  LOGO
                </span>
              )}
            </label>
          </div>

          {errorMsg && (
            <p className="text-red-600 text-sm" role="alert">
              {errorMsg}
            </p>
          )}

          <div className="flex flex-col gap-2 justify-end mt-12">
            <button
              type="submit"
              className="bg-slate-700 text-white p-2 rounded w-full"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-200 p-2 rounded w-full"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
