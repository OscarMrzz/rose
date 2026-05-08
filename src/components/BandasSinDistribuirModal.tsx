"use client";

import type { bandaInterface } from "@/interface/interfaces";
import { updateGruposBanda } from "@/lib/services/bandasServices";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Asignacion = { grupo: string; subgrupo: string };

export type BandasSinDistribuirModalProps = {
  bandas: bandaInterface[];
  open: boolean;
  onClose: () => void;
  /** Tras guardar; devolvé `false` para mantener el modal abierto (p. ej. aún hay pendientes). */
  onGuardar: () => void | Promise<boolean | void>;
};

const selectCell =
  "h-10 w-full min-w-[5.5rem] rounded-lg border border-slate-200 bg-white px-2 text-sm text-slate-900 shadow-inner focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-sky-500";

export default function BandasSinDistribuirModal({
  bandas,
  open,
  onClose,
  onGuardar,
}: BandasSinDistribuirModalProps) {
  const [asignaciones, setAsignaciones] = useState<Record<string, Asignacion>>(
    {},
  );
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || bandas.length === 0) return;
    const next: Record<string, Asignacion> = {};
    for (const b of bandas) {
      const g = String(b.grupo_banda ?? "").trim() || "1";
      const sg = String(b.subgrupo_banda ?? "").trim() || "1";
      next[b.id_banda] = { grupo: g, subgrupo: sg };
    }
    setAsignaciones(next);
    setError(null);
  }, [open, bandas]);

  const handleChange = (id: string, field: keyof Asignacion, value: string) => {
    setAsignaciones((prev) => ({
      ...prev,
      [id]: { ...prev[id]!, [field]: value },
    }));
  };

  const handleGuardar = async () => {
    setGuardando(true);
    setError(null);
    try {
      const results = await Promise.all(
        bandas.map((b) => {
          const a = asignaciones[b.id_banda];
          if (!a) {
            return Promise.resolve({ error: new Error("Sin asignación") });
          }
          return updateGruposBanda(b.id_banda, a.grupo, a.subgrupo);
        }),
      );
      const fallo = results.find((r) => r.error);
      if (fallo?.error) {
        setError("No se pudieron guardar todos los cambios. Reintentá.");
        return;
      }
      const cerrar = await Promise.resolve(onGuardar());
      if (cerrar !== false) {
        onClose();
      }
    } catch {
      setError("Error inesperado al guardar.");
    } finally {
      setGuardando(false);
    }
  };

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bandas-sin-distribuir-titulo"
      className="fixed inset-0 z-200 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="flex max-h-[min(90vh,720px)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-slate-100 bg-slate-50/90 px-5 py-4">
          <h2
            id="bandas-sin-distribuir-titulo"
            className="text-lg font-semibold text-slate-900"
          >
            Bandas sin grupo o subgrupo
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Elegí grupo y subgrupo para cada banda y guardá todos los cambios de
            una vez.
          </p>
        </div>

        <div className="min-h-0 flex-1 overflow-auto p-5">
          {bandas.length === 0 ? (
            <p className="text-center text-sm text-slate-500">
              No hay bandas pendientes.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full min-w-[480px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-100/90">
                    <th className="px-4 py-3 font-semibold text-slate-800">
                      Banda
                    </th>
                    <th className="px-4 py-3 font-semibold text-slate-800">
                      Grupo
                    </th>
                    <th className="px-4 py-3 font-semibold text-slate-800">
                      Subgrupo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bandas.map((b) => {
                    const row = asignaciones[b.id_banda];
                    return (
                      <tr
                        key={b.id_banda}
                        className="border-b border-slate-100 odd:bg-white even:bg-slate-50/60"
                      >
                        <td className="px-4 py-3 font-medium text-slate-900">
                          {b.nombre_banda}
                        </td>
                        <td className="px-4 py-2">
                          <select
                            aria-label={`Grupo para ${b.nombre_banda}`}
                            className={selectCell}
                            value={row?.grupo ?? "1"}
                            onChange={(e) =>
                              handleChange(b.id_banda, "grupo", e.target.value)
                            }
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                          </select>
                        </td>
                        <td className="px-4 py-2">
                          <select
                            aria-label={`Subgrupo para ${b.nombre_banda}`}
                            className={selectCell}
                            value={row?.subgrupo ?? "1"}
                            onChange={(e) =>
                              handleChange(
                                b.id_banda,
                                "subgrupo",
                                e.target.value,
                              )
                            }
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {error && (
          <p className="px-5 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/50 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={guardando}
            className="inline-flex h-11 min-h-[44px] items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-slate-50 disabled:opacity-60"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => void handleGuardar()}
            disabled={guardando || bandas.length === 0}
            className="inline-flex h-11 min-h-[44px] items-center justify-center rounded-xl bg-sky-600 px-6 text-sm font-semibold text-white shadow-md shadow-sky-900/15 transition hover:bg-sky-500 disabled:opacity-60"
          >
            {guardando ? "Guardando…" : "Guardar cambios"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
