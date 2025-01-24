import React from 'react'
import SolicitudesPorServicio from '@/components/solicitudes/SolicitudesPorServicio';


const page = () => {
  return (
    <>
        <h1
        style={{marginTop:'-20px'}}
        >Buscar solicitudes de ordenes por servicio</h1>
        
            <SolicitudesPorServicio/>
        
    </>
  )
}

export default page