"use client";

import { useContext, useEffect } from 'react';
import NavBar from "@/components/navbars/NavBar";
import styles from './layout.module.css';
import CustomDrawer from "@/components/drawer/CustomDrawer";
import Head from "next/head";
import { UserContext } from "../../../context/user.context";
import axios from "axios";
import Link from "next/link";
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from "next/navigation"; // Este es el import correcto

export default function Layout({ children }) {
  const { user, setUser, getProfile } = useContext(UserContext);
  const router = useRouter(); // Inicializamos useRouter

  useEffect(() => {
    if (user != null) {
      console.log(user, 'TEST - USER');
      sessionStorage.setItem('user', user.name);
      sessionStorage.setItem('user_id', user.user_id);
      sessionStorage.setItem('profile', user.profile);
      sessionStorage.setItem('status', user.status);
    } else {
      console.log('AQUI QUIERO PROTEGER MI RUTA');
      router.push('/'); // Redirigimos al usuario a la página de inicio (o la ruta que necesites)
    }
  }, [user, router]);

  const logout = async () => {
    sessionStorage.setItem('user', null);
    sessionStorage.setItem('user_id', null);
    sessionStorage.setItem('profile', null);
    sessionStorage.setItem('status', null);
    const response = await axios.get('http://localhost:7000/api/auth/logout', {
      withCredentials: true,
    });
    console.log(response);
    setUser(null);
  };
  
  useEffect(() => {
    getProfile();
  }, []);

  const botonesNavBar = [
    { titulo: "Salir", enlace: "/", color: "#01204E" },
  ];

  const urlImg = { url: "/assets/LogoConsti.png", enlace: '/app_e' };
  const bgColor = "#F2F2F2";
  const colorTextDrawell = "#000";
  
  const menuOptions = [
    { label: 'Inicio', route: '/app_e', icon: 'HomeIcon' },
    { label: 'Mi perfil', route: '/app_e/mi_perfil', icon: 'PersonIcon' },
    { label: 'Gestion solicitudes', icon: 'DifferenceIcon', 
      children: [
        { label: 'Crear solicitud', route: '/app_e/crear_solicitud' },
        { label: 'Consultar solicitud', route: '/app_e/solicitudes' },
      ],
    },
    { label: 'Administración de usuarios', icon: 'AdminPanelSettingsIcon', 
      children: [
        { label: 'Crear', route: '/app_e/administracion_usuarios' },
        { label: 'Consulta de usuarios', route: '/app_e/administracion_usuarios/crear_empleado' },
        { label: 'Cambiar contrasena', route: '/app_e/administracion_usuarios/cambiar_clave' },
        { label: 'Configuracion de perfiles', route: '/app_e/administracion_perfiles' },
      ],
    },
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
        <div style={{ paddingLeft: '5rem', paddingRight: '5rem', position: 'relative', paddingTop: '2rem' }}>
          <Link href='/'>
            <div style={{ display: 'flex', flexDirection: 'row', borderRadius: '20px', justifyContent: 'end' }}>
              <button onClick={logout} style={{ marginRight: 'auto', borderRadius: '20px', justifyContent: 'end' }}>
                <LogoutIcon />
              </button>
            </div>
          </Link>
          {children}
        </div>
      </div>
    </>
  );
}