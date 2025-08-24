import { createContext, useContext, useState } from 'react';
import api from '../api/axios';


const AuthContext = createContext(null);


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));


    const login = async (username, password) => {
        const res = await api.post('/auth/login', { username, password });
        setUser({ role: res.data.role, username });
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
    };


    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    };


    const authApi = api;
    authApi.interceptors.request.use((config) => {
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    });


    return (
        <AuthContext.Provider value={{ user, token, login, logout, api: authApi }}>
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    return useContext(AuthContext);
}