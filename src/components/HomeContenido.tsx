"use client";

import { useAuth } from "@/hook/UseAuthHook";
import Link from "next/link";

export default function HomeContenido() {
  const { userAuth, isLoadingAuth, isAuthenticated } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 text-slate-600">
        Cargando…
      </div>
    );
  }

  if (isAuthenticated && userAuth) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8 text-center">
        <h1 className="text-3xl font-bold text-slate-800">
          Bienvenido a ROSE
        </h1>
        <p className="text-slate-600 max-w-md">
          Has iniciado sesión como{" "}
          <span className="font-medium text-slate-800">{userAuth.email}</span>.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            href="/bandas"
            className="rounded-lg bg-sky-800 px-5 py-2.5 text-white hover:bg-sky-900 transition-colors"
          >
            Ver bandas
          </Link>
          <Link
            href="/distribuciones"
            className="rounded-lg border-2 border-sky-800 px-5 py-2.5 text-sky-800 hover:bg-sky-50 transition-colors"
          >
            Distribuciones
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-3xl font-bold text-slate-800">ROSE</h1>
      <p className="text-slate-600 max-w-md">
        Distribución de bandas. Usa &quot;Iniciar sesión&quot; en la barra superior
        para acceder a tu cuenta.
      </p>
    </div>
  );
}
