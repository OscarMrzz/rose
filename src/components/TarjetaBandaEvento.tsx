"use client";

import { bandaInterface } from "@/interface/interfaces";
import { eventosTypeClassName } from "@/lib/eventosTypography";
import { obtenerUrlLogoBanda } from "@/lib/services/bandasServices";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  banda: bandaInterface;
  indiceVisual?: number;
};

/** Fondos y bordes planos por categoría */
function estiloCategoria(categoria: string) {
  const c = (categoria || "").toUpperCase();
  if (c === "PREMIER") {
    return {
      chipBg: "bg-amber-100",
      chipBorder: "border-amber-400",
      chipRing: "shadow-[0_0_0_1px_rgba(251,191,36,0.35)]",
      text: "text-amber-950",
    };
  }
  if (c === "A") {
    return {
      chipBg: "bg-stone-200",
      chipBorder: "border-stone-500",
      chipRing: "shadow-[0_0_0_1px_rgba(120,113,108,0.22)]",
      text: "text-stone-900",
    };
  }
  return {
    chipBg: "bg-sky-100",
    chipBorder: "border-sky-400",
    chipRing: "shadow-[0_0_0_1px_rgba(56,189,248,0.35)]",
    text: "text-sky-950",
  };
}

/** Patrón de cuadrícula muy suave (solo líneas, sin degradado) */


