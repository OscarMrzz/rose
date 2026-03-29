import Modal from "@/components/modal/Modal";
import {

  obtenerUrlLogoBanda,
  updateBanda,
  editarLogoBanda,
} from "@/lib/services/bandasServices";
import { bandaInterface } from "@/interface/interfaces";
import { useState, useEffect } from "react";
import Image from "next/image";

type Props = {
  open: boolean;
  onClose: () => void;
  bandaAEditar: bandaInterface;
};

export default function FormularioEditarbanda({
  open,
  onClose,
  bandaAEditar,
}: Props) {
  const [formData, setFormData] = useState<Partial<bandaInterface>>({
    nombre_banda: bandaAEditar.nombre_banda,
    categoria_banda: bandaAEditar.categoria_banda,
    path_image_banda: bandaAEditar.path_image_banda,
  });
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Cargar la imagen existente cuando se abre el modal
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

  // Resetear el formulario cuando cambia la banda a editar
  useEffect(() => {
    const resetForm = () => {
      setFormData({
        nombre_banda: bandaAEditar.nombre_banda,
        categoria_banda: bandaAEditar.categoria_banda,
        path_image_banda: bandaAEditar.path_image_banda,
      });
    };

    resetForm();
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
      // Crear URL temporal para vista previa
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Opcional: También puedes guardar el nombre del archivo en formData
      setFormData((prev) => ({
        ...prev,
        path_image_banda: file.name,
      }));
    }
  };

  const handleSubmit = async (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    let URLLogo = "";
    if (selectedFile && formData.nombre_banda) {
      URLLogo = `${formData.nombre_banda?.replace(/\s+/g, "_")}_logo`;
    } else {
      // Mantener la imagen existente si no se selecciona una nueva
      URLLogo = bandaAEditar.path_image_banda;
    }

    const nuevaBanda: Omit<bandaInterface, "id_banda" | "created_at_banda"> = {
      nombre_banda: formData.nombre_banda || "",
      categoria_banda: formData.categoria_banda || "",
      path_image_banda: URLLogo,
    };

    try {
      await updateBanda(bandaAEditar.id_banda, nuevaBanda as bandaInterface);
      // Si hay un archivo seleccionado, subirlo
      if (selectedFile) {
        const resultadoLogo = await editarLogoBanda(selectedFile, URLLogo);
        // Si la subida falla, solo loguea el error pero no detengas el proceso
        if (!resultadoLogo) {
          console.error("Error al subir el logo de la banda.");
        }
      }
      onClose();
    } catch (error) {
      console.error("Error al editar la banda:", error);
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
                <span className="text-gray-600 text-2xl font-black w-full h-full flex justify-center items-center overflow-hidden ">
                  LOGO
                </span>
              )}
            </label>
          </div>
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
