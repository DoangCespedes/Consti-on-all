import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const UserContext = createContext();

function UserProviderWrapper(props) {
    const [user, setUser] = useState(null);
    const router = useRouter();

    const getProfile = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/auth/profile', {
                withCredentials: true
            });
            if (response.status === 200) {
                const { name, profile, status, user_id } = response.data;
                setUser({ 
                    name, 
                    profile, 
                    status, 
                    user_id 
                });
            }
        } catch (error) {
            console.error('Error al obtener el perfil:', error);
        }
    };

    


    const logout = async () => {
        await axios.get('http://localhost:7000/api/auth/logout', {
            withCredentials: true
        });
        setUser(null); // Resetea el estado del usuario tras logout
    };

    const login = async (userId, password) => {
        try {
            const response = await axios.post('http://localhost:7000/api/auth/login', {
                user_name: userId,
                password: password
            }, { withCredentials: true });
            if (response.status === 200) {
                await getProfile(); // Espera a que se complete
                router.push('/app_e'); // Redirecciona después de obtener el perfil
            }
        } catch (error) {
            console.error('Error al hacer la solicitud:', error);
            throw new Error('Error al iniciar sesión. Por favor, revisa tus credenciales.');
        }
    };

    useEffect(() => {
        login(); 
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, login, logout, getProfile }}>
            {props.children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProviderWrapper };