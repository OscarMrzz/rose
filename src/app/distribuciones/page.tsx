"use client";

import BandasSinDistribuirModal from "@/components/BandasSinDistribuirModal";
import BandaMiniCard from "@/components/BandaMiniCard";
import ApprovateMessage from "@/components/Message/ApprovateMessage";
import { bandaInterface } from "@/interface/interfaces";
import { getAllBandas } from "@/lib/services/bandasServices";
import {
  bandaSinGrupoOSubgrupo,
  distribuir,
} from "@/lib/utils/Distirbuir";
import { useConfiguracionStore } from "@/stores/configuracionStore";
import React, { useState } from "react";

const categorias = {
  0: "B",
  1: "A",
  2: "PREMIER",
};

const btnSecondary =
  "inline-flex h-11 min-h-[44px] shrink-0 items-center justify-center rounded-xl border border-slate-200/90 bg-slate-100/90 px-4 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-slate-200/95 hover:border-slate-300 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500";

export default function Page() {
  const tipoDistribucion = useConfiguracionStore((s) => s.tipo_distribucion);
  const tipoMostrar = useConfiguracionStore((s) => s.tipo_mostrar);

  const [bandasGrupo1, setBandasGrupo1] = useState<bandaInterface[]>([]);
  const [bandasGrupo2, setBandasGrupo2] = useState<bandaInterface[]>([]);
  const [indiceAMostrar, setIndiceAMostrar] = useState(0);

  const [bandas1A1Grupo1, setBandas1A1Grupo1] = useState<bandaInterface[]>([]);
  const [bandas1A1Grupo2, setBandas1A1Grupo2] = useState<bandaInterface[]>([]);
  const [isMostarTodo, setIsMostarTodo] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [openModalSinDistribuir, setOpenModalSinDistribuir] = useState(false);
  const [bandasSinDistribuir, setBandasSinDistribuir] = useState<
    bandaInterface[]
  >([]);

  const iniciarDistribucion = async () => {
    const bandas = await getAllBandas();

    if (tipoDistribucion !== "manual_grupo_subgrupo") {
      distribuir(tipoDistribucion, 2, 2, bandas);
    }

    const bandasActualizadas = await getAllBandas();
    const sinDatos = bandasActualizadas.filter(bandaSinGrupoOSubgrupo);
    if (sinDatos.length > 0) {
      setBandasSinDistribuir(sinDatos);
      setOpenModalSinDistribuir(true);
    } else {
      setOpenMessage(true);
    }
  };

  const mostrarTodo = async () => {
    setIsMostarTodo(true);
    const bandasYaDistribuidas = await getAllBandas();

    setBandasGrupo1([]);
    setBandasGrupo2([]);

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

    const grupo1OrdenadoPorCategoria = grupo1OrdenadoPorPosicion.sort(
      (a, b) => {
        const categoryOrder = Object.keys(categorias).map((key) =>
          parseInt(key),
        );
        const aCategoryIndex = categoryOrder.findIndex(
          (cat) =>
            categorias[cat as keyof typeof categorias] === a.categoria_banda,
        );
        const bCategoryIndex = categoryOrder.findIndex(
          (cat) =>
            categorias[cat as keyof typeof categorias] === b.categoria_banda,
        );

        return aCategoryIndex - bCategoryIndex;
      },
    );

    const grupo2OrdenadoPorCategoria = grupo2OrdenadoPorPosicion.sort(
      (a, b) => {
        const categoryOrder = Object.keys(categorias).map((key) =>
          parseInt(key),
        );
        const aCategoryIndex = categoryOrder.findIndex(
          (cat) =>
            categorias[cat as keyof typeof categorias] === a.categoria_banda,
        );
        const bCategoryIndex = categoryOrder.findIndex(
          (cat) =>
            categorias[cat as keyof typeof categorias] === b.categoria_banda,
        );

        return aCategoryIndex - bCategoryIndex;
      },
    );

    setBandasGrupo1(grupo1OrdenadoPorCategoria);
    setBandasGrupo2(grupo2OrdenadoPorCategoria);
  };

  const mostrar1a1 = async () => {
    if (bandas1A1Grupo1.length === 0 || !bandas1A1Grupo2) {
      setIsMostarTodo(true);
      const bandasYaDistribuidas = await getAllBandas();

      setBandasGrupo1([]);
      setBandasGrupo2([]);

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

      const grupo1OrdenadoPorCategoria = grupo1OrdenadoPorPosicion.sort(
        (a, b) => {
          const categoryOrder = Object.keys(categorias).map((key) =>
            parseInt(key),
          );
          const aCategoryIndex = categoryOrder.findIndex(
            (cat) =>
              categorias[cat as keyof typeof categorias] === a.categoria_banda,
          );
          const bCategoryIndex = categoryOrder.findIndex(
            (cat) =>
              categorias[cat as keyof typeof categorias] === b.categoria_banda,
          );

          return aCategoryIndex - bCategoryIndex;
        },
      );

      const grupo2OrdenadoPorCategoria = grupo2OrdenadoPorPosicion.sort(
        (a, b) => {
          const categoryOrder = Object.keys(categorias).map((key) =>
            parseInt(key),
          );
          const aCategoryIndex = categoryOrder.findIndex(
            (cat) =>
              categorias[cat as keyof typeof categorias] === a.categoria_banda,
          );
          const bCategoryIndex = categoryOrder.findIndex(
            (cat) =>
              categorias[cat as keyof typeof categorias] === b.categoria_banda,
          );

          return aCategoryIndex - bCategoryIndex;
        },
      );

      setBandas1A1Grupo1(grupo1OrdenadoPorCategoria);
      setBandas1A1Grupo2(grupo2OrdenadoPorCategoria);

      const indicePantallaPrincipal = indiceAMostrar;

      const paraMostrarGrupo1 = grupo1OrdenadoPorCategoria.slice(
        indiceAMostrar,
        indicePantallaPrincipal + 1,
      );
      const paraMostrarGrupo2 = grupo2OrdenadoPorCategoria.slice(
        indiceAMostrar,
        indicePantallaPrincipal + 1,
      );

      setBandasGrupo1(paraMostrarGrupo1);
      setBandasGrupo2(paraMostrarGrupo2);

      setIndiceAMostrar(indiceAMostrar + 1);
    } else {
      const indicePantallaPrincipal = indiceAMostrar;

      const paraMostrarGrupo1 = bandas1A1Grupo1.slice(
        0,
        indicePantallaPrincipal + 1,
      );
      const paraMostrarGrupo2 = bandas1A1Grupo2.slice(
        0,
        indicePantallaPrincipal + 1,
      );

      setBandasGrupo1(paraMostrarGrupo1);
      setBandasGrupo2(paraMostrarGrupo2);

      setIndiceAMostrar(indiceAMostrar + 1);
    }
  };

  const duelIndex = isMostarTodo ? indiceAMostrar - 1 : indiceAMostrar;
  const grupo1MiniClass = isMostarTodo
    ? "flex flex-wrap justify-center gap-3 sm:gap-4"
    : "grid w-full max-w-xl grid-cols-2 justify-items-center gap-3 sm:grid-cols-3 md:grid-cols-4 sm:gap-4";
  const grupo2MiniClass = isMostarTodo
    ? "flex flex-row-reverse flex-wrap justify-center gap-3 sm:gap-4"
    : "flex flex-row-reverse flex-wrap justify-center gap-3 sm:gap-4";

  const miniCardShell =
    "h-28 w-28 overflow-hidden rounded-xl bg-white ring-1 ring-slate-900/10 shadow-sm transition hover:shadow-md hover:ring-slate-900/15";
  /** Tarjetas grandes del duelo VS (section superior) */
  const duelStageCard =
    "relative flex aspect-square w-full max-w-[min(92vw,17.5rem)] flex-col overflow-hidden rounded-3xl bg-white shadow-[0_22px_50px_-12px_rgba(15,23,42,0.22)] ring-1 ring-white/80 sm:max-w-[20rem] md:max-w-[22rem] lg:max-w-[26rem]";

  const mostrarSegunConfig = async () => {
    if (tipoMostrar === "todo") {
      await mostrarTodo();
    } else {
      await mostrar1a1();
    }
  };

  return (
    <>
      <BandasSinDistribuirModal
        bandas={bandasSinDistribuir}
        open={openModalSinDistribuir}
        onClose={() => setOpenModalSinDistribuir(false)}
        onGuardar={async () => {
          const bandasActualizadas = await getAllBandas();
          const sinDatos = bandasActualizadas.filter(bandaSinGrupoOSubgrupo);
          setBandasSinDistribuir(sinDatos);
          if (sinDatos.length === 0) {
            setOpenMessage(true);
            return true;
          }
          return false;
        }}
      />
      <ApprovateMessage
        open={openMessage}
        onClose={() => setOpenMessage(false)}
      />
      <div className="relative mx-auto w-full max-w-[1600px] px-4 pb-28 pt-2 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_100%_60%_at_50%_-10%,rgba(14,165,233,0.11),transparent_55%),radial-gradient(ellipse_55%_45%_at_100%_55%,rgba(71,85,105,0.07),transparent_50%),linear-gradient(180deg,#e2e8f0_0%,#f1f5f9_40%,#e2e8f0_100%)]"
        />

        <header className="sticky top-2 z-10 mb-8 sm:top-3">
          <div className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm shadow-slate-900/5 backdrop-blur-md sm:p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/70 pb-3">
              <div>
                <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-sky-700/90">
                  ROSE · Distribuciones
                </p>
                <h1 className="font-sans text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
                  Armado de grupos y eventos
                </h1>
              </div>
              {(bandasGrupo1.length > 0 || bandasGrupo2.length > 0) && (
                <span className="rounded-full bg-slate-900/90 px-3 py-1 font-mono text-xs font-medium text-sky-50">
                  {isMostarTodo ? "Vista completa" : "Vista enfrentamiento"}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between lg:gap-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <button
                  type="button"
                  onClick={iniciarDistribucion}
                  className="inline-flex h-11 min-h-[44px] w-full items-center justify-center rounded-xl bg-sky-600 px-5 text-sm font-semibold text-white shadow-md shadow-sky-900/20 transition hover:bg-sky-500 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 sm:w-auto sm:min-w-44"
                >
                  Generar
                </button>
                <button
                  type="button"
                  onClick={mostrarSegunConfig}
                  className={`${btnSecondary} w-full sm:w-auto sm:min-w-36`}
                >
                  Mostrar
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Duelo destacado — arriba de los grupos */}
        <section
          aria-label="Enfrentamiento actual"
          className="relative mb-10 overflow-hidden rounded-3xl border border-white/70 bg-white/60 p-6 shadow-lg shadow-slate-900/6 backdrop-blur-sm sm:p-8 md:p-10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.45]"
            style={{
              backgroundImage: `linear-gradient(135deg, rgb(241 245 249) 0%, transparent 42%),
                radial-gradient(circle at 18% 22%, rgb(224 242 254 / 0.9), transparent 38%),
                radial-gradient(circle at 82% 78%, rgb(226 232 240 / 0.85), transparent 40%)`,
            }}
          />
          <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6">
            <div className="text-center">
              <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-sky-700/90">
               DISTRIBUCIÓN
              </p>
              <p className="mt-1 text-sm text-slate-600">
                
              </p>
            </div>

            <div className="flex w-full flex-col items-center justify-center gap-6 sm:flex-row sm:gap-4 md:gap-8 lg:gap-12">
              <div className="flex w-full flex-col items-center gap-2 sm:w-auto">
                <span className="font-mono text-[0.7rem] font-bold uppercase tracking-widest text-slate-500">
                  Grupo 1
                </span>
                <div
                  className={`${duelStageCard} h-60 w-60 after:pointer-events-none after:absolute after:inset-0 after:rounded-3xl after:ring-1 after:ring-inset after:ring-sky-500/25`}
                >
                  {bandasGrupo1[duelIndex] ? (
                    <BandaMiniCard banda={bandasGrupo1[duelIndex]} />
                  ) : (
                    <div className=" w-60 h-60 flex flex-1 items-center justify-center bg-slate-100/90 p-6 text-center font-mono text-sm text-slate-400">
                      
                    </div>
                  )}
                </div>
              </div>

              <div
                className="relative z-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-sky-600/35 bg-linear-to-br from-white to-slate-50 font-mono text-sm font-black tracking-widest text-sky-900 shadow-inner shadow-white/70 sm:h-16 sm:w-16 md:h-17 md:w-17 md:text-base"
                aria-hidden
              >
                VS
              </div>

              <div className="flex w-full flex-col items-center gap-2 sm:w-auto">
                <span className="font-mono text-[0.7rem] font-bold uppercase tracking-widest text-slate-500">
                  Grupo 2
                </span>
                <div
                  className={`${duelStageCard} h-60 w-60 after:pointer-events-none after:absolute after:inset-0 after:rounded-3xl after:ring-1 after:ring-inset after:ring-amber-500/20`}
                >
                  {bandasGrupo2[duelIndex] ? (
                    <BandaMiniCard banda={bandasGrupo2[duelIndex]} />
                  ) : (
                    <div className=" w-60 h-60 flex flex-1 items-center justify-center bg-slate-100/90 p-6 text-center font-mono text-sm text-slate-400">
                      
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solo listados por grupo */}
        <section
          aria-label="Bandas por grupo"
          className="flex w-full min-w-0 flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-6 lg:gap-10 xl:gap-14"
        >
          <div className="flex min-w-0 w-full flex-1 flex-col gap-5">
            <div className="text-center md:text-left">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-slate-500">
                Agrupación
              </p>
              <h2 className="font-sans text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
                Grupo 1
              </h2>
            </div>
            <div className={grupo1MiniClass}>
              {bandasGrupo1.map((banda) => (
                <div key={banda.id_banda} className={miniCardShell}>
                  <BandaMiniCard banda={banda} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex min-w-0 w-full flex-1 flex-col gap-5">
            <div className="text-center md:text-right">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-slate-500">
                Agrupación
              </p>
              <h2 className="font-sans text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
                Grupo 2
              </h2>
            </div>
            <div className={grupo2MiniClass}>
              {bandasGrupo2.map((banda) => (
                <div key={banda.id_banda} className={miniCardShell}>
                  <BandaMiniCard banda={banda} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
