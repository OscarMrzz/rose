"use client";
import React from "react";
import BotonSengInSengUp from "../Auth/BotonSengInSengUp";
import FormularioAuth from "../Auth/FormularioAuth";
import { useAuth } from "@/hook/UseAuthHook";

export default function Navbard() {
  
  const {  isAuthenticated } =
    useAuth();

    const [openFormularioAuth, setOpenFormularioAuth] = React.useState(false);
  return (
    <>
    <FormularioAuth open={openFormularioAuth} onClose={() => setOpenFormularioAuth(false)} />
    
 
    <div className="flex w-full h-24 shadow border-b border-slate-100 justify-between items-center px-4">
      <div></div>

      <div></div>

      <div>
        <BotonSengInSengUp onClick={() => setOpenFormularioAuth(true)} haySesion={isAuthenticated} />
      </div>
    </div>
    </>
  );
}
