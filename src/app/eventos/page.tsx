"use client";

import BandasSinDistribuirModal from "@/components/BandasSinDistribuirModal";
import GrupoEventos from "@/components/GrupoEventos";
import { bandaInterface } from "@/interface/interfaces";
import { eventosTypeClassName } from "@/lib/eventosTypography";
import { getAllBandas } from "@/lib/services/bandasServices";
import { bandaSinGrupoOSubgrupo } from "@/lib/utils/Distirbuir";
import { useConfiguracionStore } from "@/stores/configuracionStore";
import React, { useCallback, useEffect, useMemo, useState } from "react";

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
      (cat) =>
        categorias[cat as keyof typeof categorias] === a.categoria_banda,
    );
    const bCategoryIndex = categoryOrder.findIndex(
      (cat) =>
        categorias[cat as keyof typeof categorias] === b.categoria_banda,
    );
    return aCategoryIndex - bCategoryIndex;
  };

  return {
    grupo1: [...grupo1OrdenadoPorPosicion].sort(sortByCategoria),
    grupo2: [...grupo2OrdenadoPorPosicion].sort(sortByCategoria),
  };
}

function SkeletonEventosPlaceholder() {
  return (
    <div
      className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      aria-hidden
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="aspect-[3/4] animate-pulse rounded-lg border border-zinc-800/70 bg-linear-to-br from-zinc-800/90 via-zinc-950/80 to-black shadow-[inset_0_0_0_1px_rgba(251,191,36,0.08)]"
          style={{ animationDelay: `${i * 40}ms` }}
        />
      ))}
    </div>
  );
}

export default function Page() {
  const cantidadEventos = useConfiguracionStore((s) => s.cantidad_eventos);

  const [bandasList, setBandasList] = useState<bandaInterface[] | null>(null);
  /** Lista completa desde Supabase; `bandasList` solo incluye grupo 1 y 2 para el calendario. */
  const [bandasTodas, setBandasTodas] = useState<bandaInterface[] | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openModalSinDistribuir, setOpenModalSinDistribuir] = useState(false);

  const cargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const bandas = await getAllBandas();
      setBandasTodas(bandas);
      const { grupo1, grupo2 } = ordenarGruposDesdeBandas(bandas);
      setBandasList([...grupo1, ...grupo2]);
    } catch {
      setError("No se pudieron cargar las bandas.");
      setBandasList([]);
      setBandasTodas([]);
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

  const bandasSinDistribuir = useMemo(() => {
    if (bandasTodas == null) return [];
    return bandasTodas.filter(bandaSinGrupoOSubgrupo);
  }, [bandasTodas]);

  const countSinDistribuir = bandasSinDistribuir.length;

  return (
    <div
      className={`  mx-auto w-full max-w-[1600px] px-4 pb-28 pt-4 sm:px-6 sm:pt-6 lg:px-10 xl:px-16 2xl:px-24`}
    >
      <BandasSinDistribuirModal
        bandas={bandasSinDistribuir}
        open={openModalSinDistribuir}
        onClose={() => setOpenModalSinDistribuir(false)}
        onGuardar={async () => {
          await cargar();
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.35] mix-blend-multiply bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2296%22 height=%2296%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.04%22/%3E%3C/svg%3E')]"
      />

      <header className="relative z-[1] mb-10 sm:mb-14">
        <div className="overflow-hidden rounded-3xl border border-stone-200/70   bg-white shadow-xl ,inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-md sm:p-7 lg:p-8">
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p
                className="text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-amber-800/90"
                style={{ fontFamily: "var(--font-lexend-ui)" }}
              >
                Rose — Eventos
              </p>
              <h1
                className="mt-3 text-balance uppercase leading-[0.96] tracking-[0.02em] text-stone-900 sm:text-[2.35rem] md:text-[2.85rem]"
                style={{
                  fontFamily: "var(--font-anton-display), sans-serif",
                }}
              >
                Calendario según distribución actual
              </h1>
              <p
                className="mt-4 max-w-xl text-[0.96rem] font-normal leading-relaxed text-stone-600"
                style={{ fontFamily: "var(--font-lexend-ui)" }}
              >
                Las bandas se distribuyen sengun su grupo asignado
              </p>
            </div>
            <div
              className="flex shrink-0 flex-wrap gap-3 text-[0.6rem] font-medium uppercase tracking-[0.22em] text-stone-500 lg:flex-col lg:items-end lg:text-right"
              style={{ fontFamily: "var(--font-lexend-ui)" }}
            >
              <span className="rounded-full border border-stone-300/80 bg-white/55 px-3 py-1.5 text-stone-600 backdrop-blur-sm">
                {cargando ? "…" : `${bandasTodas?.length ?? bandasList?.length ?? "—"} bandas`}
              </span>
              {!cargando && hayDistribucion && (
                <span className="rounded-full border border-amber-200/70 bg-amber-50/50 px-3 py-1.5 text-amber-950/85">
                  {cantidadEventos} fechas proyectadas
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {cargando && (
        <section
          aria-busy="true"
          aria-label="Cargando calendario de eventos"
          className="space-y-8"
        >
          <span className="sr-only">Cargando…</span>
          <SkeletonEventosPlaceholder />
        </section>
      )}

      {error && (
        <div
          className="rounded-3xl border border-red-200/70 bg-linear-to-br from-red-50/95 to-white/80 p-6 text-center shadow-sm"
          role="alert"
        >
          <p className="font-medium text-red-950">{error}</p>
          <button
            type="button"
            onClick={() => void cargar()}
            className="mt-5 inline-flex rounded-full border border-red-900/15 bg-white px-5 py-2 text-sm font-medium text-red-900 transition-colors hover:bg-red-50"
          >
            Reintentar
          </button>
        </div>
      )}

      {!cargando && !error && bandasTodas != null && countSinDistribuir > 0 && (
        <div
          className="relative z-[1] h-12 mb-6  flex flex-col gap-3 overflow-hidden rounded-2xl border border-amber-500 bg-yellow-300/50 px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-6"
          role="status"
        >
          <p
            className="text-sm font-medium text-amber-950 sm:text-base"
            style={{ fontFamily: "var(--font-lexend-ui)" }}
          >
            Hay {countSinDistribuir}{" "}
            {countSinDistribuir === 1 ? "banda sin distribuir" : "bandas sin distribuir"}
            . Completá grupo y subgrupo para que el calendario sea correcto.
          </p>
          <button
            type="button"
            onClick={() => setOpenModalSinDistribuir(true)}
            className="inline-flex shrink-0 items-center justify-center rounded-full border border-amber-800/20 bg-amber-900/90 px-5 py-2.5 text-sm font-semibold text-amber-50 shadow-sm transition hover:bg-amber-950"
            style={{ fontFamily: "var(--font-lexend-ui)" }}
          >
            Actualizar
          </button>
        </div>
      )}

      {!cargando && !error && bandasList != null && !hayDistribucion && (
        <div className="relative overflow-hidden rounded-3xl border border-amber-200/60 bg-amber-700/90 p-8 text-center shadow-[0_22px_50px_-38px_rgba(120,53,15,0.45)] sm:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-linear-to-br from-amber-200/55 to-transparent blur-2xl"
          />
          <p
            className="text-balance uppercase leading-tight tracking-[0.03em] text-stone-800 sm:text-xl"
            style={{ fontFamily: "var(--font-anton-display), sans-serif" }}
          >
            Aún no hay grupos para armar eventos
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone-600">
            Generá la distribución en la página Distribuciones y volvé acá para
            ver el calendario propuesto con las bandas.
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
