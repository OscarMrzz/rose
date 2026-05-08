import { bandaInterface } from "@/interface/interfaces";
import { eventosTypeClassName } from "@/lib/eventosTypography";
import React, { useEffect } from "react";
import TarjetaBandaEvento from "./TarjetaBandaEvento";

type Props = {
  numeroEventos: 6 | 8 | 12 | 14 | 18 | 20 | 24;
  bandasList: bandaInterface[];
};

interface EventosgrupoInterface {
  nombre: string;
  bandas: bandaInterface[];
}

export default function GrupoEventos({ numeroEventos, bandasList }: Props) {
  const [eventos, setEventos] = React.useState<EventosgrupoInterface[]>([]);

  useEffect(() => {
    const updateEventos = async () => {
      const evento1: bandaInterface[] = bandasList.filter(
        (banda) => banda.grupo_banda === "1",
      );
      const evento2: bandaInterface[] = bandasList.filter(
        (banda) => banda.grupo_banda === "2",
      );
      const evento3: bandaInterface[] = bandasList.filter(
        (banda) =>
          (banda.grupo_banda === "1" && banda.subgrupo_banda === "1") ||
          (banda.grupo_banda === "2" && banda.subgrupo_banda === "1"),
      );
      const evento4: bandaInterface[] = bandasList.filter(
        (banda) =>
          (banda.grupo_banda === "1" && banda.subgrupo_banda === "2") ||
          (banda.grupo_banda === "2" && banda.subgrupo_banda === "2"),
      );
      const evento5: bandaInterface[] = bandasList.filter(
        (banda) =>
          (banda.grupo_banda === "1" && banda.subgrupo_banda === "1") ||
          (banda.grupo_banda === "2" && banda.subgrupo_banda === "2"),
      );
      const evento6: bandaInterface[] = bandasList.filter(
        (banda) =>
          (banda.grupo_banda === "1" && banda.subgrupo_banda === "2") ||
          (banda.grupo_banda === "2" && banda.subgrupo_banda === "1"),
      );

      await new Promise((resolve) => setTimeout(resolve, 0));

      if (numeroEventos === 6) {
        setEventos([
          { nombre: "Evento 1", bandas: evento1 },
          { nombre: "Evento 2", bandas: evento2 },
          { nombre: "Evento 3", bandas: evento3 },
          { nombre: "Evento 4", bandas: evento4 },
          { nombre: "Evento 5", bandas: evento5 },
          { nombre: "Evento 6", bandas: evento6 },
        ]);
      }
      if (numeroEventos === 8) {
        setEventos([
          { nombre: "Evento 1", bandas: evento1 },
          { nombre: "Evento 2", bandas: evento2 },
          { nombre: "Evento 3", bandas: evento3 },
          { nombre: "Evento 4", bandas: evento4 },
          { nombre: "Evento 5", bandas: evento5 },
          { nombre: "Evento 6", bandas: evento6 },
          { nombre: "Evento 7", bandas: evento1 },
          { nombre: "Evento 8", bandas: evento2 },
        ]);
      }
      if (numeroEventos === 12) {
        setEventos([
          { nombre: "Evento 1", bandas: evento1 },
          { nombre: "Evento 2", bandas: evento2 },
          { nombre: "Evento 3", bandas: evento3 },
          { nombre: "Evento 4", bandas: evento4 },
          { nombre: "Evento 5", bandas: evento5 },
          { nombre: "Evento 6", bandas: evento6 },
          { nombre: "Evento 7", bandas: evento1 },
          { nombre: "Evento 8", bandas: evento2 },

          { nombre: "Evento 9", bandas: evento3 },
          { nombre: "Evento 10", bandas: evento4 },
          { nombre: "Evento 11", bandas: evento5 },
          { nombre: "Evento 12", bandas: evento6 },
        ]);
      }
      if (numeroEventos === 14) {
        setEventos([
          { nombre: "Evento 1", bandas: evento1 },
          { nombre: "Evento 2", bandas: evento2 },
          { nombre: "Evento 3", bandas: evento3 },
          { nombre: "Evento 4", bandas: evento4 },
          { nombre: "Evento 5", bandas: evento5 },
          { nombre: "Evento 6", bandas: evento6 },
          { nombre: "Evento 7", bandas: evento1 },
          { nombre: "Evento 8", bandas: evento2 },

          { nombre: "Evento 9", bandas: evento3 },
          { nombre: "Evento 10", bandas: evento4 },
          { nombre: "Evento 11", bandas: evento5 },
          { nombre: "Evento 12", bandas: evento6 },

          { nombre: "Evento 13", bandas: evento1 },
          { nombre: "Evento 14", bandas: evento2 },
        ]);
      }
      if (numeroEventos === 18) {
        setEventos([
          { nombre: "Evento 1", bandas: evento1 },
          { nombre: "Evento 2", bandas: evento2 },
          { nombre: "Evento 3", bandas: evento3 },
          { nombre: "Evento 4", bandas: evento4 },
          { nombre: "Evento 5", bandas: evento5 },
          { nombre: "Evento 6", bandas: evento6 },
          { nombre: "Evento 7", bandas: evento1 },
          { nombre: "Evento 8", bandas: evento2 },

          { nombre: "Evento 9", bandas: evento3 },
          { nombre: "Evento 10", bandas: evento4 },
          { nombre: "Evento 11", bandas: evento5 },
          { nombre: "Evento 12", bandas: evento6 },

          { nombre: "Evento 13", bandas: evento1 },
          { nombre: "Evento 14", bandas: evento2 },

          { nombre: "Evento 15", bandas: evento3 },
          { nombre: "Evento 16", bandas: evento4 },
          { nombre: "Evento 17", bandas: evento5 },
          { nombre: "Evento 18", bandas: evento6 },
        ]);
      }
      if (numeroEventos === 20) {
        setEventos([
          { nombre: "Evento 1", bandas: evento1 },
          { nombre: "Evento 2", bandas: evento2 },
          { nombre: "Evento 3", bandas: evento3 },
          { nombre: "Evento 4", bandas: evento4 },
          { nombre: "Evento 5", bandas: evento5 },
          { nombre: "Evento 6", bandas: evento6 },
          { nombre: "Evento 7", bandas: evento1 },
          { nombre: "Evento 8", bandas: evento2 },

          { nombre: "Evento 9", bandas: evento3 },
          { nombre: "Evento 10", bandas: evento4 },
          { nombre: "Evento 11", bandas: evento5 },
          { nombre: "Evento 12", bandas: evento6 },

          { nombre: "Evento 13", bandas: evento1 },
          { nombre: "Evento 14", bandas: evento2 },

          { nombre: "Evento 15", bandas: evento3 },
          { nombre: "Evento 16", bandas: evento4 },
          { nombre: "Evento 17", bandas: evento5 },
          { nombre: "Evento 18", bandas: evento6 },

          { nombre: "Evento 19", bandas: evento1 },
          { nombre: "Evento 20", bandas: evento2 },
        ]);
      }
      if (numeroEventos === 24) {
        setEventos([
          { nombre: "Evento 1", bandas: evento1 },
          { nombre: "Evento 2", bandas: evento2 },
          { nombre: "Evento 3", bandas: evento3 },
          { nombre: "Evento 4", bandas: evento4 },
          { nombre: "Evento 5", bandas: evento5 },
          { nombre: "Evento 6", bandas: evento6 },
          { nombre: "Evento 7", bandas: evento1 },
          { nombre: "Evento 8", bandas: evento2 },

          { nombre: "Evento 9", bandas: evento3 },
          { nombre: "Evento 10", bandas: evento4 },
          { nombre: "Evento 11", bandas: evento5 },
          { nombre: "Evento 12", bandas: evento6 },

          { nombre: "Evento 13", bandas: evento1 },
          { nombre: "Evento 14", bandas: evento2 },

          { nombre: "Evento 15", bandas: evento3 },
          { nombre: "Evento 16", bandas: evento4 },
          { nombre: "Evento 17", bandas: evento5 },
          { nombre: "Evento 18", bandas: evento6 },

          { nombre: "Evento 19", bandas: evento1 },
          { nombre: "Evento 20", bandas: evento2 },

          { nombre: "Evento 21", bandas: evento3 },
          { nombre: "Evento 22", bandas: evento4 },
          { nombre: "Evento 23", bandas: evento5 },
          { nombre: "Evento 24", bandas: evento6 },
        ]);
      }
    };

    updateEventos();
  }, [bandasList, numeroEventos]);

  return (
    <div
      className={`${eventosTypeClassName} flex flex-col gap-16 sm:gap-20 lg:gap-24`}
    >
      {eventos.map((evento, eventoIdx) => (
        <section
          className="relative scroll-mt-24"
          key={evento.nombre}
          aria-labelledby={`titulo-${evento.nombre.replace(/\s+/g, "-")}`}
        >
          <div className="mb-6 flex flex-col items-center gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div className="flex w-full flex-col items-center text-center sm:items-start sm:text-left">
              <span
                className="text-[0.62rem] font-semibold uppercase tracking-[0.36em] text-amber-900/80"
                style={{ fontFamily: "var(--font-lexend-ui)" }}
              >
                Bloque {String(eventoIdx + 1).padStart(2, "0")}
              </span>
              <div className="mt-2 flex items-center gap-4">
                <span
                  className="hidden h-px w-10 bg-linear-to-r from-transparent to-stone-400/80 sm:block"
                  aria-hidden
                />
                <h2
                  id={`titulo-${evento.nombre.replace(/\s+/g, "-")}`}
                  className="text-balance uppercase leading-none tracking-[0.04em] text-stone-900"
                  style={{
                    fontFamily: "var(--font-anton-display), sans-serif",
                    fontSize: "clamp(1.85rem, 3vw + 1rem, 3.2rem)",
                  }}
                >
                  {evento.nombre}
                </h2>
              </div>
              <p
                className="mt-2 max-w-md text-[0.65rem] font-medium uppercase tracking-[0.26em] text-stone-500"
                style={{ fontFamily: "var(--font-lexend-ui)" }}
              >
                {evento.bandas.length}{" "}
                {evento.bandas.length === 1 ? "banda" : "bandas"}
              </p>
            </div>
            <div
              className="h-[2px] w-full max-w-xs rounded-full bg-linear-to-r from-amber-600/55 via-stone-300/70 to-transparent sm:max-w-none sm:flex-1"
              aria-hidden
            />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {evento.bandas.map((banda, i) => (
              <TarjetaBandaEvento
                key={`${evento.nombre}-${banda.id_banda}-${i}`}
                banda={banda}
                indiceVisual={eventoIdx * 12 + i}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
