import React, { useState } from "react";
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Alert, 
    ActivityIndicator, 
    ScrollView, 
    KeyboardAvoidingView, 
    Platform,
    Keyboard
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Toast from 'react-native-toast-message'; // <--- IMPORTANTE: Importar o Toast
import { style } from "./style";
import api from "../../../services/api"; 

export default function Cadastro() {
    const navigation = useNavigation<NavigationProp<any>>();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function irParaLogin() {
        navigation.navigate("Login");
    }

    async function handleRegister() {
        Keyboard.dismiss(); // Fecha o teclado para o Toast ficar bem visível

        // --- Validações Locais ---
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return Alert.alert("Atenção", "Preencha todos os campos.");
        }
        if (password !== confirmPassword) {
            return Alert.alert("Erro", "As senhas não coincidem.");
        }
        if (password.length < 8) {
            return Alert.alert("Erro", "A senha deve ter pelo menos 8 caracteres.");
        }

        try {
            setIsLoading(true);

            const payload = {
                name: `${firstName} ${lastName}`.trim(),
                email: email.trim(),
                password: password
            };

            await api.post('/api/auth/register', payload);

            // --- SUCESSO COM TOAST ---
            Toast.show({
                type: 'success', // Define a cor verde (sucesso)
                text1: 'Cadastro realizado! 🎉',
                text2: 'Redirecionando para o login...',
                position: 'top',
                visibilityTime: 2000, // Fica 2 segundos na tela
            });

            // Aguarda o tempo do Toast e navega
            setTimeout(() => {
                navigation.navigate("Login");
            }, 2000);

        } catch (error: any) {
            console.log("Erro capturado:", error.message);
            
            // Tratamento de erros vindo do Backend
            if (error.response) {
                const data = error.response.data;
                // Erro de Validação (@Valid)
                if (error.response.status === 400 && data.errors) {
                    const firstErrorKey = Object.keys(data.errors)[0];
                    return Alert.alert("Dados Inválidos", data.errors[firstErrorKey]);
                }
                // Erro de Negócio (ex: Email duplicado)
                if (data.message) {
                    return Alert.alert("Atenção", data.message);
                }
            }
            
            Alert.alert("Erro", "Não foi possível realizar o cadastro.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
        >
            <ScrollView 
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="always" 
            >
                <View style={style.container}>

                    {/* Header */}
                    <View style={style.header}>
                        <Text style={style.title}>Olá, seja bem-vindo!</Text>
                        <Text style={style.subtext}>Cadastre-se para continuar</Text>
                    </View>

                    <View style={style.card}>
                        <Text style={style.title}>Cadastre-se</Text>

                        {/* Nome */}
                        <View style={style.inputGroup}>
                            <Text style={style.label}>Nome</Text>
                            <TextInput 
                                style={style.input} 
                                placeholderTextColor="#999" 
                                value={firstName} 
                                onChangeText={setFirstName} 
                            />
                        </View>

                        {/* Sobrenome */}
                        <View style={style.inputGroup}>
                            <Text style={style.label}>Sobrenome</Text>
                            <TextInput 
                                style={style.input} 
                                placeholderTextColor="#999" 
                                value={lastName} 
                                onChangeText={setLastName} 
                            />
                        </View>

                        {/* Email */}
                        <View style={style.inputGroup}>
                            <Text style={style.label}>Email</Text>
                            <TextInput 
                                style={style.input} 
                                placeholderTextColor="#999" 
                                keyboardType="email-address" 
                                autoCapitalize="none" 
                                value={email} 
                                onChangeText={setEmail} 
                            />
                        </View>

                        {/* Senha */}
                        <View style={style.inputGroup}>
                            <Text style={style.label}>Senha</Text>
                            <TextInput 
                                style={style.input} 
                                placeholderTextColor="#999" 
                                secureTextEntry 
                                value={password} 
                                onChangeText={setPassword} 
                            />
                        </View>

                        {/* Confirmar Senha */}
                        <View style={style.inputGroup}>
                            <Text style={style.label}>Confirme a senha</Text>
                            <TextInput 
                                style={style.input} 
                                placeholder="••••••••"
                                placeholderTextColor="#999" 
                                secureTextEntry 
                                value={confirmPassword} 
                                onChangeText={setConfirmPassword} 
                            />
                        </View>

                        {/* Botão de Cadastro */}
                        <TouchableOpacity
                            style={[style.button, isLoading && { opacity: 0.7 }]}
                            onPress={handleRegister}
                            disabled={isLoading}
                            activeOpacity={0.8}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#FFF" />
                            ) : (
                                <Text style={style.buttonText}>Cadastrar</Text>
                            )}
                        </TouchableOpacity>

                        {/* Footer */}
                        <View style={style.footer}>
                            <Text style={style.footerText}>Já possui uma conta? </Text>
                            <TouchableOpacity onPress={irParaLogin}>
                                <Text style={style.footerLink}>Faça login</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}