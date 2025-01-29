
import Link from 'next/link';

const administracion_usuarios = () => {
  


  return (
    <>
      
      <div>AdminUser</div>
      <p>Buscar usuarios</p>
      <button>
        <Link href="/app_e/administracion_usuarios/cambiar_clave">
          Cambio de clave
        </Link>
      </button>
      <br />
      <button>
        <Link href="/app_e/administracion_usuarios/crear_empleado">
          Crear empleado
        </Link>
      </button>
    </>
  );
};

export default administracion_usuarios;
