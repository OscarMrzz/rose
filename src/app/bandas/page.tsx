"use client";
import BandasCardCompnent from "@/components/BandasCardCompnent";
import { getAllBandas } from "@/lib/services/bandasServices";
import { useEffect, useState } from "react";
import { bandaInterface } from "@/interface/interfaces";
import FormularioAgregarbanda from "@/components/Formularios/FormularioBandas/FormularioAgregarbanda";

export default function Page() {
  const [bandasList, setBandasList] = useState<bandaInterface[]>([]);
  const [openFormularioAgregar, setOpenFormularioAgregar] = useState(false);

  useEffect(() => {
    const fetchBandas = async () => {
      const bandas = await getAllBandas();
      setBandasList(bandas);
    };
    fetchBandas();
  }, []);


  const handleOpenFormularioAgregar = () => {
    setOpenFormularioAgregar(true);
  };
  return (
    <>
    <FormularioAgregarbanda open={openFormularioAgregar} onClose={() => setOpenFormularioAgregar(false)} />
    <div className="w-full py-10 px-2 flex flex-col gap-4">
      <div className="flex justify-between">
        <div>
          <h2 className="text-4xl font-bold text-gray-800">Bandas</h2>
        </div>
        <div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleOpenFormularioAgregar}>Agregar Banda</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-4 ">
        {bandasList.map((banda) => (
          <BandasCardCompnent
            key={banda.id_banda}
            nombre={banda.nombre_banda}
            categoria={banda.categoria_banda}
            grupo={"Grupo 1"}
            subcGrupo={"1"}
          />
        ))}
      </div>
    </div>
    </>
  );
}
