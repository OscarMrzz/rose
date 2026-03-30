"use client";

import BandaMiniCard from "@/components/BandaMiniCard";
import GrupoEventos from "@/components/GrupoEventos";
import { bandaInterface } from "@/interface/interfaces";
import { getAllBandas } from "@/lib/services/bandasServices";
import {} from "@/lib/services/data";
import { distribuir } from "@/lib/utils/Distirbuir";
import Image from "next/image";
import React, { useState } from "react";

const categorias = {
  0: "B",
  1: "A",
  2: "PREMIER",
};

export default function Page() {
  const [tipoDistribucion, setTipoDistribucion] = useState<
    "tabla" | "aleatorio"
  >("tabla");

  const [bandasGrupo1, setBandasGrupo1] = useState<bandaInterface[]>([]);
  const [bandasGrupo2, setBandasGrupo2] = useState<bandaInterface[]>([]);
  const [indiceAMostrar, setIndiceAMostrar] = useState(0);

  const [bandas1A1Grupo1, setBandas1A1Grupo1] = useState<bandaInterface[]>([]);
  const [bandas1A1Grupo2, setBandas1A1Grupo2] = useState<bandaInterface[]>([]);
  const [isMostarTodo, setIsMostarTodo] = useState(false);

  const [cantidadEventos, setCantidadEventos] = useState<6 | 8 | 12 | 14 | 18 | 20 | 24>(6);

  const iniciarDistribucion = async () => {
    const bandas = await getAllBandas();

    distribuir(tipoDistribucion, cantidadEventos, 2, bandas);
  };

  const mostrarTodo = async () => {
    setIsMostarTodo(true);
    const bandasYaDistribuidas = await getAllBandas();

    // Limpiar los estados antes de agregar nuevas bandas
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
        // Get category order from the categorias object
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
        // Get category order from the categorias object
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

      // Limpiar los estados antes de agregar nuevas bandas
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
          // Get category order from the categorias object
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
          // Get category order from the categorias object
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
      console.log({
        indice: indiceAMostrar,
        todasLasBandas: paraMostrarGrupo1,
      });
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
      console.log({
        indice: indiceAMostrar,
        todasLasBandas: paraMostrarGrupo1,
      });
    }
  };

  return (
    <div className="w-full h-full pb-60 pr-24">
      <div className="w-full h-24 border-b border-slate-300 flex items-center gap-4 px-4">
        <select
          value={tipoDistribucion}
          onChange={(e) =>
            setTipoDistribucion(e.target.value as "tabla" | "aleatorio")
          }
          className="bg-blue-300 h-12 rounded-xl px-2"
        >
          <option value="tabla" disabled>Distribucion</option>
          <option value="tabla">Distribucion por tabla</option>
          <option value="aleatorio">Distribucion al azar</option>
        </select>
        <button
          onClick={iniciarDistribucion}
          className="bg-blue-300 h-12 rounded-xl px-4"
        >
          Generar
        </button>
        <select
          value={cantidadEventos}
          onChange={(e) =>
            setCantidadEventos(parseInt(e.target.value) as 6 | 8 | 12 | 14 | 18 | 20 | 24)
          }
          className="bg-blue-300 h-12 rounded-xl px-2 w-36"
        >
          <option value={6} disabled>Cant. eventos</option>
          <option value={6}>6</option>
          <option value={8}>8</option>
          <option value={12}>12</option>
          <option value={14}>14</option>
          <option value={18}>18</option>
          <option value={20}>20</option>
        </select>

        
        <button
          onClick={mostrarTodo}
          className="bg-blue-300 h-12 rounded-xl px-4"
        >
          Mostrar Todo
        </button>
        <button
          onClick={mostrar1a1}
          className="bg-blue-300 h-12 rounded-xl px-4"
        >
          Mostrar 1 a 1
        </button>
    
      </div>
      {!isMostarTodo ? (
        <section className="grid grid-cols-3 w-full h-full justify-between">
          <div className="flex flex-col items-center pt-12 gap-4 flex-1">
            <h2 className="text-4xl font-bold text-slate-700">GRUPO 1</h2>
            <div className="grid grid-cols-4 gap-4 px-4 w-full max-w-2xl">
              {bandasGrupo1.map((banda) => {
                return (
                  <div key={banda.id_banda} className="h-28 w-28 bg-slate-300">
                    <BandaMiniCard banda={banda} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex gap-4 pt-24 px-4 justify-center items-start">
            <div className="h-60 w-60 bg-slate-300 shrink-0">
              {bandasGrupo1[indiceAMostrar] && (
                <BandaMiniCard banda={bandasGrupo1[indiceAMostrar]} />
              )}
            </div>
            <div className="h-60 w-60 bg-slate-300 shrink-0">
              {bandasGrupo2[indiceAMostrar] && (
                <BandaMiniCard banda={bandasGrupo2[indiceAMostrar]} />
              )}
            </div>
          </div>
          <div className=" flex flex-col items-center pt-12 gap-4 flex-1">
            <h2 className="text-4xl font-bold text-slate-700">GRUPO 2</h2>
            <div className="flex flex-row-reverse gap-4 px-4 flex-wrap w-full max-w-2xl">
              {bandasGrupo2.map((banda) => {
                return (
                  <div key={banda.id_banda} className="h-28 w-28 bg-slate-300">
                    <BandaMiniCard banda={banda} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        <section className="grid grid-cols-3 w-full h-full justify-between">
          <div className=" flex flex-col items-center pt-12 gap-4 flex-1">
            <h2 className="text-4xl font-bold text-slate-700">GRUPO 1</h2>

            <div className="flex flex-wrap gap-4 px-4 w-full max-w-2xl">
              {bandasGrupo1.map((banda) => {
                return (
                  <div key={banda.id_banda} className="h-28 w-28 bg-slate-300">
                    <BandaMiniCard banda={banda} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex gap-4 pt-24 px-4 justify-center items-start">
            <div className="h-60 w-60 bg-slate-300 shrink-0">
              {bandasGrupo1[indiceAMostrar - 1] && (
                <BandaMiniCard banda={bandasGrupo1[indiceAMostrar - 1]} />
              )}
            </div>
            <div className="h-60 w-60 bg-slate-300 shrink-0">
              {bandasGrupo2[indiceAMostrar - 1] && (
                <BandaMiniCard banda={bandasGrupo2[indiceAMostrar - 1]} />
              )}
            </div>
          </div>
          <div className="  flex flex-col items-center pt-12 gap-4 flex-1">
            <h2 className="text-4xl font-bold text-slate-700">GRUPO 2</h2>
            <div className="flex flex-row-reverse gap-4 px-4 flex-wrap w-full max-w-2xl">
              {bandasGrupo2.map((banda) => {
                return (
                  <div key={banda.id_banda} className="h-28 w-28 bg-slate-300">
                    <BandaMiniCard banda={banda} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
      <section>
        {
          bandasGrupo1.length > 0 && (
            <GrupoEventos numeroEventos={cantidadEventos } bandasList={[...bandasGrupo1, ...bandasGrupo2]} />
          )
        }
      </section>
    </div>
  );
}
