"use client";

import NavBar from '@/components/navbars/NavBar';
import styles from './layout.module.css';
import CustomDrawer from '@/components/drawer/CustomDrawer';
import Head from 'next/head';

export default function Layout({ children }) {
  const botonesNavBar = [
    { titulo: "Salir", enlace: "/", color: "#01204E" },
  ];

  // const companyName = { title: "HOME ASEGURADO", color: '#000', enlace: "/app_e" };
  const urlImg ={url:"/assets/LogoConsti.png", enlace:'/app_a'}; 
  const bgColor = "#F2F2F2";
  const colorTextDrawell = "#000";

  const menuOptions = [
    { label: 'Home', route: '/app_a', icon: 'HomeIcon' },
    { label: 'Settings', route: '/settings', icon: 'SettingsIcon' },
    { label: 'Gestion solicitudes', icon: 'DifferenceIcon', 
      children: [
      { label: 'Crear solicitud', route: '/app_a/crear_solicitud' },
      { label: 'Consultar solicitud', route: '/app_a/solicitudes' },
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
