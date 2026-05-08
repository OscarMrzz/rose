import type { TipoDistribucion, CantidadEventos, TipoMostrar } from "@/stores/configuracionStore";

const COOKIE_NAME = "rose-config";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export interface ConfigCookiePayload {
  id_configuracion: string | null;
  tipo_distribucion: TipoDistribucion;
  cantidad_eventos: CantidadEventos;
  tipo_mostrar: TipoMostrar;
  relacion_anfitrion: string;
}

export function setConfigCookies(payload: ConfigCookiePayload): void {
  if (typeof document === "undefined") return;
  const value = encodeURIComponent(JSON.stringify(payload));
  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function getConfigCookies(): ConfigCookiePayload | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match.split("=").slice(1).join("="))) as ConfigCookiePayload;
  } catch {
    return null;
  }
}

export function clearConfigCookies(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
}
