import React from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';

import { style, COLORS } from "./style";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';

export default function Login() {

    const navigation = useNavigation<NavigationProp<any>>();

    function irParaCadastro() {
        navigation.navigate("Cadastro");
    }

    function irParaHome() {
        navigation.navigate("Home");
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={style.container}
        >
            <ScrollView>

                <View style={style.header}>
                    <Text style={style.title}>Bem-vindo de volta</Text>
                    <Text style={style.subtext}>Faça login para continuar</Text>
                </View>

                <View style={style.card}>

                     <Text style={style.title}>Login</Text>

                    <View style={style.inputGroup}>

                        <Text style={style.label}>Email</Text>

                        <TextInput
                            style={style.input}
                            placeholderTextColor={COLORS.textSecondary}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={style.inputGroup}>
                        <Text style={style.label}>Senha</Text>

                        <TextInput
                            style={style.input}
                            placeholderTextColor={COLORS.textSecondary}
                            secureTextEntry={true}
                        />
                    </View>

                    {/* Botão Entrar */}
                    <TouchableOpacity style={style.button} onPress={irParaHome}>
                        <Text style={style.buttonText}>Entrar</Text>
                    </TouchableOpacity>

                    <View style={style.dividerContainer}>
                        <View style={style.dividerLine} />
                        <Text style={style.dividerText}>Ou continue com</Text>
                        <View style={style.dividerLine} /> </View>
                    <View style={style.socialButtonsContainer}>
                        <TouchableOpacity style={style.socialButton}>
                            <FontAwesome name="google" size={24} color={COLORS.textPrimary} />
                        </TouchableOpacity> <TouchableOpacity style={style.socialButton}>
                            <FontAwesome name="facebook" size={24} color={COLORS.textPrimary} />
                        </TouchableOpacity> <TouchableOpacity style={style.socialButton}>
                            <FontAwesome name="apple" size={24} color={COLORS.textPrimary} />
                        </TouchableOpacity> </View> <View style={style.footerContainer}>

                    </View>

                    {/* Rodapé */}
                    <View style={style.footer}>
                        <Text style={style.footerText}>Não tem uma conta? </Text>
                        <TouchableOpacity onPress={irParaCadastro}>
                            <Text style={style.footerLink}>Cadastre-se</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </ScrollView>
        </KeyboardAvoidingView >
    )
}
