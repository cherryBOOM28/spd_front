import React, { useState, useEffect, useContext, createContext } from 'react';
import Cookies from 'js-cookie';

const  AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const accessToken = Cookies.get('jwtAccessToken');
        const refreshToken = Cookies.get('jwtRefreshToken');
    
        if (accessToken && refreshToken) {
          setUser({ token: accessToken });
        }
    }, []);

    const login = (token, refreshToken) => {
        setUser({ token, refreshToken }); // провкерка токена и установка user-a если токен действителен
        Cookies.set('jwtAccessToken', token, { expires: 1, path: '/' });
        Cookies.set('jwtRefreshToken', refreshToken, { expires: 1, path: '/', secure: true, httpOnly: true, sameSite: 'strict' });
    };

    const logout = () => {
        setUser(null);

        Cookies.remove('jwtAccessToken');
        Cookies.remove('jwtRefreshToken');
    }

    return(
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider >
    )
};

export default AuthProvider;