"use client";

import NavBar from '@/components/navbars/NavBar';
import styles from './layout.module.css';
import CustomDrawer from '@/components/drawer/CustomDrawer';
import Link from 'next/link';
import Head from 'next/head';

export default function Layout({ children }) {
  const botonesNavBar = [
    { titulo: "Salir", enlace: "/", color: "#01204E" },
  ];

  const companyName = { title: "HOME EMPLEADO", color: '#000', enlace: "/app_e" };
  const bgColor = "#F2F2F2";
  const colorTextDrawell = "#000";

  const menuOptions = [
    { label: 'Inicio', route: '/app_e', icon: 'HomeIcon' },
    { label: 'Solicitudes', route: '/app_e/solicitudes', icon: 'DifferenceIcon' },
    { label: 'Administración de perfiles', route: '/app_e/administracion_perfiles', icon: 'SettingsIcon' },
    { label: 'Administración de usuarios', icon: 'Diversity3Icon', 
      children: [
      { label: 'Crear empleado', route: '/app_e/administracion_usuarios/crear_empleado' },
      { label: 'Cambiar contrasena', route: '/app_e/administracion_usuarios/cambiar_clave' },
    ], },
    { label: 'Profile', route: '/profile', icon: 'PersonIcon' },
  ];

  return (
    <>
      <Head>
        <link rel="icon" href="assets/favicon.ico" />
      </Head>
      <div className={styles.bodyLayout}>
        <NavBar
          companyName={companyName}
          buttons={botonesNavBar}
          bgColor={bgColor}
          colorTextDrawell={colorTextDrawell}
        />
        <div>
          <CustomDrawer style={{ marginTop: '5rem' }} menuOptions={menuOptions} />
        </div>
        <div style={{ padding: '5rem', position: 'relative' }}>
        
          {children}
        </div>
      </div>
    </>
  );
}
