import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    KeyboardAvoidingView, 
    Platform, 
    ActivityIndicator, 
    Alert,
    ScrollView,
    StatusBar
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import { style, COLORS } from './style';
import api from '../../../services/api';

export default function Cadastro() {
    const navigation = useNavigation<NavigationProp<any>>();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // 1. Estados para controlar a visibilidade das senhas
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    async function handleRegister() {
        // Validações básicas
        if (!name || !email || !password || !confirmPassword) {
            return Alert.alert('Atenção', 'Preencha todos os campos.');
        }

        if (password !== confirmPassword) {
            return Alert.alert('Erro', 'As senhas não coincidem.');
        }

        if (password.length < 6) {
            return Alert.alert('Senha Fraca', 'A senha deve ter pelo menos 6 caracteres.');
        }

        try {
            setLoading(true);

            // Envia para o Backend (endpoint padrão /users)
            await api.post('/users', {
                name,
                email,
                password,
                level: 1, // Começa no nível 1
                experiencePoints: 0
            });

            Toast.show({
                type: 'success',
                text1: 'Conta Criada!',
                text2: 'Faça login para começar sua jornada.'
            });

            // Redireciona para o Login após 1.5s
            setTimeout(() => {
                navigation.navigate('Login');
            }, 1500);

        } catch (error: any) {
            console.log(error);
            const msg = error.response?.data?.message || 'Não foi possível criar a conta.';
            Alert.alert('Erro no Cadastro', msg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={style.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

            {/* --- EFEITOS DE FUNDO --- */}
            <LinearGradient
                colors={[COLORS.secondary, 'transparent']}
                start={{ x: 0.8, y: 0.1 }}
                end={{ x: 0.2, y: 0.8 }}
                style={style.backgroundEffectTopRight}
            />
             <LinearGradient
                colors={[COLORS.primary, 'transparent']}
                start={{ x: 0.2, y: 0.8 }}
                end={{ x: 0.8, y: 0.1 }}
                style={style.backgroundEffectBottomLeft}
            />
            {/* ------------------------ */}

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={style.contentContainer} showsVerticalScrollIndicator={false}>
                    
                    {/* Cabeçalho */}
                    <View style={style.headerContainer}>
                        <Text style={style.title}>Crie sua Conta</Text>
                        <Text style={style.subtitle}>Inicie sua jornada financeira!</Text>
                    </View>

                    {/* Formulário */}
                    <View style={style.formContainer}>
                        
                        {/* Nome */}
                        <View style={style.inputGroup}>
                            <Text style={style.label}>Nome</Text>
                            <View style={style.inputContainer}>
                                <FontAwesome name="user" size={18} color={COLORS.textSecondary} style={style.inputIcon} />
                                <TextInput
                                    style={style.input}
                                    placeholder="Seu nome"
                                    placeholderTextColor="#555"
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>
                        </View>

                        {/* Email */}
                        <View style={style.inputGroup}>
                            <Text style={style.label}>Email</Text>
                            <View style={style.inputContainer}>
                                <FontAwesome name="envelope" size={16} color={COLORS.textSecondary} style={style.inputIcon} />
                                <TextInput
                                    style={style.input}
                                    placeholder="seu@email.com"
                                    placeholderTextColor="#555"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        {/* Senha */}
                        <View style={style.inputGroup}>
                            <Text style={style.label}>Senha</Text>
                            <View style={style.inputContainer}>
                                <FontAwesome name="lock" size={20} color={COLORS.textSecondary} style={style.inputIcon} />
                                <TextInput
                                    // Adicionado paddingRight e flex: 1
                                    style={[style.input, { paddingRight: 40, flex: 1 }]}
                                    placeholder="********"
                                    placeholderTextColor="#555"
                                    value={password}
                                    onChangeText={setPassword}
                                    // Controla visibilidade
                                    secureTextEntry={!showPassword}
                                />
                                {/* Botão do Olho */}
                                <TouchableOpacity 
                                    onPress={() => setShowPassword(!showPassword)}
                                    style={{ padding: 10, position: 'absolute', right: 5 }}
                                >
                                    <FontAwesome 
                                        name={showPassword ? "eye" : "eye-slash"} 
                                        size={20} 
                                        color={COLORS.textSecondary} 
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                         {/* Confirmar Senha */}
                         <View style={style.inputGroup}>
                            <Text style={style.label}>Confirmar Senha</Text>
                            <View style={style.inputContainer}>
                                <FontAwesome name="check-circle" size={18} color={COLORS.textSecondary} style={style.inputIcon} />
                                <TextInput
                                    style={[style.input, { paddingRight: 40, flex: 1 }]}
                                    placeholder="********"
                                    placeholderTextColor="#555"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    // Controla visibilidade
                                    secureTextEntry={!showConfirmPassword}
                                />
                                {/* Botão do Olho (Confirmação) */}
                                <TouchableOpacity 
                                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={{ padding: 10, position: 'absolute', right: 5 }}
                                >
                                    <FontAwesome 
                                        name={showConfirmPassword ? "eye" : "eye-slash"} 
                                        size={20} 
                                        color={COLORS.textSecondary} 
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Botão Registrar */}
                        <TouchableOpacity 
                            style={[style.buttonContainer, loading && { opacity: 0.7 }]} 
                            onPress={handleRegister}
                            disabled={loading}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={[COLORS.primary, '#4A148C']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={style.gradientButton}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#FFF" />
                                ) : (
                                    <Text style={style.buttonText}>Cadastrar</Text>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>

                    </View>

                    {/* Rodapé */}
                    <View style={style.footerContainer}>
                        <Text style={style.footerText}>Já tem uma conta?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={style.linkText}>Entrar</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}