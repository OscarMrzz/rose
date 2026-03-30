"use client";
import React from "react";
import BotonSengInSengUp from "../Auth/BotonSengInSengUp";
import FormularioAuth from "../Auth/FormularioAuth";
import { useAuth } from "@/hook/UseAuthHook";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cerrarSesion } from "@/lib/services/authServices";

export default function Navbard() {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  const [openFormularioAuth, setOpenFormularioAuth] = React.useState(false);
  const abrirFormularioAuth = () => {
    if (isAuthenticated) {
      cerrarSesion()
      setOpenFormularioAuth(false)
      return;
    }
    setOpenFormularioAuth(true);
  };
  return (
    <>
      <FormularioAuth
        open={openFormularioAuth}
        onClose={() => setOpenFormularioAuth(false)}
      />

      <div className="flex w-full h-18 shadow  justify-between items-center px-4 bg-sky-800">
        <div className="text-4xl font-bold text-slate-400">ROSE</div>

        <div></div>

        <div className="flex justify-center gap-4 items-center">
    
            <Link
              className={`p-2 w-full h-12 text-slate-300 hover:text-slate-400  transition-colors cursor-pointer duration-300 `}
              href="/bandas"
            >
              Bandas
            </Link>

            <Link
              className={`p-2 w-full h-12 text-slate-300 hover:text-slate-400  transition-colors cursor-pointer duration-300 `}
              href="/distribuciones"
            >
              Distribuciones
            </Link>
      
          <BotonSengInSengUp
            onClick={() => abrirFormularioAuth()}
            haySesion={isAuthenticated}
          />
        </div>
      </div>
    </>
  );
}
