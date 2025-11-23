import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { style, COLORS } from './style';
import FloatingMenu from '../../menuFlutuante/menuFlutuante';
// Import de ícones se desejar usar no futuro
// import { FontAwesome } from '@expo/vector-icons';

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("Flávio Almeida");
    const [email, setEmail] = useState("flavio@example.com");
    
    const userLevel = 12;

    const handleSave = () => {
        Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
        setIsEditing(false);
    };

    const handleLogout = () => {
        Alert.alert("Logout", "Você saiu da conta.");
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={style.container}
        >
            <ScrollView contentContainerStyle={style.contentContainer}>
                
                <View style={style.header}>
                    <View style={style.avatarContainer}>
                        <Text style={style.avatarText}>
                            {name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                        </Text>
                    </View>
                    <Text style={style.userName}>{name}</Text>
                    <View style={style.userLevelBadge}>
                        <Text style={style.userLevelText}>Nível {userLevel}</Text>
                    </View>
                </View>

                <View style={style.formSection}>
                    
                    <Text style={style.label}>Nome Completo</Text>
                    <View style={[style.inputContainer, isEditing && style.inputContainerEditable]}>
                        <TextInput
                            style={[style.input, !isEditing && style.inputTextReadOnly]}
                            value={name}
                            onChangeText={setName}
                            editable={isEditing}
                        />
                    </View>

                    <Text style={style.label}>Email</Text>
                    <View style={[style.inputContainer, isEditing && style.inputContainerEditable]}>
                        <TextInput
                            style={[style.input, !isEditing && style.inputTextReadOnly]}
                            value={email}
                            onChangeText={setEmail}
                            editable={isEditing}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    {isEditing && (
                        <>
                            <Text style={style.label}>Nova Senha (Opcional)</Text>
                            <View style={[style.inputContainer, style.inputContainerEditable]}>
                                <TextInput
                                    style={style.input}
                                    placeholder="Deixe em branco para manter"
                                    placeholderTextColor={COLORS.textSecondary}
                                    secureTextEntry
                                />
                            </View>
                        </>
                    )}

                </View>

                {/* Botões de Ação */}
                <TouchableOpacity 
                    style={style.actionButton} 
                    onPress={() => isEditing ? handleSave() : setIsEditing(true)}
                >
                    <Text style={style.actionButtonText}>
                        {isEditing ? "Salvar Alterações" : "Editar Perfil"}
                    </Text>
                </TouchableOpacity>

                {isEditing && (
                    <TouchableOpacity 
                        style={[style.logoutButton, { marginBottom: 16, borderColor: COLORS.textSecondary }]} 
                        onPress={() => setIsEditing(false)}
                    >
                         <Text style={[style.logoutButtonText, { color: COLORS.textPrimary }]}>Cancelar</Text>
                    </TouchableOpacity>
                )}

                {!isEditing && (
                    <TouchableOpacity style={style.logoutButton} onPress={handleLogout}>
                        <Text style={style.logoutButtonText}>Sair da Conta</Text>
                    </TouchableOpacity>
                )}
            
             <FloatingMenu currentRoute="Perfil" />
                

            </ScrollView>

        </KeyboardAvoidingView>
    );
}