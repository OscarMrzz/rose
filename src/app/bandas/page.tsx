"use client";
import BandasCardCompnent from "@/components/BandasCardCompnent";
import { getAllBandas } from "@/lib/services/bandasServices";
import { useEffect, useState, useMemo } from "react";
import { bandaInterface } from "@/interface/interfaces";
import FormularioAgregarbanda from "@/components/Formularios/FormularioBandas/FormularioAgregarbanda";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, Plus, Search } from "lucide-react";

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

      <div className="flex w-full flex-col gap-8 px-4 py-8 sm:px-8 sm:py-10 lg:px-16 xl:px-24">
        <header className="flex flex-col gap-6 border-b border-slate-300 pb-8">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
              Bandas
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-800 sm:text-base">
     
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <search
                className={cn(
                  "flex h-11 min-w-0 max-w-md flex-1 items-center gap-2.5 rounded-xl border-2 border-slate-300 bg-white px-3.5 shadow-sm",
                  "transition-[border-color,box-shadow] hover:border-slate-400 hover:shadow",
                  "focus-within:border-blue-500 focus-within:shadow-md focus-within:outline-none focus-within:ring-4 focus-within:ring-blue-500/18",
                )}
                aria-label="Buscar bandas"
              >
                <span
                  className="inline-flex shrink-0 rounded-lg bg-slate-100 p-1.5 text-slate-500"
                  aria-hidden
                >
                  <Search className="size-4.5" strokeWidth={2.25} />
                </span>
                <input
                  type="search"
                  placeholder="Buscar banda"
                  className="min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:font-normal placeholder:text-slate-400 sm:text-base"
                  value={terminoBusqueda}
                  onChange={(e) => setTerminoBusqueda(e.target.value)}
                  autoComplete="off"
                  enterKeyHint="search"
                />
              </search>

              <div className="relative w-full min-w-48 shrink-0 sm:w-auto">
                <label htmlFor="filtro-categoria-bandas" className="sr-only">
                  Categoría
                </label>
                <select
                  id="filtro-categoria-bandas"
                  className={cn(
                    "h-11 w-full min-w-48 cursor-pointer appearance-none rounded-xl border-2 border-slate-300 bg-white pl-3.5 pr-11",
                    "text-sm font-medium text-slate-800 shadow-sm",
                    "transition-[border-color,box-shadow] hover:border-slate-400 hover:shadow",
                    "focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/18",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    "sm:text-base",
                  )}
                  value={categoriaSeleccionada}
                  onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                >
                  <option value="">Todas las categorías</option>
                  <option value="PREMIER">PREMIER</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3.5 top-1/2 size-4.5 -translate-y-1/2 text-slate-500"
                  aria-hidden
                  strokeWidth={2.25}
                />
              </div>
            </div>

            <div className="shrink-0 lg:flex lg:items-end">
              <Button
                type="button"
                size="lg"
                className={cn(
                  "h-11 w-full min-w-44 gap-2 rounded-xl px-6 text-base font-semibold shadow-md",
                  "bg-blue-500 text-white hover:bg-blue-600",
                  "focus-visible:border-blue-400 focus-visible:ring-blue-500/35",
                  "active:translate-y-px sm:w-auto",
                )}
                onClick={handleOpenFormularioAgregar}
              >
                <Plus className="size-5 opacity-95" aria-hidden />
                Agregar banda
              </Button>
            </div>
          </div>
        </header>

        <div className="grid w-full grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {bandasFiltradas.length === 0 ? (
            <p className="col-span-full rounded-lg border border-dashed border-slate-300 bg-slate-300/30 px-6 py-12 text-center text-slate-800">
              No hay bandas que coincidan con los filtros actuales.
            </p>
          ) : (
            bandasFiltradas.map((banda, index) => (
              <BandasCardCompnent
                key={banda.id_banda}
                banda={banda}
                entradaAnimacion={index}
                refrescar={fetchBandas}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
