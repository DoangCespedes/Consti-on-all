
'use client'
import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import { Typography } from '@mui/material';
import axios from 'axios';
import Dashboard from '@/components/dasboard/Dashboard';
import Link from 'next/link';

const AppE = () => {

  // const getProfile = async() =>{
  //   const response = await axios.get('http://localhost:7000/api/auth/profile', {
  //     withCredentials: true // Esto es necesario para enviar cookies junto con la solicitud
  // });
  //   console.log('prueba profile', response)
  // }

  const logout = async () => {
    const response = await axios.get('http://localhost:7000/api/auth/logout', {
      withCredentials: true // Esto es necesario para enviar cookies junto con la solicitud
    });
    console.log(response)
  };

  return (
    <>
    <Link href='/'>
      <div style={{display:'flex', flexDirection:'row', borderRadius:'20px', justifyContent:'end'}}>
        <button onClick={logout} style={{marginRight:'auto', borderRadius:'20px', justifyContent:'end'}}>
        <LogoutIcon/>
        </button>
      </div>
    </Link>
      <Typography variant="h4">
          Indicadores de Gestion
      </Typography>
      {/* <button onClick={getProfile}>
        getProfile
      </button> */}
      <Dashboard/>
    </>
  );
};

export default AppE;


