"use client";

import GrupoEventos from "@/components/GrupoEventos";
import { bandaInterface } from "@/interface/interfaces";
import { getAllBandas } from "@/lib/services/bandasServices";
import { useConfiguracionStore } from "@/stores/configuracionStore";
import React, { useCallback, useEffect, useState } from "react";

const categorias = {
  0: "B",
  1: "A",
  2: "PREMIER",
};

function ordenarGruposDesdeBandas(
  bandasYaDistribuidas: bandaInterface[],
): { grupo1: bandaInterface[]; grupo2: bandaInterface[] } {
  const grupo1Bandas: bandaInterface[] = [];
  const grupo2Bandas: bandaInterface[] = [];

  bandasYaDistribuidas.forEach((banda) => {
    if (banda.grupo_banda === "1") {
      grupo1Bandas.push(banda);
    } else if (banda.grupo_banda === "2") {
      grupo2Bandas.push(banda);
    }
  });

  const grupo1OrdenadoPorPosicion = grupo1Bandas.sort(
    (a, b) => a.posicion_tabla - b.posicion_tabla,
  );
  const grupo2OrdenadoPorPosicion = grupo2Bandas.sort(
    (a, b) => a.posicion_tabla - b.posicion_tabla,
  );

  const sortByCategoria = (a: bandaInterface, b: bandaInterface) => {
    const categoryOrder = Object.keys(categorias).map((key) => parseInt(key));
    const aCategoryIndex = categoryOrder.findIndex(
      (cat) => categorias[cat as keyof typeof categorias] === a.categoria_banda,
    );
    const bCategoryIndex = categoryOrder.findIndex(
      (cat) => categorias[cat as keyof typeof categorias] === b.categoria_banda,
    );
    return aCategoryIndex - bCategoryIndex;
  };

  return {
    grupo1: [...grupo1OrdenadoPorPosicion].sort(sortByCategoria),
    grupo2: [...grupo2OrdenadoPorPosicion].sort(sortByCategoria),
  };
}

export default function Page() {
  const cantidadEventos = useConfiguracionStore((s) => s.cantidad_eventos);

  const [bandasList, setBandasList] = useState<bandaInterface[] | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const bandas = await getAllBandas();
      const { grupo1, grupo2 } = ordenarGruposDesdeBandas(bandas);
      setBandasList([...grupo1, ...grupo2]);
    } catch {
      setError("No se pudieron cargar las bandas.");
      setBandasList([]);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  const hayDistribucion =
    bandasList != null &&
    bandasList.some((b) => b.grupo_banda === "1" || b.grupo_banda === "2");

  return (
    <div className="relative mx-auto w-full max-w-[1600px] px-4 pb-28 pt-2 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_100%_60%_at_50%_-10%,rgba(14,165,233,0.11),transparent_55%),radial-gradient(ellipse_55%_45%_at_100%_55%,rgba(71,85,105,0.07),transparent_50%),linear-gradient(180deg,#e2e8f0_0%,#f1f5f9_40%,#e2e8f0_100%)]"
      />

      <header className="sticky top-2 z-10 mb-8 sm:top-3">
        <div className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm shadow-slate-900/5 backdrop-blur-md sm:p-5">
          <div className="border-b border-slate-200/70 pb-3">
            <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-sky-700/90">
              ROSE · Eventos
            </p>
            <h1 className="font-sans text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
              Calendario según distribución actual
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Los eventos se generan con la cantidad configurada y las bandas ya
              asignadas en Distribuciones.
            </p>
          </div>
        </div>
      </header>

      {cargando && (
        <p className="text-center font-mono text-sm text-slate-500">
          Cargando eventos…
        </p>
      )}

      {error && (
        <p className="text-center text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {!cargando && !error && bandasList != null && !hayDistribucion && (
        <div className="rounded-2xl border border-amber-200/80 bg-amber-50/90 p-6 text-center text-slate-700 shadow-sm">
          <p className="font-medium">Aún no hay grupos para armar eventos.</p>
          <p className="mt-2 text-sm text-slate-600">
            Generá la distribución en la página Distribuciones y volvé acá.
          </p>
        </div>
      )}

      {!cargando && !error && hayDistribucion && (
        <GrupoEventos
          numeroEventos={cantidadEventos}
          bandasList={bandasList!}
        />
      )}
    </div>
  );
}
