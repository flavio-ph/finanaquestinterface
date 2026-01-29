import React, { useState, useEffect, useContext } from 'react';
import { 
    View, Text, TouchableOpacity, ScrollView, Modal, 
    TextInput, ActivityIndicator, Alert 
} from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';

import { style, COLORS } from './style';
import FloatingMenu from '../../menuFlutuante/menuFlutuante';
import { AuthContext } from '../../../services/authContext';
import api from '../../../services/api';

interface Goal {
    id: number;
    name: string; // <--- CORREÇÃO: Backend envia 'name'
    currentAmount: number;
    targetAmount: number;
    progressPercentage: number;
    deadline?: string;
}

export default function Metas() {
    const { user } = useContext(AuthContext);
    const [goals, setGoals] = useState<Goal[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    
    // Estados do formulário
    const [title, setTitle] = useState("");
    const [targetAmount, setTargetAmount] = useState("");
    const [deadline, setDeadline] = useState("");

    useEffect(() => {
        if (user) fetchGoals();
    }, [user]);

    async function fetchGoals() {
        try {
            const response = await api.get('/api/goals');
            setGoals(response.data);
        } catch (error) {
            console.log("Erro ao buscar metas");
        } finally {
            setLoading(false);
        }
    }

    async function handleCreateGoal() {
        if (!title.trim() || !targetAmount.trim() || !deadline.trim()) {
            return Alert.alert("Campos Vazios", "Preencha todos os campos.");
        }

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(deadline)) {
            return Alert.alert("Data Inválida", "Use o formato: AAAA-MM-DD");
        }

        try {
            await api.post('/api/goals', {
                name: title,
                targetAmount: parseFloat(targetAmount.replace(',', '.')),
                deadline: deadline
            });
            
            Toast.show({ type: 'success', text1: 'Nova conquista desbloqueada!', text2: 'Meta criada com sucesso.' });
            setModalVisible(false);
            setTitle(""); setTargetAmount(""); setDeadline("");
            fetchGoals();
        } catch (error: any) {
            const msg = error.response?.data?.message || "Erro ao criar meta.";
            Alert.alert("Erro", msg);
        }
    }

    async function handleDelete(id: number) {
        Alert.alert(
            "Excluir Meta",
            "Tem certeza? Todo o progresso será perdido.",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Excluir", 
                    style: "destructive", 
                    onPress: async () => {
                        try {
                            await api.delete(`/api/goals/${id}`);
                            fetchGoals();
                        } catch (error) {
                            Alert.alert("Erro", "Não foi possível excluir.");
                        }
                    }
                }
            ]
        );
    }

    const formatCurrency = (val: number) => 
        val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const handleDateChange = (text: string) => {
        let cleanText = text.replace(/[^0-9-]/g, '');
        if (cleanText.length > 10) return;
        setDeadline(cleanText);
    };

    return (
        <View style={style.container}>
            <ScrollView contentContainerStyle={style.contentContainer} showsVerticalScrollIndicator={false}>
                
                {/* --- HEADER --- */}
                <View style={style.headerContainer}>
                    <Text style={style.title}>Metas</Text>
                    <Text style={style.subtitle}>Foco no objetivo</Text>
                    
                    <TouchableOpacity 
                        style={style.addButton} 
                        onPress={() => setModalVisible(true)}
                        activeOpacity={0.7}
                    >
                        <FontAwesome name="plus" size={20} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>

                {/* --- LISTAGEM --- */}
                {loading ? (
                    <ActivityIndicator color={COLORS.primary} size="large" style={{marginTop: 50}} />
                ) : goals.length === 0 ? (
                    <View style={{alignItems: 'center', marginTop: 50, opacity: 0.5}}>
                        <FontAwesome name="flag-o" size={50} color={COLORS.textSecondary} />
                        <Text style={{color: COLORS.textSecondary, marginTop: 15}}>Nenhuma meta ativa.</Text>
                    </View>
                ) : (
                    goals.map((item) => (
                        <View key={item.id} style={style.goalCard}>
                            {/* Cabeçalho do Card */}
                            <View style={style.goalHeader}>
                                <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                                    <View style={style.iconContainer}>
                                        <MaterialCommunityIcons name="target" size={24} color={COLORS.primary} />
                                    </View>
                                    <View style={style.goalInfo}>
                                        {/* CORREÇÃO: item.name em vez de item.title */}
                                        <Text style={style.goalTitle} numberOfLines={1}>{item.name}</Text>
                                        <Text style={style.goalDeadline}>
                                            <FontAwesome name="calendar" size={10} /> {item.deadline ? new Date(item.deadline).toLocaleDateString('pt-BR') : 'Sem prazo'}
                                        </Text>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => handleDelete(item.id)} style={{padding: 5}}>
                                    <FontAwesome name="trash-o" size={18} color={COLORS.danger} />
                                </TouchableOpacity>
                            </View>
                            
                            {/* Valores */}
                            <View style={style.goalValuesRow}>
                                <Text style={style.currentValue}>{formatCurrency(item.currentAmount)}</Text>
                                <Text style={style.targetValue}> / {formatCurrency(item.targetAmount)}</Text>
                            </View>

                            {/* Barra de Progresso Limpa */}
                            <View style={style.progressBarContainer}>
                                <LinearGradient
                                    colors={[COLORS.primary, '#D946EF']} 
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={[style.progressBarFill, { width: `${Math.min(item.progressPercentage, 100)}%` }]}
                                />
                            </View>
                        </View>
                    ))
                )}

            </ScrollView>

            <FloatingMenu currentRoute="Metas" />

            {/* MODAL DE CRIAÇÃO (MANTIDO) */}
            <Modal 
                visible={modalVisible} 
                transparent 
                animationType="slide" 
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={style.modalContainer}>
                    <View style={style.modalContent}>
                        <Text style={style.modalTitle}>Nova Meta</Text>
                        
                        <TextInput 
                            style={style.input} 
                            placeholder="Nome (ex: PS5, Viagem)" 
                            placeholderTextColor="#666"
                            value={title} 
                            onChangeText={setTitle}
                        />

                        <TextInput 
                            style={style.input} 
                            placeholder="Valor Alvo (R$)" 
                            placeholderTextColor="#666"
                            keyboardType="numeric"
                            value={targetAmount} 
                            onChangeText={setTargetAmount}
                        />

                        <TextInput 
                            style={style.input} 
                            placeholder="Data Limite (AAAA-MM-DD)" 
                            placeholderTextColor="#666"
                            value={deadline} 
                            onChangeText={handleDateChange}
                            maxLength={10}
                        />

                        <View style={style.modalButtons}>
                            <TouchableOpacity style={[style.button, style.cancelButton]} onPress={() => setModalVisible(false)}>
                                <Text style={{color: COLORS.danger, fontWeight: 'bold'}}>Cancelar</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={[style.button, style.confirmButton]} onPress={handleCreateGoal}>
                                <Text style={style.buttonText}>Criar Meta</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}