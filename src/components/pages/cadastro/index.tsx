import React from "react";
import { 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    ScrollView, 
    KeyboardAvoidingView, 
    Platform 
} from 'react-native'
import { style } from "./style"; 
import { useNavigation, NavigationProp } from "@react-navigation/native";
import FloatingMenu from "../../menuFlutuante/menuFlutuante";



export default function Cadastro() {
    const navigation = useNavigation<NavigationProp<any>>();

    function irParaLogin() {
        navigation.navigate("Login"); 
    }

    const placeholderColor = style.possuiconta.color;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={style.container}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>

                <View style={style.form}>
                    <Text style={style.login}>Cadastre-se</Text>

                    <Text style={style.emailsenha}>Nome</Text>
                    <View style={style.boxinput}>
                        <TextInput 
                            style={style.input} 
                            placeholder="Seu nome completo"
                            placeholderTextColor={placeholderColor}
                            autoCapitalize="words"
                        />
                    </View>

                    <Text style={style.emailsenha}>Email</Text>
                    <View style={style.boxinput}>
                        <TextInput 
                            style={style.input}
                            placeholder="seuemail@exemplo.com"
                            placeholderTextColor={placeholderColor}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <Text style={style.emailsenha}>Telefone</Text>
                    <View style={style.boxinput}>
                        <TextInput 
                            style={style.input} 
                            placeholder="(99) 99999-9999"
                            placeholderTextColor={placeholderColor}
                            keyboardType="phone-pad"
                        />
                    </View>

                    <Text style={style.senha}>Senha</Text>
                    <View style={style.boxinput}>
                        <TextInput 
                            style={style.input} 
                            placeholder="Crie uma senha forte"
                            placeholderTextColor={placeholderColor}
                            secureTextEntry={true}
                        />
                    </View>

                    <TouchableOpacity style={style.botao}>
                        <Text style={style.textoentrar}>Cadastrar</Text>
                    </TouchableOpacity>

                    <View style={style.grupoOu}>
                        <View style={style.linha}></View>
                        <Text style={{ color: placeholderColor }}>Ou</Text>
                        <View style={style.linha}></View>
                    </View>
                    
                
                    <Text style={style.possuiconta}>
                        Já possui uma conta? <Text style={style.facalogin} onPress={irParaLogin}>Faça login</Text>
                    </Text>

                </View>                

            </ScrollView >
        </KeyboardAvoidingView>
    )
}