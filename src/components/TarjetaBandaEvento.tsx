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

function categoriaRibbon(categoria: string) {
  const c = (categoria || "").toUpperCase();
  if (c === "PREMIER") {
    return {
      bar: "from-amber-200 via-yellow-600 to-orange-950",
      glow: "shadow-[0_0_24px_rgba(251,191,36,0.45)]",
      text: "text-amber-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]",
    };
  }
  if (c === "A") {
    return {
      bar: "from-zinc-300 via-zinc-600 to-zinc-950",
      glow: "shadow-[0_0_18px_rgba(161,161,170,0.35)]",
      text: "text-zinc-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]",
    };
  }
  return {
    bar: "from-sky-400 via-blue-900 to-indigo-950",
    glow: "shadow-[0_0_18px_rgba(56,189,248,0.35)]",
    text: "text-sky-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]",
  };
}

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
  const ribbon = categoriaRibbon(banda.categoria_banda);

  return (
    <article
      className={`${eventosTypeClassName} group relative isolate flex aspect-[3/4] min-h-[12.5rem] flex-col overflow-hidden rounded-lg bg-zinc-950 shadow-[0_24px_50px_-28px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.06)_inset] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:-translate-y-1 hover:shadow-[0_34px_64px_-32px_rgba(0,0,0,0.75),0_0_0_1px_rgba(251,191,36,0.12)_inset] animate-in fade-in slide-in-from-bottom-2 fill-mode-both motion-reduce:animate-none`}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: "0.6s",
        fontFamily: "var(--font-lexend-ui), system-ui, sans-serif",
      }}
    >
      {/* Textura papel / ruido */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5] rounded-lg opacity-[0.07] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.72%22 numOctaves=%223%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.65%22/%3E%3C/svg%3E')]"
      />

      {/* Marco doble */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[2px] z-[6] rounded-[6px] border border-black/55"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[6px] z-[6] rounded-[4px] border border-amber-500/18"
      />

      {/* Esquinas tipo sellos */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-2 top-2 z-[6] h-5 w-5 border-l-2 border-t-2 border-amber-400/55"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-2 top-2 z-[6] h-5 w-5 border-r-2 border-t-2 border-amber-400/55"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-2 left-2 z-[6] h-5 w-5 border-b-2 border-l-2 border-amber-400/40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-2 right-2 z-[6] h-5 w-5 border-b-2 border-r-2 border-amber-400/40"
      />

      {/* Franja decorativa lateral */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 top-0 z-[4] w-1.5 bg-linear-to-b from-amber-500/90 via-amber-600/25 to-transparent opacity-80"
      />

      {cargando && (
        <div
          className="absolute inset-0 z-[20] flex flex-col items-center justify-center gap-4 bg-linear-to-br from-zinc-900 via-zinc-950 to-black"
          aria-busy="true"
          aria-label="Cargando imagen de la banda"
        >
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 rounded-md border-2 border-amber-500/30" />
            <div className="absolute inset-2 animate-pulse rounded-sm bg-linear-to-br from-amber-500/25 to-zinc-800/80" />
            <div className="absolute inset-0 animate-[spin_2.4s_linear_infinite] rounded-md border-2 border-transparent border-t-amber-400/70" />
          </div>
          <span
            className="text-[0.58rem] font-semibold uppercase tracking-[0.38em] text-amber-200/70"
            style={{ fontFamily: "var(--font-lexend-ui)" }}
          >
            Cargando
          </span>
        </div>
      )}

      {!cargando && tieneImagen && urlImagen && (
        <>
          <div className="relative z-[2] h-[58%] w-full shrink-0 overflow-hidden sm:h-[60%]">
            <Image
              src={urlImagen}
              alt={banda.nombre_banda}
              fill
              className="object-cover transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.06] group-hover:brightness-110 group-hover:contrast-[1.05]"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(0,0,0,0.55),transparent_68%)]" />

            {/* Cinta categoría */}
            <div
              className={`absolute -left-8 top-7 z-[8] w-[145%] origin-top-left -rotate-[34deg] bg-linear-to-r py-1.5 text-center ${ribbon.bar} ${ribbon.glow}`}
            >
              <span
                className={`block text-[0.58rem] font-semibold uppercase tracking-[0.42em] ${ribbon.text}`}
                style={{ fontFamily: "var(--font-lexend-ui)" }}
              >
                {banda.categoria_banda}
              </span>
            </div>
          </div>

          <div className="relative z-[3] flex flex-1 flex-col justify-end bg-linear-to-b from-zinc-950 via-zinc-950 to-black px-3.5 pb-3.5 pt-2">
            <div
              aria-hidden
              className="mb-2.5 h-px w-full bg-linear-to-r from-transparent via-amber-500/45 to-transparent"
            />
            <p
              className="mb-1 text-[0.55rem] font-semibold uppercase tracking-[0.45em] text-amber-500/90"
              style={{ fontFamily: "var(--font-lexend-ui)" }}
            >
              Actuación
            </p>
            <h3
              className="line-clamp-2 text-balance uppercase leading-[1.02] tracking-[0.02em] text-amber-50"
              style={{
                fontFamily: "var(--font-anton-display), sans-serif",
                fontSize: "clamp(0.95rem, 1.15vw + 0.55rem, 1.25rem)",
                textShadow: "0 2px 18px rgba(0,0,0,0.75)",
              }}
            >
              {banda.nombre_banda}
            </h3>
          </div>
        </>
      )}

      {!cargando && !tieneImagen && (
        <>
          <div className="absolute inset-0 z-[2] flex flex-col items-stretch justify-between overflow-hidden bg-zinc-950">
            <div
              aria-hidden
              className="absolute inset-0 bg-[repeating-linear-gradient(-28deg,transparent,transparent_11px,rgba(251,191,36,0.04)_11px,rgba(251,191,36,0.04)_12px)]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-br from-zinc-800/50 via-zinc-950 to-black"
            />
            <div
              aria-hidden
              className="absolute -right-1/4 top-0 h-[120%] w-1/2 rotate-12 bg-linear-to-l from-amber-500/12 to-transparent blur-3xl"
            />

            <div className="relative z-[3] flex flex-1 flex-col items-center justify-center px-3 py-6 text-center">
              <div
                aria-hidden
                className="mb-3 h-px w-12 bg-linear-to-r from-transparent via-amber-400/80 to-transparent sm:w-16"
              />
              <p
                className="max-h-[min(62%,13rem)] max-w-full text-balance uppercase leading-[0.94] text-amber-50"
                style={{
                  fontFamily: "var(--font-anton-display), sans-serif",
                  fontSize: "clamp(1.45rem, 6vw + 0.65rem, 2.85rem)",
                  letterSpacing: "0.03em",
                  textShadow:
                    "0 0 52px rgba(251,191,36,0.28), 0 2px 0 rgba(24,24,27,0.95), 0 6px 28px rgba(0,0,0,0.85)",
                }}
              >
                {banda.nombre_banda}
              </p>
              <div
                aria-hidden
                className="mt-3 h-px w-12 bg-linear-to-r from-transparent via-amber-400/80 to-transparent sm:w-16"
              />
            </div>

            <div className="relative z-[3] border-t border-amber-500/25 bg-black/65 px-3 py-3.5 backdrop-blur-md">
              <div className="flex items-center justify-center gap-3">
                <span
                  className="hidden h-[2px] flex-1 max-w-[5rem] bg-linear-to-r from-transparent to-amber-500/40 sm:block"
                  aria-hidden
                />
                <span
                  className={`rounded-md border border-white/10 bg-linear-to-r px-4 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.38em] shadow-lg ${ribbon.bar} ${ribbon.glow} ${ribbon.text}`}
                  style={{ fontFamily: "var(--font-lexend-ui)" }}
                >
                  {banda.categoria_banda}
                </span>
                <span
                  className="hidden h-[2px] flex-1 max-w-[5rem] bg-linear-to-l from-transparent to-amber-500/40 sm:block"
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
