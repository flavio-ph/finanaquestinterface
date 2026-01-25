import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { AuthProvider } from './src/services/authContext';
import Routes from './src/routes/index.routes';
import Toast from 'react-native-toast-message';

// 1. Criamos um TEMA ESCURO para o navegador
const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#0D0D0D', // Fundo Preto Profundo (Evita o piscar branco)
    card: '#1E1E1E',       // Cor de elementos de apoio
    text: '#FFFFFF',
    border: '#333333',
  },
};

export default function App() {
  return (
    // 2. Aplicamos o tema aqui
    <NavigationContainer theme={DarkTheme}>
      <AuthProvider>
        {/* StatusBar Transparente para design moderno */}
        <StatusBar 
            barStyle="light-content" 
            backgroundColor="transparent" 
            translucent 
        />
        <Routes />
        <Toast />
      </AuthProvider>
    </NavigationContainer>
  );
}