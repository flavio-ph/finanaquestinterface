import React from "react";
import gl from "../../../assets/gl.png"
import fb from "../../../assets/fb.png"
import { Text, View, TextInput, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { style } from "./style"; 
import { useNavigation, NavigationProp } from "@react-navigation/native";


export default function Login() {

    const navigation = useNavigation<NavigationProp<any>>();

    function irParaCadastro() {
        navigation.navigate("Cadastro"); 
    }

    function irParaHome() {
        navigation.navigate("Home")
    }

    const placeholderColor = style.possuiconta.color;

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={style.container}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                
                <View style={style.form}>
                    <Text style={style.login}>Login</Text>
                    
                    
                    <Text style={style.emailsenha}>Email</Text>
                    <View style={style.boxinput}>
                        <TextInput 
                            style={style.input} 
                            placeholder=""
                            placeholderTextColor={placeholderColor}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <Text style={style.senha}>Senha</Text>
                    <View style={style.boxinput}>
                        <TextInput 
                            style={style.input} 
                            placeholder=""
                            placeholderTextColor={placeholderColor}
                            secureTextEntry={true} 
                        />
                    </View>

                    <View style={style.esqueceusenha}>
                        <Text style={{ color: placeholderColor }}>Lembre de mim</Text> 
                        <TouchableOpacity>
                            <Text style={style.textoesqueceusenha}>Esqueceu a senha?</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={style.botao} onPress={irParaHome}>
                        <Text onPress={irParaHome} style={style.textoentrar}>Entrar</Text>
                    </TouchableOpacity>

                    <View style={style.grupoOu}>
                        <View style={style.linha}></View>
                        <Text style={{ color: placeholderColor }}>Ou</Text> 
                        <View style={style.linha}></View>
                    </View>

                    <TouchableOpacity style={style.logos}>
                        <Image 
                            source={gl} style={style.logo} resizeMode="contain"
                        />
                        <Text style={style.textoLogo}>Login com Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.logos}>
                        <Image 
                            source={fb} style={style.logo} resizeMode="contain"
                        />
                        <Text style={style.textoLogo}>Login com Facebook</Text>
                    </TouchableOpacity>

                     <Text style={style.possuiconta}>
                        Não possui uma conta? <Text style={style.facalogin} onPress={irParaCadastro}>Cadastre-se</Text>
                    </Text>

                </View>
                
            </ScrollView>
        </KeyboardAvoidingView>
    )
}