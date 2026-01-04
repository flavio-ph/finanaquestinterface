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
        // 1. Log para confirmar que a função começou
        console.log("--> Função handleRegister iniciada");
        Keyboard.dismiss(); // Fecha o teclado forçadamente

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            Alert.alert("Atenção", "Preencha todos os campos.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Erro", "As senhas não coincidem.");
            return;
        }

        if (password.length < 8) {
            Alert.alert("Erro", "A senha deve ter pelo menos 8 caracteres.");
            return;
        }

        try {
            setIsLoading(true);
            
            const payload = {
                name: `${firstName} ${lastName}`.trim(),
                email: email.trim(),
                password: password
            };
            
            console.log("Enviando dados para:", api.defaults.baseURL);

            // Timeout manual de 10 segundos para não travar o botão
            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error("Tempo limite excedido")), 10000)
            );

            await Promise.race([
                api.post('/api/auth/register', payload),
                timeoutPromise
            ]);

            Alert.alert("Sucesso", "Conta criada! Faça login.", [
                { text: "OK", onPress: () => navigation.navigate("Login") }
            ]);

        } catch (error: any) {
            console.log("Erro capturado:", error.message);
            const msg = error.response?.data?.message || error.message || "Erro de conexão";
            Alert.alert("Erro", String(msg));
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined} // "height" no Android às vezes causa bugs
            style={{ flex: 1 }}
        >
            <ScrollView 
                contentContainerStyle={{ flexGrow: 1 }}
                // "always" garante que o toque passa para o botão SEMPRE, mesmo com teclado aberto
                keyboardShouldPersistTaps="always" 
            >
                <View style={style.container}>

                    <View style={style.header}>
                        <Text style={style.title}>Olá, seja bem-vindo!</Text>
                        <Text style={style.label}>Cadastre-se para continuar</Text>
                    </View>

                    <View style={style.card}>
                        <Text style={style.title}>Cadastre-se</Text>

                        {/* Campos de Texto (Mantidos iguais) */}
                        <View style={style.inputGroup}>
                            <Text style={style.label}>Nome</Text>
                            <TextInput style={style.input} placeholderTextColor="#999" value={firstName} onChangeText={setFirstName} />
                        </View>
                        <View style={style.inputGroup}>
                            <Text style={style.label}>Sobrenome</Text>
                            <TextInput style={style.input} placeholderTextColor="#999" value={lastName} onChangeText={setLastName} />
                        </View>
                        <View style={style.inputGroup}>
                            <Text style={style.label}>Email</Text>
                            <TextInput style={style.input} placeholderTextColor="#999" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
                        </View>
                        <View style={style.inputGroup}>
                            <Text style={style.label}>Senha</Text>
                            <TextInput style={style.input} placeholderTextColor="#999" secureTextEntry value={password} onChangeText={setPassword} />
                        </View>
                        <View style={style.inputGroup}>
                            <Text style={style.label}>Confirme a senha</Text>
                            <TextInput style={style.input} placeholderTextColor="#999" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
                        </View>

                        {/* Botão com Debug de Toque */}
                        <TouchableOpacity
                            style={[style.button, isLoading && { opacity: 0.7 }]}
                            onPress={() => {
                                console.log("TOQUE DETETADO NO BOTÃO"); // Se isto não aparecer, é bloqueio visual
                                handleRegister();
                            }}
                            disabled={isLoading}
                            activeOpacity={0.8}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#FFF" />
                            ) : (
                                <Text style={style.buttonText}>Cadastrar</Text>
                            )}
                        </TouchableOpacity>

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