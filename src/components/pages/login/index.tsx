import React, { useState, useContext } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Image, 
    KeyboardAvoidingView, 
    Platform, 
    ActivityIndicator, 
    Alert,
    StatusBar
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';

import { style, COLORS } from './style';
import { AuthContext } from '../../../services/authContext';

import LogoImg from '../../../assets/logo.png'; 

export default function Login() {
    const navigation = useNavigation<NavigationProp<any>>();
    const { signIn } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // 1. Estado para controlar a visibilidade da senha
    const [showPassword, setShowPassword] = useState(false);

    async function handleLogin() {
        if (!email || !password) {
            return Alert.alert('Atenção', 'Preencha email e senha.');
        }

        try {
            setLoading(true);
            await signIn(email, password);
        } catch (error) {
            Alert.alert('Erro no Login', 'Verifique suas credenciais e tente novamente.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={style.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

            {/* --- EFEITOS DE GRADIENTE NO FUNDO --- */}
            <LinearGradient
                colors={[COLORS.primary, 'transparent']}
                start={{ x: 0.1, y: 0.1 }}
                end={{ x: 0.8, y: 0.8 }}
                style={style.backgroundEffectTopLeft}
            />
            <LinearGradient
                colors={['#4A148C', 'transparent']}
                start={{ x: 0.8, y: 0.8 }}
                end={{ x: 0.1, y: 0.1 }}
                style={style.backgroundEffectBottomRight}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <View style={style.contentContainer}>
                    
                    <View style={style.logoContainer}>
                        {/* Se quiser usar a imagem importada: source={LogoImg} */}
                        <Text style={style.appName}>FINANQUEST</Text>
                        <Text style={style.tagline}>Sua jornada financeira começa aqui.</Text>
                    </View>

                    <View style={style.formContainer}>
                        {/* INPUT DE EMAIL */}
                        <View style={style.inputGroup}>
                            <Text style={style.label}>Email</Text>
                            <View style={style.inputContainer}>
                                <FontAwesome name="envelope" size={18} color={COLORS.textSecondary} style={style.inputIcon} />
                                <TextInput
                                    style={style.input}
                                    placeholder="exemplo@email.com"
                                    placeholderTextColor="#555"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        {/* INPUT DE SENHA COM BOTÃO DE OLHO */}
                        <View style={style.inputGroup}>
                            <Text style={style.label}>Senha</Text>
                            <View style={style.inputContainer}>
                                <FontAwesome name="lock" size={20} color={COLORS.textSecondary} style={style.inputIcon} />
                                <TextInput
                                    // Adicionamos paddingRight para o texto não ficar por baixo do ícone do olho
                                    style={[style.input, { paddingRight: 40, flex: 1 }]} 
                                    placeholder="********"
                                    placeholderTextColor="#555"
                                    value={password}
                                    onChangeText={setPassword}
                                    
                                    // 2. Controla a visibilidade
                                    secureTextEntry={!showPassword} 
                                />

                                {/* 3. Botão para alternar visibilidade */}
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

                        <TouchableOpacity 
                            style={[style.loginButtonContainer, loading && { opacity: 0.7 }]} 
                            onPress={handleLogin}
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
                                    <Text style={style.loginButtonText}>ENTRAR</Text>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    <View style={style.footerContainer}>
                        <Text style={style.footerText}>Ainda não tem conta?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                            <Text style={style.signupText}>Criar Conta</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </KeyboardAvoidingView>
        </View>
    );
}