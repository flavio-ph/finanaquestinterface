import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";

// Importe o Contexto de Autenticação
import { AuthContext } from "../services/authContext";

// Importe os dois conjuntos de rotas
import StackRoutes from "./stack.routes"; // Crie este arquivo conforme acima
import BottomRoutes from "./bottom.routes"; // Suas rotas logadas (Home, etc)

export default function Routes(){
    // Pega o estado do usuário do contexto
    const { user, loading } = useContext(AuthContext);

    // 1. Tela de Carregamento (Splash Screen improvisada)
    // Enquanto o App verifica se tem token salvo no celular
    if (loading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D0D0D'}}>
                <ActivityIndicator size="large" color="#6A1B9A" />
            </View>
        );
    }

    // 2. A Lógica de Decisão:
    // Se tem usuário --> Mostra o App (Home/BottomTabs)
    // Se não tem --> Mostra o Login (Stack)
    return user ? <BottomRoutes /> : <StackRoutes />;
}