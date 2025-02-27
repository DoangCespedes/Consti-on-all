'use client'

import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Creamos el contexto
const AuthContext = createContext();

// Hook personalizado para usar AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/auth/profile', {
          withCredentials: true
        });

        if (response.status === 200) {
          const { name, profile, status, user_id } = response.data;
          sessionStorage.setItem('token', response.data.token);
          setUser({ 
            name, 
            profile, 
            status, 
            user_id 
          });
        }
      } catch (error) {
        // Si no hay perfil, mantenemos el user en null
      } finally {
        setLoading(false);
      }
    };

    checkUserProfile();
  }, []);

  const login = async (userId, password) => {
    try {
      const response = await axios.post('http://localhost:7000/api/auth/login', {
        user_name: userId,
        password: password
      }, { withCredentials: true });

      if (response.status === 200) {
        await checkUserProfile(); // Verificamos el perfil del usuario tras iniciar sesión
        router.push('/app_e'); // Redirecciona después de iniciar sesión
      }
    } catch (error) {
      throw new Error('Error al iniciar sesión. Verifica tus credenciales.');
    }       
  };

  const logout = async () => {
    await axios.get('http://localhost:7000/api/auth/logout', { withCredentials: true });
    setUser(null); // Limpiar el estado de usuario al cerrar sesión
    sessionStorage.removeItem('token'); // Remover token al cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};