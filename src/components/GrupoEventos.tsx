import { bandaInterface } from "@/interface/interfaces";
import React, { useEffect } from "react";
import BandaMiniCard from "./BandaMiniCard";

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
      const evento5: bandaInterface[] = bandasList.filter((banda) =>  (banda.grupo_banda === "1" && banda.subgrupo_banda === "1") ||  (banda.grupo_banda === "2" && banda.subgrupo_banda === "2"),);
      const evento6: bandaInterface[] = bandasList.filter((banda) =>(banda.grupo_banda === "1" && banda.subgrupo_banda === "2") ||(banda.grupo_banda === "2" && banda.subgrupo_banda === "1"),);

      await new Promise((resolve) => setTimeout(resolve, 0));

      if( numeroEventos === 6){


          
          setEventos([
              { nombre: "Evento 1", bandas: evento1 },
              { nombre: "Evento 2", bandas: evento2 },
              { nombre: "Evento 3", bandas: evento3 },
              { nombre: "Evento 4", bandas: evento4 },
              { nombre: "Evento 5", bandas: evento5 },
              { nombre: "Evento 6", bandas: evento6 },
            ]);
        }
      if( numeroEventos === 8){


          
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
      if( numeroEventos === 12){


          
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
      if( numeroEventos === 14){


          
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
      if( numeroEventos === 18){


          
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
      if( numeroEventos === 20){


          
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
        if( numeroEventos === 24){


          
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
  }, [bandasList, setEventos]);

  return (
    <>
      <div className="flex flex-col gap-24 mt-60">
       

        {
          eventos.map((evento) => (
            <div className="flex w-full justify-center flex-col gap-6" key={evento.nombre}>
              <h2 className="w-full flex justify-center text-6xl font-black text-slate-700">{evento.nombre}</h2>
              <div className="grid grid-cols-6 gap-4">
                {evento.bandas.map((banda) => (
                  <BandaMiniCard key={banda.id_banda} banda={banda} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
