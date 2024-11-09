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
    { titulo: "Ingresar", enlace: "/login", color: "#01204E" },
    { titulo: "Registro", enlace: "/registro", color: "#01204E" },
    { titulo: "Reiniciar clave", enlace: "/reiniciar_clave", color: "#01204E" },
  ];

  const urlImg = "https://segurosconstitucion.com/wp-content/uploads/logo.webp"; // Reemplaza con el nombre de tu compañía
  const bgColor = "#fff"; // Color de fondo opcional
  const colorTextDrawell = "#000"

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <CounterProvider>
          <header>
            {mostrarNavBar && (
              <NavBar
                urlImg={urlImg}
                buttons={botonesNavBar}
                bgColor={bgColor}
                colorTextDrawell={colorTextDrawell}
              />
            )}
          </header>
          {children}
        </CounterProvider>
      </body>
    </html>
  );
}
