import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Navbard from "@/components/layout/Navbard";
import Providers from "./Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ROSE",
  description: "App para distribucion de bandas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} `}
    >
      <Providers>

   
      <body className=" h-full flex flex-col w-full  antialiased bg-slate-200 ">
        <header>
          <Navbard />
        </header>
        <div className="flex w-full h-full  ">
        
          {children}
        </div>
        <footer></footer>
      </body>
      </Providers>
    </html>
  );
}
