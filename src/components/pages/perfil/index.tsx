import React, { useState, useContext, useEffect } from 'react';
import { 
    View, Text, TextInput, TouchableOpacity, ScrollView, 
    KeyboardAvoidingView, Platform, Alert, ActivityIndicator, Image 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import { FontAwesome } from '@expo/vector-icons'; 
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker'; // <--- IMPORTANTE

import { style, COLORS } from './style';
import FloatingMenu from '../../menuFlutuante/menuFlutuante';
import { AuthContext } from '../../../services/authContext';
import api from '../../../services/api';

export default function Profile() {
    const { user, signOut, updateUser } = useContext(AuthContext);

    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [photoLoading, setPhotoLoading] = useState(false); // Loading específico da foto

    // Estados do Formulário
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    // --- FUNÇÃO PARA TROCAR FOTO ---
    const handlePickImage = async () => {
        // 1. Pede permissão e abre a galeria
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1], // Corte quadrado
            quality: 0.5,   // Qualidade média para não ficar muito pesado (Base64)
            base64: true,   // <--- Essencial: Retorna a string da imagem
        });

        if (!result.canceled && result.assets[0].base64) {
            const base64Img = `data:image/jpeg;base64,${result.assets[0].base64}`;
            
            try {
                setPhotoLoading(true);
                
                // 2. Envia para o Back-end
                // Nota: O endpoint espera uma String crua no corpo
                await api.put(`/users/${user?.id}/photo`, base64Img, {
                    headers: { 'Content-Type': 'text/plain' }
                });

                // 3. Atualiza o Contexto e a Tela Localmente
                if (user) {
                    updateUser({ ...user, profilePicture: base64Img });
                }

                Toast.show({ type: 'success', text1: 'Foto de perfil atualizada!' });

            } catch (error) {
                console.log(error);
                Alert.alert("Erro", "Não foi possível enviar a imagem.");
            } finally {
                setPhotoLoading(false);
            }
        }
    };

    const handleLogout = () => {
        signOut(); 
    };

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
            <ScrollView contentContainerStyle={[style.contentContainer, { paddingBottom: 130 }]} keyboardShouldPersistTaps="handled">
                
                {/* --- HEADER --- */}
                <View style={style.header}>
                    
                    {/* ÁREA DA FOTO CLICÁVEL */}
                    <TouchableOpacity onPress={handlePickImage} style={style.avatarContainer} activeOpacity={0.7}>
                        {photoLoading ? (
                            <ActivityIndicator color={COLORS.primary} />
                        ) : user?.profilePicture ? (
                            // Se tiver foto, mostra a imagem
                            <Image 
                                source={{ uri: user.profilePicture }} 
                                style={{ width: 100, height: 100, borderRadius: 50 }} 
                            />
                        ) : (
                            // Se não, mostra as iniciais
                            <Text style={style.avatarText}>
                                {getInitials(name || "Visitante")}
                            </Text>
                        )}

                        {/* Ícone de câmera pequeninho para indicar edição */}
                        <View style={{
                            position: 'absolute', bottom: 0, right: 0, 
                            backgroundColor: COLORS.primary, padding: 8, borderRadius: 20,
                            borderWidth: 2, borderColor: '#121212'
                        }}>
                            <FontAwesome name="camera" size={14} color="#FFF" />
                        </View>
                    </TouchableOpacity>

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
                    {/* (O restante do formulário continua igual ao anterior) */}
                    
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

                {/* --- BOTÕES --- */}
                <TouchableOpacity 
                    style={[style.actionButtonContainer, isLoading && { opacity: 0.7 }]} 
                    onPress={() => isEditing ? handleSave() : setIsEditing(true)}
                    disabled={isLoading}
                >
                    <LinearGradient
                        colors={[COLORS.primary, '#4A148C']}
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
                        onPress={() => { setIsEditing(false); if(user) { setName(user.name); setEmail(user.email); setPassword(""); } }}
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