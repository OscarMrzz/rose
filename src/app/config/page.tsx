"use client";

import { useConfiguracionStore } from "@/stores/configuracionStore";
import React from "react";

const selectBase =
  "h-11 min-h-[44px] w-full max-w-md rounded-xl border border-slate-200/90 bg-slate-50 px-3 text-sm text-slate-800 shadow-inner transition hover:border-slate-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500";

export default function ConfigPage() {
  const tipoDistribucion = useConfiguracionStore((s) => s.tipo_distribucion);
  const cantidadEventos = useConfiguracionStore((s) => s.cantidad_eventos);
  const tipoMostrar = useConfiguracionStore((s) => s.tipo_mostrar);
  const relacionAnfitrion = useConfiguracionStore((s) => s.relacion_anfitrion);
  const idConfig = useConfiguracionStore((s) => s.id_configuracion);

  const setTipoDistribucion = useConfiguracionStore((s) => s.setTipoDistribucion);
  const setCantidadEventos = useConfiguracionStore((s) => s.setCantidadEventos);
  const setTipoMostrar = useConfiguracionStore((s) => s.setTipoMostrar);
  const setRelacionAnfitrion = useConfiguracionStore((s) => s.setRelacionAnfitrion);
  const persistToSupabase = useConfiguracionStore((s) => s.persistToSupabase);

  const [saveMsg, setSaveMsg] = React.useState<string | null>(null);
  const [saving, setSaving] = React.useState(false);

  const handleGuardar = async () => {
    setSaving(true);
    setSaveMsg(null);
    const result = await persistToSupabase();
    setSaveMsg(result.message);
    setSaving(false);
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
      <header className="mb-8 border-b border-slate-200 pb-4">
        <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-sky-700/90">
          ROSE
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">Configuración</h1>
    
        {idConfig && (
          <p className="mt-2 font-mono text-xs text-slate-500">
            Id en servidor: {idConfig.slice(0, 8)}…
          </p>
        )}
      </header>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
          <label className="flex min-w-0 flex-1 flex-col gap-1 sm:min-w-48">
            <span className="text-sm font-medium text-slate-700">
              Tipo de distribución
            </span>
            <select
              value={tipoDistribucion}
              onChange={(e) =>
                setTipoDistribucion(e.target.value as "tabla" | "aleatorio")
              }
              className={selectBase}
            >
              <option value="tabla" disabled>
                Distribución
              </option>
              <option value="tabla">Distribución por tabla</option>
              <option value="aleatorio">Distribución al azar</option>
            </select>
          </label>

          <label className="flex min-w-0 flex-1 flex-col gap-1 sm:w-36 sm:flex-none">
            <span className="text-sm font-medium text-slate-700">
              Cantidad de eventos
            </span>
            <select
              value={cantidadEventos}
              onChange={(e) =>
                setCantidadEventos(
                  Number(e.target.value) as
                    | 6
                    | 8
                    | 12
                    | 14
                    | 18
                    | 20
                    | 24,
                )
              }
              className={`${selectBase} sm:min-w-36`}
            >
              <option value={6} disabled>
                Cant. eventos
              </option>
              <option value={6}>6</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
              <option value={14}>14</option>
              <option value={18}>18</option>
              <option value={20}>20</option>
              <option value={24}>24</option>
            </select>
          </label>
        </div>

        <label className="flex flex-col gap-1 max-w-md">
          <span className="text-sm font-medium text-slate-700">
            Cómo mostrar en Distribuciones
          </span>
          <select
            value={tipoMostrar}
            onChange={(e) =>
              setTipoMostrar(e.target.value as "todo" | "1a1")
            }
            className={selectBase}
          >
            <option value="todo">Todo</option>
            <option value="1a1">Uno a uno</option>
          </select>
          <p className="mt-1 text-xs text-slate-500">
            El botón &quot;Mostrar&quot; en Distribuciones usa este modo (también se
            guarda en el dispositivo).
          </p>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-700">
            Relación anfitrión
          </span>
          <input
            type="text"
            value={relacionAnfitrion}
            onChange={(e) => setRelacionAnfitrion(e.target.value)}
            className={selectBase}
            placeholder="Opcional"
            autoComplete="off"
          />
        </label>

        <div className="flex flex-col gap-2 border-t border-slate-200 pt-6 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={handleGuardar}
            disabled={saving}
            className="inline-flex h-11 min-h-[44px] items-center justify-center rounded-xl bg-sky-600 px-6 text-sm font-semibold text-white shadow-md shadow-sky-900/20 transition hover:bg-sky-500 disabled:opacity-60"
          >
            {saving ? "Guardando…" : "Guardar cambios"}
          </button>
          {saveMsg && (
            <span className="text-sm text-slate-700" role="status">
              {saveMsg}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
