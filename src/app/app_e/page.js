
'use client'
import React from 'react'

import { Typography } from '@mui/material';
import Dashboard from '@/components/dasboard/Dashboard';

const AppE = () => {

  

  

  return (
    <>
    
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


