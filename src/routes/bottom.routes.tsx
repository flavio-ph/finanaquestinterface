import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Importação das páginas da área logada
import Home from '../components/pages/home';
import Profile from '../components/pages/perfil';
import Metas from '../components/pages/metas';
import Transacao from '../components/pages/transacao';
import Extrato from '../components/pages/extrato';
import Relatorio from '../components/pages/relatorio';
import Desafios from '../components/pages/desafios';   // Confirme se a pasta é 'desafios' ou 'challenges'
import Conquistas from '../components/pages/conquistas';

const Stack = createStackNavigator();

export default function BottomRoutes() {
    return (
        <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{ 
                headerShown: false, // Remove o cabeçalho padrão em todas as telas
                cardStyle: { backgroundColor: '#0D0D0D' } // Garante fundo escuro na transição
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Perfil" component={Profile} />
            <Stack.Screen name="Metas" component={Metas} />
            <Stack.Screen name="Transacao" component={Transacao} />
            <Stack.Screen name="Extrato" component={Extrato} />
            <Stack.Screen name="Relatorio" component={Relatorio} />
            <Stack.Screen name="Desafios" component={Desafios} />
            <Stack.Screen name="Conquistas" component={Conquistas} />
        </Stack.Navigator>
    );
}