export default function TarjetaBandaEvento({ banda, indiceVisual = 0 }: Props) {
  const [urlImagen, setUrlImagen] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const path = banda.path_image_banda?.trim();
    if (!path) {
      setUrlImagen(null);
      setCargando(false);
      return;
    }
    setCargando(true);
    let cancelado = false;
    void obtenerUrlLogoBanda(path)
      .then((url) => {
        if (!cancelado) setUrlImagen(url);
      })
      .catch(() => {
        if (!cancelado) setUrlImagen(null);
      })
      .finally(() => {
        if (!cancelado) setCargando(false);
      });
    return () => {
      cancelado = true;
    };
  }, [banda.path_image_banda]);

  const tieneImagen = Boolean(urlImagen);
  const delay = Math.min(indiceVisual * 45, 400);
  const cat = estiloCategoria(banda.categoria_banda);

  const chipClase = `${cat.chipBg} ${cat.chipBorder} ${cat.chipRing} ${cat.text}`;

  return (
    <article
      className={`${eventosTypeClassName} relative isolate flex aspect-[3/4] min-h-[12.5rem] flex-col overflow-hidden rounded-lg border-2 border-stone-200 bg-white shadow-[8px_8px_0_0_rgba(231,229,228,0.95)] animate-in fade-in slide-in-from-bottom-2 fill-mode-both motion-reduce:animate-none`}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: "0.55s",
        fontFamily: "var(--font-lexend-ui), system-ui, sans-serif",
      }}
    >
      {/* Ligera textura (ruido monocromo, no color degradado) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5] rounded-[inherit] opacity-[0.04] mix-blend-multiply bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.72%22 numOctaves=%223%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.65%22/%3E%3C/svg%3E')]"
      />

      {/* Marco interior plano */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[3px] z-[6] rounded-[5px] border border-dashed border-stone-300/80"
      />

      {/* Esquinas */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-2 top-2 z-[6] h-5 w-5 border-l-2 border-t-2 border-amber-500"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-2 top-2 z-[6] h-5 w-5 border-r-2 border-t-2 border-amber-500"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-2 left-2 z-[6] h-5 w-5 border-b-2 border-l-2 border-stone-400"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-2 right-2 z-[6] h-5 w-5 border-b-2 border-r-2 border-stone-400"
      />

      {/* Acento lateral: bloque sólido (no fade) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-8 z-[4] h-20 w-1.5 rounded-r-sm bg-amber-400"
      />

      {cargando && (
        <div
          className="absolute inset-0 z-[20] flex flex-col items-center justify-center gap-4 bg-stone-100"
          aria-busy="true"
          aria-label="Cargando imagen de la banda"
        >
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-md border-2 border-stone-400" />
            <div className="absolute inset-2 animate-pulse rounded-sm bg-amber-200" />
            <div className="absolute inset-0 animate-[spin_2.4s_linear_infinite] rounded-md border-2 border-transparent border-t-amber-600" />
          </div>
          <span
            className="text-[0.58rem] font-semibold uppercase tracking-[0.38em] text-stone-500"
            style={{ fontFamily: "var(--font-lexend-ui)" }}
          >
            Cargando
          </span>
        </div>
      )}

      {!cargando && tieneImagen && urlImagen && (
        <>
          <div className="relative z-[2] h-[58%] w-full shrink-0 overflow-hidden bg-stone-100 sm:h-[60%]">
            <Image
              src={urlImagen}
              alt={banda.nombre_banda}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            />
            {/* Transición foto → texto: franja sólida semitransparente */}
          

            {/* Cinta categoría (plana) */}
            <div
              className={`absolute -left-8 top-7 z-[8] w-[145%] origin-top-left -rotate-[34deg] border-y-2 border-white py-1.5 text-center ${cat.chipBg} ${cat.chipRing}`}
            >
              <span
                className={`block text-[0.58rem] font-semibold uppercase tracking-[0.42em] ${cat.text}`}
                style={{ fontFamily: "var(--font-lexend-ui)" }}
              >
                {banda.categoria_banda}
              </span>
            </div>
          </div>

          <div className="relative z-[3] flex flex-1 flex-col justify-end bg-stone-50 px-3.5 pb-3.5 pt-2">
            <div
              aria-hidden
              className="mb-2.5 flex items-center gap-2"
            >
              <span className="h-2 w-2 shrink-0 rounded-sm bg-amber-500" />
              <span className="h-0.5 flex-1 bg-stone-300" />
              <span className="h-2 w-2 shrink-0 rounded-sm bg-stone-300" />
            </div>
            <p
              className="mb-1 text-[0.55rem] font-semibold uppercase tracking-[0.45em] text-stone-500"
              style={{ fontFamily: "var(--font-lexend-ui)" }}
            >
              Banda
            </p>
            <h3
              className="line-clamp-2 text-balance uppercase leading-[1.02] tracking-[0.02em] text-stone-900"
              style={{
                fontFamily: "var(--font-anton-display), sans-serif",
                fontSize: "clamp(0.95rem, 1.15vw + 0.55rem, 1.25rem)",
              }}
            >
              {banda.nombre_banda}
            </h3>
          </div>
        </>
      )}

      {!cargando && !tieneImagen && (
        <>
          <div
            className="absolute inset-0 z-[2] flex flex-col items-stretch justify-between overflow-hidden bg-white"

          >
            {/* Bloques decorativos planos */}
       
      

            <div className="relative z-[3] flex flex-1 flex-col items-center justify-center px-3 py-6 text-center">
              <div
                aria-hidden
                className="mb-3 flex items-center gap-1.5"
              >
                <span className="h-px w-6 bg-stone-400" />
                <span className="h-1.5 w-1.5 rotate-45 border-2 border-amber-500" />
                <span className="h-px w-6 bg-stone-400" />
              </div>
              <p
                className="max-h-[min(62%,13rem)] max-w-full text-balance uppercase leading-[0.94] text-stone-800 text-2xl"
                style={{
                  fontFamily: "var(--font-anton-display), sans-serif",
               
                  letterSpacing: "0.03em",
                }}
              >
                {banda.nombre_banda}
              </p>
              <div
                aria-hidden
                className="mt-3 flex items-center gap-1.5"
              >
                <span className="h-px w-6 bg-stone-400" />
                <span className="h-1.5 w-1.5 rotate-45 border-2 border-amber-500" />
                <span className="h-px w-6 bg-stone-400" />
              </div>
            </div>

            <div className="relative z-[3] border-t-2 border-amber-200 bg-white px-3 py-3.5">
              <div className="flex items-center justify-center gap-3">
                <span
                  className="hidden h-0.5 flex-1 max-w-20 bg-stone-300 sm:block"
                  aria-hidden
                />
                <span
                  className={`rounded-md border-2 px-4 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.38em] ${chipClase}`}
                  style={{ fontFamily: "var(--font-lexend-ui)" }}
                >
                  {banda.categoria_banda}
                </span>
                <span
                  className="hidden h-0.5 flex-1 max-w-20 bg-stone-300 sm:block"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </>
      )}
    </article>
  );
}
