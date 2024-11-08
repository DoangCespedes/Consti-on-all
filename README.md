## Documentación del Proyecto: Consti-on-all

Bienvenido a la documentación del proyecto Consti-on-all, una aplicación web moderna desarrollada con Next.js 14, que se basa en la filosofía de React.js y permite la creación de aplicaciones eficientes y escalables. A continuación, se presentan los aspectos clave de la estructura y funcionalidad de la aplicación para facilitar su comprensión y uso.

## Descripción General
Consti-on-all es una aplicación que ofrece una plataforma para usuarios públicos y privados. El proyecto está organizado para que las diferentes vistas estén segmentadas según el nivel de acceso del usuario, proporcionando así una experiencia segura y personalizada.

## Tecnologías Utilizadas
Framework: Next.js 14, un framework de React que permite la creación de aplicaciones de servidor y cliente de manera fácil y eficiente.
Lenguaje: JavaScript y JSX.
Gestión de Rutas: Rutas definidas por archivos de acuerdo con la estructura de carpetas de Next.js.
Estilos y Fuentes: Uso de fuentes locales y personalización con CSS global.
Estructura del Proyecto
El proyecto se encuentra organizado de la siguiente manera:

src/
|-- app/
|   |-- [rutas públicas]
|   |-- app/ [rutas privadas]
|-- components/
|   |-- navbars/
|-- context/
|-- fonts/
|-- pages/ [rutas de Next.js (si aplican)]

## Rutas Públicas y Privadas
Rutas Públicas: Se encuentran dentro de la carpeta src/app/. Estas vistas están disponibles para cualquier usuario que acceda al dominio de la aplicación. Incluyen funcionalidades generales y contenido accesible sin autenticación.

Rutas Privadas: Están alojadas en src/app/app/ y solo son accesibles para usuarios con credenciales válidas. Estas rutas están protegidas por mecanismos de autenticación y autorización que verifican que los usuarios estén registrados y vinculados a una póliza de seguro con una de las compañías soportadas por la plataforma.

## Seguridad y Autenticación
La aplicación integra métodos de seguridad avanzados para la validación de usuarios en las rutas privadas, asegurando que solo los usuarios autorizados puedan acceder a la información sensible. Esto se logra mediante:

Validación de usuarios: Proceso de autenticación basado en registros de pólizas.
Autorización de rutas: Comprobaciones para limitar el acceso a las rutas privadas a usuarios con credenciales válidas.
Características Clave
Interfaz Responsiva: Optimizada para dispositivos móviles y de escritorio para asegurar una experiencia fluida y adaptada.
Rendimiento Optimizado: Uso de características de Next.js como la renderización híbrida (SSR y SSG) para mejorar el rendimiento.
Acceso Segregado: Implementación de rutas públicas y privadas para manejar diferentes niveles de acceso de usuario.

## Cómo Empezar
Instalación: Clona el repositorio y ejecuta los siguientes comandos:


```bash
npm install
npm run dev

```
## Estructura de Carpetas:

Las vistas públicas se encuentran en src/app/.
Las vistas privadas se encuentran en src/app/app/.

## Uso de la App:

Accede a las vistas públicas desde la raíz del proyecto.
Inicia sesión para poder acceder a las rutas privadas, las cuales están protegidas y requieren autenticación previa.
Futuras Implementaciones
El proyecto está en constante desarrollo y se planean las siguientes mejoras:

Mejora de la autenticación: Integración con servicios de autenticación de terceros.
Optimización del rendimiento: Uso de nuevas características de Next.js para mejorar el tiempo de carga.
Expansión de funcionalidades: Añadir más vistas y características según la demanda del usuario.