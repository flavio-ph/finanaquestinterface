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
    StatusBar // Importante para o visual dark
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
// Certifique-se de importar LinearGradient
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
            {/* Garante que a barra de status fique clara sobre o fundo escuro */}
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

            {/* --- EFEITOS DE GRADIENTE NO FUNDO --- */}
            
            {/* Efeito Canto Superior Esquerdo (Roxo vibrante para transparente) */}
            <LinearGradient
                colors={[COLORS.primary, 'transparent']}
                start={{ x: 0.1, y: 0.1 }}
                end={{ x: 0.8, y: 0.8 }}
                style={style.backgroundEffectTopLeft}
            />

            {/* Efeito Canto Inferior Direito (Roxo mais escuro para transparente) */}
            <LinearGradient
                colors={['#4A148C', 'transparent']}
                start={{ x: 0.8, y: 0.8 }}
                end={{ x: 0.1, y: 0.1 }}
                style={style.backgroundEffectBottomRight}
            />
            {/* ------------------------------------ */}


            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }} // Ocupa o espaço restante
            >
                <View style={style.contentContainer}>
                    
                    <View style={style.logoContainer}>
                      
                        <Text style={style.appName}>FINANQUEST</Text>
                        <Text style={style.tagline}>Sua jornada financeira começa aqui.</Text>
                    </View>

                    <View style={style.formContainer}>
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

                        <View style={style.inputGroup}>
                            <Text style={style.label}>Senha</Text>
                            <View style={style.inputContainer}>
                                <FontAwesome name="lock" size={20} color={COLORS.textSecondary} style={style.inputIcon} />
                                <TextInput
                                    style={style.input}
                                    placeholder="********"
                                    placeholderTextColor="#555"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                />
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
                                    <Text style={style.loginButtonText}>Entrar</Text>
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