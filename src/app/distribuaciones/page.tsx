import React from "react";

export default function Page() {
  return (
    <div className="w-full h-full">
      <div className="w-full h-24 border-b border-slate-300 flex items-center gap-4 px-4">
        <select
          name=""
          id=""
          className="bg-slate-500 h-12 rounded-xl px-2"
          defaultValue=""
        >
          <option value="" disabled>
            Tipo de distribucion
          </option>
          <option value="tabla">Distribucion por tabla</option>
          <option value="azar">Distribucion al azar</option>
        </select>
        <select
          name=""
          id=""
          className="bg-slate-500 h-12 rounded-xl px-2"
          defaultValue=""
        >
          <option value="" disabled>
            Cant. Eventos
          </option>
          <option value={6}>6</option>
          <option value={8}>8</option>
          <option value={12}>12</option>
          <option value={14}>14</option>
          <option value={18}>18</option>
          <option value={20}>20</option>
        </select>

        <button className="bg-slate-500 h-12 rounded-xl px-4">Generar</button>
      </div>
      <section className="grid grid-cols-3   w-full h-full  justify-between">
        <div className="border-r border-slate-300  flex flex-col items-center  pt-12 gap-4">
          <h2 className="text-4xl font-bold text-slate-700">GRUPO 1</h2>
          <div className="grid grid-cols-4 gap-4 px-4">
            <div className="h-28 w-28 bg-slate-300"></div>
            <div className="h-28 w-28 bg-slate-300"></div>
            <div className="h-28 w-28 bg-slate-300"></div>
            <div className="h-28 w-28 bg-slate-300"></div>
            <div className="h-28 w-28 bg-slate-300"></div>
            <div className="h-28 w-28 bg-slate-300"></div>
            <div className="h-28 w-28 bg-slate-300"></div>
            <div className="h-28 w-28 bg-slate-300"></div>
            <div className="h-28 w-28 bg-slate-300"></div>
            <div className="h-28 w-28 bg-slate-300"></div>
            <div className="h-28 w-28 bg-slate-300"></div>
          </div>
        </div>
        <div className="flex gap-4 pt-24  px-4">
          <div className="h-60 w-60 bg-slate-300"></div>
          <div className="h-60 w-60 bg-slate-300"></div>
        </div>
        <div className="border-r border-slate-300  flex flex-col items-center  pt-12 gap-4">
          <h2 className="text-4xl font-bold text-slate-700">GRUPO 2</h2>
          <div className="grid grid-cols-4 gap-4 px-4">
            <div className="h-28 w-28 bg-slate-300"></div>
            <div className="h-28 w-28 bg-slate-300"></div>
            <div className="h-28 w-28 bg-slate-300"></div>
            <div className="h-28 w-28 bg-slate-300"></div>
            <div className="h-28 w-28 bg-slate-300"></div>
            <div className="h-28 w-28 bg-slate-300"></div>
            <div className="h-28 w-28 bg-slate-300"></div>
            <div className="h-28 w-28 bg-slate-300"></div>
            <div className="h-28 w-28 bg-slate-300"></div>
            <div className="h-28 w-28 bg-slate-300"></div>
            <div className="h-28 w-28 bg-slate-300"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
