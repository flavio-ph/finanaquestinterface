import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { AuthProvider } from './src/services/authContext';
import Routes from './src/routes/index.routes';
import Toast from 'react-native-toast-message';

// 1. Criamos um tema personalizado para o NavigationContainer
const MyDarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#0D0D0D', // <--- AQUI ESTÁ O SEGREDO (Define o fundo global como escuro)
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyDarkTheme}>
      <AuthProvider>
        {/* Barra de Status clara para contrastar com fundo escuro */}
        <StatusBar barStyle="light-content" backgroundColor="#0D0D0D" />
        <Routes />
        <Toast />
      </AuthProvider>
    </NavigationContainer>
  );
}