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

  // const companyName = { title: "HOME EMPLEADO", color: '#000', enlace: "/app_e" };
  const urlImg ={url:"/assets/LogoConsti.png", enlace:'/app_e'}; 
  const bgColor = "#F2F2F2";
  const colorTextDrawell = "#000";

  const menuOptions = [
    { label: 'Inicio', route: '/app_e', icon: 'HomeIcon' },
    { label: 'Mi perfil', route: '/app_e/mi_perfil', icon: 'PersonIcon' },
    { label: 'Gestion solicitudes', icon: 'DifferenceIcon', 
      children: [
      { label: 'Crear solicitud', route: '/app_e/crear_solicitud' },
      { label: 'Consultar solicitud', route: '/app_e/solicitudes' },
      // { label: 'Agendar cita', route: '/app_e/crear_cita' },
    ], },
    { label: 'Administración de usuarios', icon: 'AdminPanelSettingsIcon', 
      children: [
      { label: 'Crear', route: '/app_e/administracion_usuarios' },
      { label: 'Consulta de usuarios', route: '/app_e/administracion_usuarios/crear_empleado' },
      { label: 'Cambiar contrasena', route: '/app_e/administracion_usuarios/cambiar_clave' },
      { label: 'Configuracion de perfiles', route: '/app_e/administracion_perfiles' },
    ], },
    { label: 'Consulta de usuarios', route: 'app_e/administracion_usuarios', icon: 'Diversity3Icon' },
    
  ];
  
  return (
    <>
      <Head>
        <link rel="icon" href="assets/favicon.ico" />
      </Head>
      <div className={styles.bodyLayout}>
        <NavBar
          urlImg={urlImg}
          buttons={botonesNavBar}
          bgColor={bgColor}
          colorTextDrawell={colorTextDrawell}
        />
        <div>
          <CustomDrawer style={{ marginTop: '5rem' }} menuOptions={menuOptions} />
        </div>
        <div style={{ paddingLeft: '5rem', paddingRight:'5rem', position: 'relative', paddingTop:'2rem' }}>
          {children}
        </div>
      </div>
    </>
  );
}
