import Link from 'next/link'
import React from 'react'

const administracion_usuarios = () => {
  return (
    <>
      <div>AdminUser</div>

      <p> Buscar usuarios </p>
      <button><Link href='/app_e/administracion_usuarios/cambiar_clave'>cambio de clave</Link></button>
      <br/>
      <button><Link href='/app_e/administracion_usuarios/crear_empleado'>cambio de clave</Link></button>
    </>
  )
}

export default administracion_usuarios