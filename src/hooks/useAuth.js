import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login'); // Si no hay token, redirigir al login
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  return isAuthenticated;
}
