"use client";
import React from "react";
import BotonSengInSengUp from "../Auth/BotonSengInSengUp";
import FormularioAuth from "../Auth/FormularioAuth";
import { useAuth } from "@/hook/UseAuthHook";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cerrarSesion } from "@/lib/services/authServices";

const navLinks = [
  { href: "/bandas", label: "Bandas" },
  { href: "/distribuciones", label: "Distribuciones" },
  { href: "/eventos", label: "Eventos" },
  { href: "/config", label: "Configuración" },
];

export default function Navbard() {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  const [openFormularioAuth, setOpenFormularioAuth] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  React.useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const abrirFormularioAuth = () => {
    if (isAuthenticated) {
      cerrarSesion();
      setOpenFormularioAuth(false);
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

      {/* Navbar */}
      <div className="flex w-full h-18 shadow justify-between items-center px-4 bg-sky-800">
        <div className="text-4xl font-bold text-slate-400">ROSE</div>

        {/* Desktop links */}
        <div className="hidden md:flex justify-center gap-4 items-center">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              className="p-2 h-12 text-slate-300 hover:text-slate-400 transition-colors cursor-pointer duration-300"
              href={href}
            >
              {label}
            </Link>
          ))}
          <BotonSengInSengUp
            onClick={() => abrirFormularioAuth()}
            haySesion={isAuthenticated}
          />
        </div>

        {/* Mobile: solo hamburger; sesión va en el sidebar */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            aria-label="Abrir menú"
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-slate-300 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Mobile sidebar drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-sky-800 shadow-xl flex flex-col transform transition-transform duration-300 md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-4 h-18 border-b border-sky-700">
          <span className="text-4xl font-bold text-slate-400">ROSE</span>
          <button
            aria-label="Cerrar menú"
            onClick={() => setSidebarOpen(false)}
            className="p-2 text-slate-300 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer links */}
        <nav className="flex flex-col flex-1 px-4 py-6 gap-2 min-h-0">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-sky-700 transition-colors duration-200 font-medium ${
                pathname === href ? "bg-sky-700 text-white" : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-sky-700 shrink-0">
          <BotonSengInSengUp
            onClick={() => abrirFormularioAuth()}
            haySesion={isAuthenticated}
          />
        </div>
      </aside>
    </>
  );
}
