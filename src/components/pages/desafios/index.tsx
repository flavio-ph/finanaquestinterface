import React, { useState, useCallback } from 'react';
import { 
    View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert, 
    Modal, TextInput, KeyboardAvoidingView, Platform, Keyboard 
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import { style, COLORS } from './style';
import FloatingMenu from '../../menuFlutuante/menuFlutuante';
import api from '../../../services/api';

interface Challenge {
    id: number;
    nome: string;
    descriptions: string;
    startDate: string;
    endDate: string;
    rewardExperiencePoints: number;
}

export default function Desafios() {
    const [loading, setLoading] = useState(true);
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [saving, setSaving] = useState(false);

    // Estados do Modal
    const [modalVisible, setModalVisible] = useState(false);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [xp, setXp] = useState('');
    const [duracao, setDuracao] = useState(''); // Dias

    useFocusEffect(
        useCallback(() => {
            fetchChallenges();
        }, [])
    );

    async function fetchChallenges() {
        try {
            // Só mostra loading full screen se não tiver nada carregado
            if (challenges.length === 0) setLoading(true);
            const response = await api.get('/api/challenges');
            setChallenges(response.data);
        } catch (error) {
            console.log("Erro ao buscar desafios:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleCreateChallenge() {
        if (!nome || !descricao || !xp || !duracao) {
            return Alert.alert("Atenção", "Preencha todos os campos.");
        }

        const xpValue = parseInt(xp);
        const diasValue = parseInt(duracao);

        if (isNaN(xpValue) || isNaN(diasValue)) {
            return Alert.alert("Erro", "XP e Duração devem ser números.");
        }

        setSaving(true);
        Keyboard.dismiss();

        const today = new Date();
        const endDate = new Date();
        endDate.setDate(today.getDate() + diasValue);
        const formatDateISO = (d: Date) => d.toISOString().split('T')[0];

        const payload = {
            nome,
            descriptions: descricao,
            startDate: formatDateISO(today),
            endDate: formatDateISO(endDate),
            rewardExperiencePoints: xpValue
        };

        try {
            await api.post('/api/challenges', payload);
            
            Toast.show({
                type: 'success',
                text1: 'Desafio Criado!',
                text2: `${nome} foi adicionado.`
            });

            setModalVisible(false);
            resetForm();
            fetchChallenges(); 

        } catch (error) {
            console.log(error);
            Alert.alert("Erro", "Não foi possível criar o desafio.");
        } finally {
            setSaving(false);
        }
    }

    function resetForm() {
        setNome('');
        setDescricao('');
        setXp('');
        setDuracao('');
    }

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const parts = dateString.split('-');
        return `${parts[2]}/${parts[1]}`;
    };

    if (loading) {
        return (
            <View style={[style.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <View style={style.container}>
            <ScrollView contentContainerStyle={style.contentContainer}>
                
                {/* --- CABEÇALHO ALINHADO --- */}
                <View style={style.headerRow}>
                    <Text style={style.pageTitle}>Desafios</Text>
                    
                    <TouchableOpacity 
                        style={style.addButton} 
                        onPress={() => setModalVisible(true)}
                        activeOpacity={0.7}
                    >
                        <FontAwesome name="plus" size={18} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>
                {/* --------------------------- */}

                <Text style={style.sectionTitle}>Disponíveis</Text>

                {challenges.length === 0 ? (
                    <View style={style.emptyState}>
                        <FontAwesome name="trophy" size={48} color="#27272A" />
                        <Text style={style.emptyText}>Sem desafios ativos.</Text>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Text style={{ color: COLORS.primary, marginTop: 10, fontWeight: 'bold' }}>
                                Criar o primeiro desafio
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    challenges.map((item) => (
                        <TouchableOpacity key={item.id} style={style.challengeCard} activeOpacity={0.9}>
                            <View style={style.cardHeader}>
                                <View style={style.iconContainer}>
                                    <FontAwesome 
                                        name={item.rewardExperiencePoints >= 500 ? "star" : "shield"} 
                                        size={24} 
                                        color={COLORS.secondary} 
                                    />
                                </View>
                                <View style={style.headerText}>
                                    <Text style={style.challengeName}>{item.nome}</Text>
                                    <Text style={style.challengeReward}>+{item.rewardExperiencePoints} XP</Text>
                                </View>
                            </View>

                            <Text style={style.description}>{item.descriptions}</Text>
                            
                            <View style={style.footerRow}>
                                <View style={style.dateTag}>
                                    <FontAwesome name="calendar" size={12} color={COLORS.textSecondary} />
                                    <Text style={style.dateText}> Até {formatDate(item.endDate)}</Text>
                                </View>
                                <View style={style.statusBadge}>
                                    <Text style={style.statusText}>Ativo</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>

            <FloatingMenu currentRoute="Desafios" />

            {/* MODAL DE CADASTRO */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <KeyboardAvoidingView 
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={style.modalOverlay}
                >
                    <View style={style.modalContent}>
                        <Text style={style.modalTitle}>Novo Desafio</Text>

                        <View style={style.inputGroup}>
                            <Text style={style.label}>Título</Text>
                            <TextInput
                                style={style.input}
                                placeholder="Ex: Semana Econômica"
                                placeholderTextColor="#555"
                                value={nome}
                                onChangeText={setNome}
                            />
                        </View>

                        <View style={style.inputGroup}>
                            <Text style={style.label}>Descrição / Regra</Text>
                            <TextInput
                                style={style.input}
                                placeholder="Ex: Não gaste com delivery..."
                                placeholderTextColor="#555"
                                value={descricao}
                                onChangeText={setDescricao}
                                multiline
                            />
                        </View>

                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <View style={[style.inputGroup, { flex: 1 }]}>
                                <Text style={style.label}>XP</Text>
                                <TextInput
                                    style={style.input}
                                    placeholder="500"
                                    placeholderTextColor="#555"
                                    keyboardType="numeric"
                                    value={xp}
                                    onChangeText={setXp}
                                />
                            </View>
                            <View style={[style.inputGroup, { flex: 1 }]}>
                                <Text style={style.label}>Duração (Dias)</Text>
                                <TextInput
                                    style={style.input}
                                    placeholder="7"
                                    placeholderTextColor="#555"
                                    keyboardType="numeric"
                                    value={duracao}
                                    onChangeText={setDuracao}
                                />
                            </View>
                        </View>

                        <View style={style.modalActions}>
                            <TouchableOpacity 
                                style={style.buttonCancel} 
                                onPress={() => { setModalVisible(false); resetForm(); }}
                            >
                                <Text style={[style.buttonText, { color: COLORS.textSecondary }]}>Cancelar</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={[style.buttonSave, saving && { opacity: 0.7 }]} 
                                onPress={handleCreateChallenge}
                                disabled={saving}
                            >
                                {saving ? <ActivityIndicator color="#FFF" /> : <Text style={style.buttonText}>Criar</Text>}
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
}