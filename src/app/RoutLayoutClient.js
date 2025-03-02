"use client"; 

import localFont from "next/font/local";
import "./globals.css";
import { CounterProvider } from "../../context/CounterContext";
import NavBar from "@/components/navbars/NavBar";
import { usePathname } from "next/navigation";
import { UserProviderWrapper } from "../../context/user.context";

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
  const esRutaPrivada = pathname.startsWith("/app_a") || pathname.startsWith("/app_e");
  const mostrarNavBar = !esRutaPrivada;

  // Array de botones personalizados
  const botonesNavBar = [
    { titulo: "Ingresar", enlace: "/login", color: "#01204E" },
    { titulo: "Registro", enlace: "/registro", color: "#01204E" },
    { titulo: "Reiniciar clave", enlace: "/reiniciar_clave", color: "#01204E" },
  ];

  // const urlImg ={url:"https://segurosconstitucion.com/wp-content/uploads/logo.webp", enlace:'/'}; 
  const urlImg ={url:"/assets/LogoConsti.png", enlace:'/'}; 
  const bgColor = "#fff"; // Color de fondo opcional
  const colorTextDrawell = "#000"

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="assets/favicon.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <UserProviderWrapper>
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
        </UserProviderWrapper>
      </body>
    </html>
  );
}
