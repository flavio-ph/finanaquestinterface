import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../components/pages/login';
import Cadastro from '../components/pages/cadastro';

const Stack = createStackNavigator();

export default function StackRoutes() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
        </Stack.Navigator>
    );
}