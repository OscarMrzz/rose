"use client";

import { getAllConfiguraciones } from "@/lib/services/configuracionServices";
import { ClienteBrowserSupabase } from "@/lib/supabase";
import { useConfiguracionStore } from "@/stores/configuracionStore";
import { useEffect } from "react";

/**
 * Sincroniza la configuración desde Supabase solo al iniciar sesión (evento SIGNED_IN),
 * no en cada refresco: el estado vive en localStorage vía persist de Zustand.
 */
export default function ConfiguracionSync() {
  useEffect(() => {
    const {
      data: { subscription },
    } = ClienteBrowserSupabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN") return;

      void (async () => {
        const rows = await getAllConfiguraciones();
        if (rows.length > 0) {
          useConfiguracionStore.getState().applyFromServer(rows[0]);
        }
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  return null;
}
