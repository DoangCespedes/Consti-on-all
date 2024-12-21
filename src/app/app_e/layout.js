"use client";

import NavBar from '@/components/navbars/NavBar';
import styles from './layout.module.css';
import CustomDrawer from '@/components/drawer/CustomDrawer';
import Link from 'next/link';

export default function Layout({ children }) {
  const botonesNavBar = [
    { titulo: "Salir", enlace: "/", color: "#01204E" },
  ];

  const companyName = { title: "HOME EMPLEADO", color: '#000', enlace: "/app_e" };
  const bgColor = "#F2F2F2";
  const colorTextDrawell = "#000";

  const menuOptions = [
    { label: 'Home', route: '/app_e/inicio', icon: 'HomeIcon' },
    { label: 'Settings', route: '/settings', icon: 'SettingsIcon' },
    { label: 'Profile', route: '/profile', icon: 'PersonIcon' },
  ];

  return (
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
        {/* Contenedor responsivo */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            top: '2rem',
            right: '1rem',
          }}
        >
        <Link href='/app_e/'>
          <button
            style={{
              backgroundColor: '#01204E',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 15px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              zIndex: 10,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#014A9F';
              e.currentTarget.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#01204E';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }}
          >
            
            Volver
          </button>
        </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
