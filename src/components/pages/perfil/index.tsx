import React, { useState, useContext, useEffect } from 'react';
import { 
    View, Text, TextInput, TouchableOpacity, ScrollView, 
    KeyboardAvoidingView, Platform, Alert, ActivityIndicator 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Import do Gradiente
import { FontAwesome } from '@expo/vector-icons'; // Import de Ícones

import { style, COLORS } from './style';
import FloatingMenu from '../../menuFlutuante/menuFlutuante';
import { AuthContext } from '../../../services/authContext';
import api from '../../../services/api';
import Toast from 'react-native-toast-message';

export default function Profile() {
    const { user, signOut, updateUser } = useContext(AuthContext);

    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Estados do Formulário
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 

    // Carrega dados
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const handleSave = async () => {
        if (!user) return;
        if (!name.trim() || !email.trim()) return Alert.alert("Erro", "Campos obrigatórios.");

        setIsLoading(true);

        try {
            const payload: any = {
                id: user.id,
                name: name,
                email: email,
                level: user.level,
                experiencePoints: user.experiencePoints
            };

            if (password.trim().length > 0) payload.password = password;

            const response = await api.put(`/users/${user.id}`, payload);
            
            updateUser({
                ...user,
                name: response.data.name,
                email: response.data.email
            });

            Toast.show({ type: 'success', text1: 'Perfil Atualizado!' });

            setIsEditing(false);
            setPassword(""); 

        } catch (error) {
            Alert.alert("Erro", "Não foi possível atualizar.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        Alert.alert("Sair", "Deseja realmente sair?", [
            { text: "Cancelar", style: "cancel" },
            { text: "Sair", style: "destructive", onPress: () => signOut() }
        ]);
    };

    const getInitials = (fullName: string) => {
        const names = fullName.trim().split(' ');
        if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
        return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={style.container}
        >
            <ScrollView contentContainerStyle={style.contentContainer} keyboardShouldPersistTaps="handled">
                
                {/* --- HEADER --- */}
                <View style={style.header}>
                    <View style={style.avatarContainer}>
                        <Text style={style.avatarText}>
                            {getInitials(name || "Visitante")}
                        </Text>
                    </View>
                    <Text style={style.userName}>{user?.name || "Usuário"}</Text>
                    
                    <View style={style.badgesRow}>
                        <View style={style.levelBadge}>
                            <Text style={style.levelText}>NÍVEL {user?.level || 1}</Text>
                        </View>
                        <View style={style.xpBadge}>
                            <Text style={style.xpText}>{user?.experiencePoints || 0} XP</Text>
                        </View>
                    </View>
                </View>

                {/* --- FORMULÁRIO --- */}
                <View style={style.formSection}>
                    
                    {/* Nome */}
                    <View style={style.inputGroup}>
                        <Text style={style.label}>NOME DE JOGADOR</Text>
                        <View style={[style.inputContainer, isEditing && style.inputContainerEditable]}>
                            <FontAwesome name="user" size={18} color={isEditing ? COLORS.primary : COLORS.textSecondary} style={style.inputIcon} />
                            <TextInput
                                style={[style.input, !isEditing && style.inputTextReadOnly]}
                                value={name}
                                onChangeText={setName}
                                editable={isEditing}
                            />
                        </View>
                    </View>

                    {/* Email */}
                    <View style={style.inputGroup}>
                        <Text style={style.label}>EMAIL DE ACESSO</Text>
                        <View style={[style.inputContainer, isEditing && style.inputContainerEditable]}>
                            <FontAwesome name="envelope" size={16} color={isEditing ? COLORS.primary : COLORS.textSecondary} style={style.inputIcon} />
                            <TextInput
                                style={[style.input, !isEditing && style.inputTextReadOnly]}
                                value={email}
                                onChangeText={setEmail}
                                editable={isEditing}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    {/* Senha (Só aparece ao editar) */}
                    {isEditing && (
                        <View style={style.inputGroup}>
                            <Text style={style.label}>NOVA SENHA (OPCIONAL)</Text>
                            <View style={[style.inputContainer, style.inputContainerEditable]}>
                                <FontAwesome name="lock" size={18} color={COLORS.primary} style={style.inputIcon} />
                                <TextInput
                                    style={style.input}
                                    placeholder="Digite para alterar..."
                                    placeholderTextColor={COLORS.textSecondary}
                                    secureTextEntry
                                    value={password}
                                    onChangeText={setPassword}
                                />
                            </View>
                        </View>
                    )}

                </View>

                {/* --- BOTÕES DE AÇÃO --- */}
                <TouchableOpacity 
                    style={[style.actionButtonContainer, isLoading && { opacity: 0.7 }]} 
                    onPress={() => isEditing ? handleSave() : setIsEditing(true)}
                    disabled={isLoading}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={[COLORS.primary, '#4A148C']} // Gradiente Roxo
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={style.gradientButton}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#FFF" />
                        ) : (
                            <Text style={style.actionButtonText}>
                                {isEditing ? "Salvar Jogo" : "Editar Perfil"}
                            </Text>
                        )}
                    </LinearGradient>
                </TouchableOpacity>

                {isEditing && (
                    <TouchableOpacity 
                        style={style.cancelButton} 
                        onPress={() => {
                            setIsEditing(false);
                            if (user) {
                                setName(user.name);
                                setEmail(user.email);
                                setPassword("");
                            }
                        }}
                        disabled={isLoading}
                    >
                         <Text style={style.cancelButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                )}

                {!isEditing && (
                    <TouchableOpacity style={style.logoutButton} onPress={handleLogout}>
                        <FontAwesome name="sign-out" size={18} color={COLORS.danger} />
                        <Text style={style.logoutButtonText}>Sair da Conta</Text>
                    </TouchableOpacity>
                )}
            
            </ScrollView>
            
            <FloatingMenu currentRoute="Perfil" />

        </KeyboardAvoidingView>
    );
}