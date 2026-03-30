import Modal from "@/components/modal/Modal";
import { createBanda, subirLogoBanda } from "@/lib/services/bandasServices";
import { bandaInterface } from "@/interface/interfaces";
import { useState } from "react";
import Image from "next/image";

type Props = {
  open: boolean;
  onClose: () => void;
  refrescar?: () => void;
};
/* 
    id_banda: string;
    created_at_banda: string;
    nombre_banda: string;
    categoria_banda: string;
    path_image_banda: string;
    grupo_banda: string;
    subgrupo_banda: string;
    posicion_tabla: number;

*/
export default function FormularioAgregarbanda({
  open,
  onClose,
  refrescar,
}: Props) {
  const [formData, setFormData] = useState<Partial<bandaInterface>>({
    nombre_banda: "",
    categoria_banda: "",
    path_image_banda: "",
    posicion_tabla: 0,
    grupo_banda: "",
    subgrupo_banda: "",
  });
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
    }

    const nuevaBanda: Omit<bandaInterface, "id_banda" | "created_at_banda"> = {
      nombre_banda: formData.nombre_banda || "",
      categoria_banda: formData.categoria_banda || "",
      path_image_banda: URLLogo,
      posicion_tabla: formData.posicion_tabla || 0,
      grupo_banda: formData.grupo_banda || "",
      subgrupo_banda: formData.subgrupo_banda || "",
    };

    try {
      await createBanda(nuevaBanda as bandaInterface);
      // Si hay un archivo seleccionado, subirlo
      if (selectedFile) {
        const resultadoLogo = await subirLogoBanda(selectedFile, URLLogo);
        // Si la subida falla, solo loguea el error pero no detengas el proceso
        if (!resultadoLogo) {
          console.error("Error al subir el logo de la banda.");
        }
      }
      onClose();
      refrescar?.();
    } catch (error) {
      console.error("Error al crear la banda:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-4 text-slate-700">
          Agregar Banda
        </h2>
        <form className="flex flex-col gap-4 px-16" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="nombre_banda">Nombre</label>
            <input
              type="text"
              id="nombre_banda"
              name="nombre_banda"
              placeholder="Nombre de la banda"
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
              onChange={handleInputChange}
              className="bg-slate-100 p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="grupo_banda">Grupo</label>
            <input
              type="text"
              id="grupo_banda"
              name="grupo_banda"
              placeholder="Grupo de la banda"
              onChange={handleInputChange}
              className="bg-slate-100 p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="subgrupo_banda">Subgrupo</label>
            <input
              type="text"
              id="subgrupo_banda"
              name="subgrupo_banda"
              placeholder="Subgrupo de la banda"
              onChange={handleInputChange}
              className="bg-slate-100 p-2 rounded"
            />
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
