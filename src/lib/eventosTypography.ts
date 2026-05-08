import { Anton, Lexend_Deca } from "next/font/google";

export const antonDisplay = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton-display",
});

export const lexendUi = Lexend_Deca({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-lexend-ui",
});

/** Clases CSS vars para página eventos / tarjetas / bloques */
export const eventosTypeClassName = `${antonDisplay.variable} ${lexendUi.variable}`;
