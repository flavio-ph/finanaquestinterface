import React, { useState, useContext } from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ActivityIndicator,
    Keyboard
} from 'react-native';

import { style, COLORS } from "./style";
import { useNavigation, NavigationProp, CommonActions } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import { AuthContext } from "../../../services/authContext";
import Toast from 'react-native-toast-message'; // <--- Importação do Toast

export default function Login() {

    const navigation = useNavigation<NavigationProp<any>>();
    const { signIn } = useContext(AuthContext); 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function irParaCadastro() {
        navigation.navigate("Cadastro");
    }

    async function handleLogin() {
        Keyboard.dismiss(); // Fecha o teclado para ver melhor o Toast

        if (!email || !password) {
            return Alert.alert("Atenção", "Preencha o email e a senha.");
        }

        try {
            setIsLoading(true);
            console.log("Tentando logar com:", email);

            await signIn(email, password);
            
            // --- SUCESSO COM TOAST ---
            Toast.show({
                type: 'success',
                text1: 'Bem-vindo de volta! 👋',
                text2: 'Login realizado com sucesso.',
                position: 'top',
                visibilityTime: 4000, // Fica visível durante a transição
            });

            // Redireciona para a Home e limpa o histórico
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Home" }],
                })
            );

        } catch (error: any) {
            console.log("--- ERRO DETALHADO ---");
            
            if (error.response) {
                let msg = "Não foi possível entrar.";

                if (error.response.status === 403) {
                    msg = "Acesso Negado (403). Verifique o CORS.";
                }
                else if (error.response.status === 401) {
                    msg = "Email ou senha incorretos.";
                } 
                else if (error.response.data && typeof error.response.data === 'string') {
                    msg = error.response.data;
                }

                // Opção: Pode usar Toast para erro também se preferir
                Alert.alert("Erro do Servidor", msg);
            } 
            else if (error.request) {
                Alert.alert("Erro de Conexão", "Não foi possível conectar ao servidor.");
            } 
            else {
                Alert.alert("Erro Interno", error.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={style.container}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">

                <View style={style.header}>
                    <Text style={style.title}>Bem-vindo de volta</Text>
                    <Text style={style.subtext}>Faça login para continuar</Text>
                </View>

                <View style={style.card}>

                    <Text style={style.title}>Login</Text>

                    {/* Input Email */}
                    <View style={style.inputGroup}>
                        <Text style={style.label}>Email</Text>
                        <TextInput
                            style={style.input}
                            placeholderTextColor={COLORS.textSecondary}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    {/* Input Senha */}
                    <View style={style.inputGroup}>
                        <Text style={style.label}>Senha</Text>
                        <TextInput
                            style={style.input}
                            placeholderTextColor={COLORS.textSecondary}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    {/* Botão Entrar */}
                    <TouchableOpacity 
                        style={[style.button, isLoading && { opacity: 0.7 }]} 
                        onPress={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#FFF" />
                        ) : (
                            <Text style={style.buttonText}>Entrar</Text>
                        )}
                    </TouchableOpacity>

                    <View style={style.dividerContainer}>
                        <View style={style.dividerLine} />
                        <Text style={style.dividerText}>Ou continue com</Text>
                        <View style={style.dividerLine} />
                    </View>

                    <View style={style.socialButtonsContainer}>
                        <TouchableOpacity style={style.socialButton}>
                            <FontAwesome name="google" size={24} color={COLORS.textPrimary} />
                        </TouchableOpacity>
                        <TouchableOpacity style={style.socialButton}>
                            <FontAwesome name="facebook" size={24} color={COLORS.textPrimary} />
                        </TouchableOpacity>
                        <TouchableOpacity style={style.socialButton}>
                            <FontAwesome name="apple" size={24} color={COLORS.textPrimary} />
                        </TouchableOpacity>
                    </View>

                    <View style={style.footer}>
                        <Text style={style.footerText}>Não tem uma conta? </Text>
                        <TouchableOpacity onPress={irParaCadastro}>
                            <Text style={style.footerLink}>Cadastre-se</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}