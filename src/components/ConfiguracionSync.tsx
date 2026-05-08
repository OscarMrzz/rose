"use client";

import { getAllConfiguraciones } from "@/lib/services/configuracionServices";
import { setConfigCookies, clearConfigCookies } from "@/lib/configCookies";
import { ClienteBrowserSupabase } from "@/lib/supabase";
import { useConfiguracionStore } from "@/stores/configuracionStore";
import { useEffect } from "react";

/**
 * Sincroniza la configuración desde Supabase solo al iniciar sesión (evento SIGNED_IN),
 * no en cada refresco: el estado vive en localStorage vía persist de Zustand.
 * Al cerrar sesión (SIGNED_OUT) borra las cookies y restablece el store.
 */
export default function ConfiguracionSync() {
  useEffect(() => {
    const {
      data: { subscription },
    } = ClienteBrowserSupabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        void (async () => {
          const rows = await getAllConfiguraciones();
          if (rows.length > 0) {
            const store = useConfiguracionStore.getState();
            store.applyFromServer(rows[0]);
            setConfigCookies({
              id_configuracion: rows[0].id_configuracion,
              tipo_distribucion: store.tipo_distribucion,
              cantidad_eventos: store.cantidad_eventos,
              tipo_mostrar: store.tipo_mostrar,
              relacion_anfitrion: rows[0].relacion_anfitrion ?? "",
            });
          }
        })();
        return;
      }

      if (event === "SIGNED_OUT") {
        useConfiguracionStore.getState().reset();
        clearConfigCookies();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return null;
}
