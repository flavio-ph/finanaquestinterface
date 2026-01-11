import { StyleSheet, Text, View } from 'react-native';
import './gesture.handler'
import Routes from './src/routes/index.routes';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Toast from 'react-native-toast-message';
import { AuthProvider } from './src/services/authContext';


export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider> 
        <Routes/>
      </AuthProvider>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
