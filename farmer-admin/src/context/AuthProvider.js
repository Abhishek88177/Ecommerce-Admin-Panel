import React, { createContext, useState, useEffect } from 'react';
import { loginService } from './AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState("USER");
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [autherization, setAutherization] = useState(false);


    useEffect(() => {
        if (token) {
            setUser(JSON.parse(localStorage.getItem('user')));
        }
    }, [token]);

    const loginRequest = async (loginData) => {
        try {
            const loggedInUser = await loginService(loginData);
            setAutherization(true)
            setRole(loggedInUser)
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{autherization , user,role, token, loginRequest, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
