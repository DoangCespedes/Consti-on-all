import { useEffect } from 'react';
import { useAuth } from './AuthContext'; // Asegúrate de que la ruta sea correcta
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirige si no está autenticado y no está cargando
    if (!loading && !isAuthenticated()) {
      router.push('/login'); // Cambia '/login' a la ruta de tu inicio de sesión
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    // Mientras se verifica la autenticación, puedes devolver un indicador de carga
    return <div>Cargando...</div>;
  }

  return children; // Si está autenticado, devuelve los componentes hijos
};

export default ProtectedRoute;