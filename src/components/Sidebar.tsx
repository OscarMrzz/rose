"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-48      pt-24">
      <Link
        className={`p-2 w-full h-12 hover:bg-slate-400 transition-colors cursor-pointer duration-300 ${pathname === "/bandas" ? "bg-slate-500 text-white" : ""}`}
        href="/bandas"
      >
        Bandas
      </Link>
     
      <Link
        className={`p-2 w-full h-12 hover:bg-slate-400 transition-colors cursor-pointer duration-300 ${pathname === "/distribuciones" ? "bg-slate-500 text-white" : ""}`}
        href="/distribuciones"
      >
        Distribuciones
      </Link>
    </div>
  );
}
