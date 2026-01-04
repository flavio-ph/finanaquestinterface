import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import api from './api';
import { Alert } from 'react-native';


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

    useEffect(() => {
        async function loadStorageData() {
            try {
                const storedToken = await SecureStore.getItemAsync('userToken');
                const storedUser = await SecureStore.getItemAsync('userData');

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

            await SecureStore.setItemAsync('userToken', token);
            await SecureStore.setItemAsync('userData', JSON.stringify(user));

            setUser(user);

        } catch (error: any) {
            console.error("Erro no signIn context:", error);
            throw error; 
        }
    }

    async function signOut() {
        await SecureStore.deleteItemAsync('userToken');
        await SecureStore.deleteItemAsync('userData');
        api.defaults.headers.Authorization = null; // Limpa o header
        setUser(null);
    }

    async function updateUser(updatedUser: User) {
        setUser(updatedUser);
        await SecureStore.setItemAsync('userData', JSON.stringify(updatedUser));
    }

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signOut, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};