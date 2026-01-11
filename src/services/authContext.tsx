import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import api from '../services/api';
import { Alert, Platform } from 'react-native'; // Importar Platform

export interface User {
    id: number;
    name: string;
    email: string;
    level: number;
    experiencePoints: number;
}

interface AuthContextData {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
    updateUser: (user: User) => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // --- FUNÇÕES AUXILIARES PARA WEB vs MOBILE ---
    
    async function setStorage(key: string, value: string) {
        if (Platform.OS === 'web') {
            localStorage.setItem(key, value);
        } else {
            await SecureStore.setItemAsync(key, value);
        }
    }

    async function getStorage(key: string) {
        if (Platform.OS === 'web') {
            return localStorage.getItem(key);
        } else {
            return await SecureStore.getItemAsync(key);
        }
    }

    async function removeStorage(key: string) {
        if (Platform.OS === 'web') {
            localStorage.removeItem(key);
        } else {
            await SecureStore.deleteItemAsync(key);
        }
    }
    // ---------------------------------------------

    useEffect(() => {
        async function loadStorageData() {
            try {
                // Usa a função auxiliar
                const storedToken = await getStorage('userToken');
                const storedUser = await getStorage('userData');

                if (storedToken && storedUser) {
                    api.defaults.headers.Authorization = `Bearer ${storedToken}`;
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error("Erro ao carregar dados de sessão:", error);
            } finally {
                setLoading(false);
            }
        }

        loadStorageData();
    }, []);

    async function signIn(email: string, password: string) {
        try {
            const response = await api.post('/api/auth/login', {
                email,
                password,
            });

            const { token, user } = response.data;

            api.defaults.headers.Authorization = `Bearer ${token}`;

            // Usa a função auxiliar
            await setStorage('userToken', token);
            await setStorage('userData', JSON.stringify(user));

            setUser(user);

        } catch (error: any) {
            console.error("Erro no signIn context:", error);
            throw error; 
        }
    }

    async function signOut() {
        // Usa a função auxiliar
        await removeStorage('userToken');
        await removeStorage('userData');
        api.defaults.headers.Authorization = null;
        setUser(null);
    }

    async function updateUser(updatedUser: User) {
        setUser(updatedUser);
        // Usa a função auxiliar
        await setStorage('userData', JSON.stringify(updatedUser));
    }

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signOut, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};