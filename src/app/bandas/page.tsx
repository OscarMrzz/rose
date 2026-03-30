"use client";
import BandasCardCompnent from "@/components/BandasCardCompnent";
import { getAllBandas } from "@/lib/services/bandasServices";
import { useEffect, useState, useMemo } from "react";
import { bandaInterface } from "@/interface/interfaces";
import FormularioAgregarbanda from "@/components/Formularios/FormularioBandas/FormularioAgregarbanda";
import { useAuth } from "@/hook/UseAuthHook";
import FormularioEditarbanda from "@/components/Formularios/FormularioBandas/FormularioEditarbanda";
import BuscadorInon from "@/icons/BuDDDDscadorInon";
import { distribuir } from "@/lib/utils/Distirbuir";

export default function Page() {

  const [bandasListOriginales, setBandasListOriginales] = useState<
    bandaInterface[]
  >([]);
  const [openFormularioAgregar, setOpenFormularioAgregar] = useState(false);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  const fetchBandas = async () => {
    const bandas = await getAllBandas();

    setBandasListOriginales(bandas);
    
  };

  useEffect(() => {
    const fetchBandasEffect = async () => {
      const bandas = await getAllBandas();

      setBandasListOriginales(bandas);
      console.log("Iniciando----");
   
    };
    fetchBandasEffect();
  }, []);

  const bandasFiltradas = useMemo(() => {
    let resultado = [...bandasListOriginales];

    // Filtrar por término de búsqueda
    if (terminoBusqueda.trim()) {
      resultado = resultado.filter((banda) =>
        banda.nombre_banda
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()),
      );
    }

    // Filtrar por categoría
    if (categoriaSeleccionada) {
      resultado = resultado.filter(
        (banda) => banda.categoria_banda === categoriaSeleccionada,
      );
    }

    return resultado;
  }, [terminoBusqueda, categoriaSeleccionada, bandasListOriginales]);

  const handleOpenFormularioAgregar = () => {
    setOpenFormularioAgregar(true);
  };
  return (
    <>
      <FormularioAgregarbanda
        open={openFormularioAgregar}
        onClose={() => setOpenFormularioAgregar(false)}
        refrescar={fetchBandas}
      />

      <div className="w-full py-10 px-24 flex flex-col gap-4 ">
        <div className="flex justify-between flex-col gap-4">
          <div>
            <h2 className="text-4xl font-bold text-gray-800">Bandas</h2>
          </div>
          <div className="flex gap-4 justify-between ">
            <div className="flex gap-12 ">
              <search className=" flex  h-8 bg-slate-300 rounded w-60 items-center">
                <span>
                  <BuscadorInon size={24} style="text-slate-400" />
                </span>
                <input
                  type="text"
                  placeholder="Buscar banda"
                  className="w-60 outline-none bg-transparent text-slate-800 "
                  value={terminoBusqueda}
                  onChange={(e) => setTerminoBusqueda(e.target.value)}
                />
              </search>

              <div>
                <select
                  className="bg-slate-400 outline-none rounded px-2 py-1 text-slate-800"
                  name=""
                  id=""
                  value={categoriaSeleccionada}
                  onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                >
                  <option value="">Todas las categorías</option>

                  <option value="PREMIER">PREMIER</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                </select>
              </div>
            </div>
            <div className="">
              <button
                className="bg-blue-500 text-white px-4 h-full rounded w-40 "
                onClick={handleOpenFormularioAgregar}
              >
                Agregar Banda
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4 ">
          {bandasFiltradas.map((banda, index) => (
            <BandasCardCompnent
              key={banda.id_banda}
              banda={banda}
              entradaAnimacion={index}
              refrescar={fetchBandas}
            />
          ))}
        </div>
      </div>
    </>
  );
}
