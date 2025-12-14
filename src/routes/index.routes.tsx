import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../components/pages/login";
import BottomRoutes from "./bottom.routes";
import Cadastro from "../components/pages/cadastro";
import Home from "../components/pages/home";
import Profile from "../components/pages/perfil";
import Transacao from "../components/pages/transacao";
import Extrato from "../components/pages/extrato";
import Metas from "../components/pages/metas";
import Relatorio from "../components/pages/relatorio";
import Challenges from "../components/pages/desafios";
import Conquistas from "../components/pages/conquistas";

export default function Routes(){

    const Stack = createStackNavigator()

    return (

        <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
            headerShown: false,
            cardStyle:{
                backgroundColor: "#ffffff"
            }
        }
        }>
            <Stack.Screen
                name="Login"
                component={Login}
                />
            <Stack.Screen
                name="BottomRoutes"
                component={BottomRoutes}
                />
                <Stack.Screen
                name="Cadastro"
                component={Cadastro}
                />
                <Stack.Screen
                name="Home"
                component={Home}
                />
                <Stack.Screen
                name="Profile"
                component={Profile}
                />
                <Stack.Screen
                name="Transacao"
                component={Transacao}
                />
                <Stack.Screen
                name="Extrato"
                component={Extrato}
                />
                <Stack.Screen
                name="Metas"
                component={Metas}
                />
                <Stack.Screen
                name="Relatorio"
                component={Relatorio}
                />
                <Stack.Screen
                name="Challenges"
                component={Challenges}
                />
                 <Stack.Screen
                name="Conquistas"
                component={Conquistas}
                />
        </Stack.Navigator>
    )

}