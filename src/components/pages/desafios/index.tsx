import React, { useState, useEffect, useContext, useCallback } from 'react';
import { 
    View, Text, ScrollView, TouchableOpacity, ActivityIndicator, 
    Modal, TextInput, KeyboardAvoidingView, Platform, Keyboard, Alert 
} from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { style, COLORS } from './style';
import FloatingMenu from '../../menuFlutuante/menuFlutuante';
import { AuthContext } from '../../../services/authContext';
import api from '../../../services/api';

interface Challenge {
    id: number;
    name: string; 
    description: string; 
    rewardExperiencePoints: number;
    endDate: string;
    completed?: boolean;
}

export default function Desafios() {
    const { user } = useContext(AuthContext);
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    
    // Filtro de Abas
    const [filter, setFilter] = useState<'active' | 'completed'>('active');

    // Estados do Modal de Criação
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
            if (challenges.length === 0) setLoading(true);
            const response = await api.get('/api/challenges');
            
            // Normalização dos dados
            const normalizedData = response.data.map((c: any) => ({
                id: c.id,
                name: c.nome || c.name,
                description: c.descriptions || c.description,
                rewardExperiencePoints: c.rewardExperiencePoints,
                endDate: c.endDate,
                completed: c.completed || false
            }));

            setChallenges(normalizedData);
        } catch (error) {
            console.log("Erro ao buscar desafios");
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

        // --- CORREÇÃO AQUI ---
        // Agora usando as chaves exatas do DTO Java
        const payload = {
            nome: nome,              // Antes: name
            descriptions: descricao, // Antes: description
            startDate: formatDateISO(today),
            endDate: formatDateISO(endDate),
            rewardExperiencePoints: xpValue
        };

        try {
            await api.post('/api/challenges', payload);
            
            Toast.show({
                type: 'success',
                text1: 'Quest Criada!',
                text2: `${nome} foi adicionado ao mural.`
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

    const getIconName = (title: string) => {
        const t = title.toLowerCase();
        if (t.includes('login') || t.includes('diário')) return 'calendar-check';
        if (t.includes('meta') || t.includes('economia')) return 'piggy-bank';
        if (t.includes('gasto') || t.includes('compra')) return 'shopping-cart';
        return 'scroll'; 
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const parts = dateString.split('-');
        if (parts.length === 3) return `${parts[2]}/${parts[1]}`;
        return dateString;
    };

    const filteredList = challenges.filter(c => 
        filter === 'active' ? !c.completed : c.completed
    );

    return (
        <View style={style.container}>
            <ScrollView contentContainerStyle={style.contentContainer} showsVerticalScrollIndicator={false}>
                
                {/* HEADER */}
                <View style={style.header}>
                    <Text style={style.title}>Desafios</Text>
                    <Text style={style.subtitle}>Complete missões para ganhar XP</Text>
                    
                    <TouchableOpacity 
                        style={{ position: 'absolute', right: 0, top: 10, padding: 10 }}
                        onPress={() => setModalVisible(true)}
                    >
                         <FontAwesome5 name="plus" size={20} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>

                {/* ABAS (TABS) */}
                <View style={style.tabContainer}>
                    <TouchableOpacity 
                        style={[style.tabButton, filter === 'active' && style.activeTab]} 
                        onPress={() => setFilter('active')}
                        activeOpacity={0.7}
                    >
                        <Text style={[style.tabText, filter === 'active' && style.activeTabText]}>
                            Disponíveis
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[style.tabButton, filter === 'completed' && style.activeTab]} 
                        onPress={() => setFilter('completed')}
                        activeOpacity={0.7}
                    >
                        <Text style={[style.tabText, filter === 'completed' && style.activeTabText]}>
                            Concluídas
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* LISTA */}
                {loading ? (
                    <ActivityIndicator color={COLORS.primary} size="large" style={{marginTop: 50}} />
                ) : filteredList.length === 0 ? (
                    <View style={style.emptyContainer}>
                        <FontAwesome5 name="ghost" size={50} color={COLORS.textSecondary} />
                        <Text style={style.emptyText}>
                            {filter === 'active' 
                                ? "Nenhuma missão disponível no momento." 
                                : "Nenhuma missão concluída ainda."}
                        </Text>
                        {filter === 'active' && (
                             <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <Text style={{ color: COLORS.primary, marginTop: 15, fontWeight: 'bold' }}>
                                    + Criar Nova Quest
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                ) : (
                    filteredList.map((item) => (
                        <View 
                            key={item.id} 
                            style={[
                                style.questCard, 
                                item.completed && style.completedCard
                            ]}
                        >
                            {/* Ícone Temático */}
                            <View style={[
                                style.iconContainer,
                                item.completed && { borderColor: COLORS.success, backgroundColor: 'rgba(0, 230, 118, 0.1)' }
                            ]}>
                                <FontAwesome5 
                                    name={getIconName(item.name)} 
                                    size={20} 
                                    color={item.completed ? COLORS.success : COLORS.primary} 
                                />
                            </View>

                            {/* Textos */}
                            <View style={style.questContent}>
                                <Text style={[
                                    style.questTitle,
                                    item.completed && { textDecorationLine: 'line-through', color: COLORS.textSecondary }
                                ]}>
                                    {item.name}
                                </Text>
                                <Text style={style.questDesc} numberOfLines={2}>
                                    {item.description}
                                </Text>
                                {/* Data Limite */}
                                {item.endDate && !item.completed && (
                                    <Text style={{fontSize: 10, color: '#666', marginTop: 5}}>
                                        <FontAwesome5 name="clock" size={10} /> Até {formatDate(item.endDate)}
                                    </Text>
                                )}
                            </View>

                            {/* Recompensa / Status */}
                            <View style={style.rewardContainer}>
                                {item.completed ? (
                                    <View style={{alignItems: 'center'}}>
                                        <Text style={{color: COLORS.success, fontSize: 10, fontWeight: 'bold'}}>FEITO</Text>
                                        <FontAwesome5 name="check-circle" size={18} color={COLORS.success} style={style.checkIcon} />
                                    </View>
                                ) : (
                                    <View style={style.xpBadge}>
                                        <FontAwesome5 name="bolt" size={10} color={COLORS.xp} />
                                        <Text style={style.xpText}>+{item.rewardExperiencePoints}</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    ))
                )}

            </ScrollView>

            <FloatingMenu currentRoute="Desafios" />

            {/* MODAL DE CRIAÇÃO */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <KeyboardAvoidingView 
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.8)'}}
                >
                    <View style={{
                        backgroundColor: '#18181B', 
                        borderTopLeftRadius: 30, 
                        borderTopRightRadius: 30, 
                        padding: 25, 
                        borderTopWidth: 1, 
                        borderColor: COLORS.primary
                    }}>
                        <Text style={{fontSize: 22, fontWeight: 'bold', color: '#FFF', marginBottom: 20, textAlign: 'center'}}>
                            Nova Quest
                        </Text>

                        {/* Nome */}
                        <TextInput
                            style={{backgroundColor: '#27272A', color: '#FFF', borderRadius: 12, padding: 15, marginBottom: 15, borderWidth: 1, borderColor: '#333'}}
                            placeholder="Título (Ex: Semana Econômica)"
                            placeholderTextColor="#666"
                            value={nome}
                            onChangeText={setNome}
                        />

                        {/* Descrição */}
                        <TextInput
                            style={{backgroundColor: '#27272A', color: '#FFF', borderRadius: 12, padding: 15, marginBottom: 15, borderWidth: 1, borderColor: '#333', height: 80, textAlignVertical: 'top'}}
                            placeholder="Descrição da missão..."
                            placeholderTextColor="#666"
                            value={descricao}
                            onChangeText={setDescricao}
                            multiline
                        />

                        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{color: '#AAA', marginBottom: 5, fontSize: 12}}>Recompensa (XP)</Text>
                                <TextInput
                                    style={{backgroundColor: '#27272A', color: '#FFF', borderRadius: 12, padding: 15, borderWidth: 1, borderColor: '#333'}}
                                    placeholder="500"
                                    placeholderTextColor="#666"
                                    keyboardType="numeric"
                                    value={xp}
                                    onChangeText={setXp}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{color: '#AAA', marginBottom: 5, fontSize: 12}}>Duração (Dias)</Text>
                                <TextInput
                                    style={{backgroundColor: '#27272A', color: '#FFF', borderRadius: 12, padding: 15, borderWidth: 1, borderColor: '#333'}}
                                    placeholder="7"
                                    placeholderTextColor="#666"
                                    keyboardType="numeric"
                                    value={duracao}
                                    onChangeText={setDuracao}
                                />
                            </View>
                        </View>

                        <View style={{flexDirection: 'row', gap: 15}}>
                            <TouchableOpacity 
                                style={{flex: 1, padding: 15, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: COLORS.secondary}} 
                                onPress={() => { setModalVisible(false); resetForm(); }}
                            >
                                <Text style={{color: '#FFF'}}>Cancelar</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                style={{flex: 1, padding: 15, borderRadius: 12, alignItems: 'center', backgroundColor: COLORS.primary}} 
                                onPress={handleCreateChallenge}
                                disabled={saving}
                            >
                                {saving ? <ActivityIndicator color="#FFF" /> : <Text style={{color: '#FFF', fontWeight: 'bold'}}>Criar</Text>}
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
}