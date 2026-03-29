"use client";
import React from "react";
import BotonSengInSengUp from "../Auth/BotonSengInSengUp";
import FormularioAuth from "../Auth/FormularioAuth";

export default function Navbard() {

    const [openFormularioAuth, setOpenFormularioAuth] = React.useState(false);
  return (
    <>
    <FormularioAuth open={openFormularioAuth} onClose={() => setOpenFormularioAuth(false)} />
    
 
    <div className="flex w-full h-24 bg-slate-300 shadow border-b border-slate-100 justify-between items-center px-4">
      <div></div>

      <div></div>

      <div>
        <BotonSengInSengUp onClick={() => setOpenFormularioAuth(true)} haySesion={false} />
      </div>
    </div>
    </>
  );
}
