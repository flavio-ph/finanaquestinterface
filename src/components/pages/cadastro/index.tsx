import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import { style, COLORS } from "./style";

export default function Cadastro() {
    const navigation = useNavigation<NavigationProp<any>>();

    function irParaLogin() {
        navigation.navigate("Login");
    }

    return (
        <View style={style.container}>

            {/* Topo Preto com curva */}
            <View style={style.header}>
               
                  <Text style={style.title}>Olá, seja bem vindo!</Text>
                <Text style={style.subtext}>Cadastre-se para continuar</Text>
            </View>

            {/* Card Branco */}
            <View style={style.card}>

                <Text style={style.title}>Cadastre-se</Text>

                {/* First Name */}
                <View style={style.inputGroup}>
                    <Text style={style.label}>Nome</Text>
                    <TextInput
                        style={style.input}
                        placeholderTextColor="#999"
                    />
                </View>

                {/* Last Name */}
                <View style={style.inputGroup}>
                    <Text style={style.label}>Sobrenome</Text>
                    <TextInput
                        style={style.input}
                        placeholderTextColor="#999"
                    />
                </View>

                {/* Email */}
                <View style={style.inputGroup}>
                    <Text style={style.label}>Email</Text>
                    <TextInput
                        style={style.input}
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                    />
                </View>

                {/* Password */}
                <View style={style.inputGroup}>
                    <Text style={style.label}>Senha</Text>
                    <TextInput
                        style={style.input}
                        placeholderTextColor="#999"
                        secureTextEntry
                    />
                </View>

                {/* Confirm Password */}
                <View style={style.inputGroup}>
                    <Text style={style.label}>Confirme a senha</Text>
                    <TextInput
                        style={style.input}
                        placeholder="••••••••"
                        placeholderTextColor="#999"
                        secureTextEntry
                    />
                </View>

                {/* Botão */}
                <TouchableOpacity style={style.button}>
                    <Text style={style.buttonText}>Cadastrar</Text>
                </TouchableOpacity>

                {/* Footer */}
                <View style={style.footer}>
                    <Text style={style.footerText}>Já possuí uma conta? </Text>
                    <TouchableOpacity onPress={irParaLogin}>
                        <Text style={style.footerLink}>Faça login</Text>
                    </TouchableOpacity>
                </View>


            </View>

        </View>
    );
}
