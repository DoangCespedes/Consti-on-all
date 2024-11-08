"use client"; // Indicar que este archivo es un componente de cliente

import localFont from "next/font/local";
import "./globals.css";
import { CounterProvider } from "../../context/CounterContext";
import NavBar from "@/components/navbars/navPublic/NavBar";
import { usePathname } from "next/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayoutClient({ children }) {
  const pathname = usePathname();

  // Determinar si la ruta actual es una ruta privada
  const esRutaPrivada = pathname.startsWith("/store") || pathname.startsWith("/admin");
  const mostrarNavBar = !esRutaPrivada;

  // Array de botones personalizados
  const botonesNavBar = [
    { titulo: "Home", enlace: "/", color: "inherit" },
    { titulo: "Login", enlace: "/login", color: "secondary" },
    { titulo: "Registro", enlace: "/registro", color: "primary" },
    { titulo: "Reiniciar clave", enlace: "/reiniciar_clave", color: "error" },
  ];

  const companyName = "MiCompañía"; // Reemplaza con el nombre de tu compañía
  const bgColor = "primary.main"; // Color de fondo opcional

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <CounterProvider>
          <header>
            {mostrarNavBar && (
              <NavBar
                companyName={companyName}
                buttons={botonesNavBar}
                bgColor={bgColor}
              />
            )}
          </header>
          {children}
        </CounterProvider>
      </body>
    </html>
  );
}
