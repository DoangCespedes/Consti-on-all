"use client"; 

import NavBar from '@/components/navbars/navPublic/NavBar';
import styles from './layout.module.css';  
import CustomDrawer from '@/components/drawer/CustomDrawer';

export default function Layout({ children }) {

  const botonesNavBar = [
    { titulo: "Salir", enlace: "/", color: "#01204E" },
  ];

  const companyName = {title: "HOME EMPLEADO", color:'#000', enlace: "/app_e"}; // Reemplaza con el nombre de tu compañía
  const bgColor = "#F2F2F2"; // Color de fondo opcional
  const colorTextDrawell = "#000"

  return (
    <div className={styles.bodyLayout}> 
      <NavBar
        companyName={companyName}
        buttons={botonesNavBar}
        bgColor={bgColor}
        colorTextDrawell={colorTextDrawell}
      />
      <div>
        <CustomDrawer style={{marginTop:'5rem'}}/>
      </div>
      <div style={{padding:'5rem'}}>
        {children}
      </div>
    </div>
  );
}
