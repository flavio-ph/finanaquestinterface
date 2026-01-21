import React, { useState, useCallback } from 'react';
import { 
    View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert, 
    Modal, TextInput, KeyboardAvoidingView, Platform 
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
// 1. IMPORTAR O DATE PICKER
import DateTimePicker from '@react-native-community/datetimepicker';

import { style, COLORS } from './style';
import FloatingMenu from '../../menuFlutuante/menuFlutuante';
import api from '../../../services/api';

interface Goal {
    id: number;
    name: string;
    currentAmount: number;
    targetAmount: number;
    deadline: string;
    status: 'IN_PROGRESS' | 'COMPLETED';
    progressPercentage: number;
}

export default function Metas() {
    const [loading, setLoading] = useState(true);
    const [goals, setGoals] = useState<Goal[]>([]);
    
    // Estados Modal de Criação
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [newName, setNewName] = useState('');
    const [newTarget, setNewTarget] = useState('');
    
    // 2. ALTERADO: Estado agora é do tipo Date
    const [newDeadline, setNewDeadline] = useState(new Date()); 
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Estados Modal de Depósito
    const [depositModalVisible, setDepositModalVisible] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
    const [depositAmount, setDepositAmount] = useState('');
    
    const [saving, setSaving] = useState(false);

    useFocusEffect(
        useCallback(() => {
            fetchGoals();
        }, [])
    );

    async function fetchGoals() {
        try {
            if (goals.length === 0) setLoading(true);
            const response = await api.get('/api/goals');
            setGoals(response.data);
        } catch (error) {
            console.log("Erro ao buscar metas:", error);
        } finally {
            setLoading(false);
        }
    }

    // --- FUNÇÃO PARA GERENCIAR DATA ---
    const onChangeDate = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || newDeadline;
        setShowDatePicker(Platform.OS === 'ios'); // No iOS mantém aberto, no Android fecha
        setNewDeadline(currentDate);
    };

    // --- CRIAR META ---
    async function handleCreateGoal() {
        if (!newName || !newTarget) {
            return Alert.alert("Atenção", "Preencha o nome e o valor.");
        }

        const targetValue = parseFloat(newTarget.replace(',', '.'));
        if (isNaN(targetValue) || targetValue <= 0) {
            return Alert.alert("Erro", "Valor inválido.");
        }

        setSaving(true);
        try {
            // Formatar data para YYYY-MM-DD (Formato que o Java espera)
            const formattedDate = newDeadline.toISOString().split('T')[0];

            await api.post('/api/goals', {
                name: newName,
                targetAmount: targetValue,
                deadline: formattedDate,
                currentAmount: 0
            });
            
            Toast.show({ type: 'success', text1: 'Meta Criada!', text2: 'Vamos alcançá-la!' });
            setCreateModalVisible(false);
            resetCreateForm();
            fetchGoals();
        } catch (error) {
            Alert.alert("Erro", "Não foi possível criar a meta.");
        } finally {
            setSaving(false);
        }
    }

    // --- DEPOSITAR ---
    function openDepositModal(goal: Goal) {
        setSelectedGoal(goal);
        setDepositAmount('');
        setDepositModalVisible(true);
    }

    async function handleDeposit() {
        if (!selectedGoal || !depositAmount) return;

        const value = parseFloat(depositAmount.replace(',', '.'));
        if (isNaN(value) || value <= 0) return Alert.alert("Erro", "Valor inválido.");

        setSaving(true);
        try {
            await api.put(`/api/goals/${selectedGoal.id}/deposit`, { amount: value });
            
            Toast.show({ type: 'success', text1: 'Sucesso!', text2: 'Valor adicionado à meta.' });
            setDepositModalVisible(false);
            fetchGoals();
        } catch (error) {
            Alert.alert("Erro", "Falha ao depositar.");
        } finally {
            setSaving(false);
        }
    }

    function handleDelete(goal: Goal) {
        Alert.alert("Excluir Meta", `Deseja desistir da meta "${goal.name}"?`, [
            { text: "Cancelar", style: "cancel" },
            { 
                text: "Excluir", 
                style: "destructive",
                onPress: async () => {
                    try {
                        await api.delete(`/api/goals/${goal.id}`);
                        Toast.show({ type: 'success', text1: 'Removida.' });
                        fetchGoals();
                    } catch (error) {
                        Alert.alert("Erro", "Não foi possível excluir.");
                    }
                }
            }
        ]);
    }

    function resetCreateForm() {
        setNewName('');
        setNewTarget('');
        setNewDeadline(new Date()); // Reseta para hoje
    }

    const formatCurrency = (val: number) => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const formatDate = (date: string) => {
        if(!date) return '';
        const p = date.split('-');
        return `${p[2]}/${p[1]}/${p[0]}`;
    }

    if (loading) {
        return (
            <View style={[style.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <View style={style.container}>
            <TouchableOpacity style={style.addButton} onPress={() => setCreateModalVisible(true)}>
                <FontAwesome name="plus" size={20} color={COLORS.primary} />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={style.contentContainer}>
                <Text style={style.pageTitle}>Minhas Metas</Text>

                {goals.length === 0 ? (
                    <View style={style.emptyState}>
                        <FontAwesome name="flag-checkered" size={48} color={COLORS.textSecondary} />
                        <Text style={style.emptyText}>Nenhuma meta definida.</Text>
                        <TouchableOpacity onPress={() => setCreateModalVisible(true)}>
                            <Text style={{ color: COLORS.primary, marginTop: 10, fontWeight: 'bold' }}>
                                Criar nova meta
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    goals.map((item) => (
                        <TouchableOpacity 
                            key={item.id} 
                            style={style.goalCard}
                            onPress={() => openDepositModal(item)}
                            onLongPress={() => handleDelete(item)}
                            activeOpacity={0.9}
                        >
                            <View style={style.cardHeader}>
                                <Text style={style.goalName}>{item.name}</Text>
                                <Text style={[style.goalStatus, { 
                                    backgroundColor: item.status === 'COMPLETED' ? COLORS.accent : '#333',
                                    color: item.status === 'COMPLETED' ? '#000' : COLORS.textSecondary
                                }]}>
                                    {item.status === 'COMPLETED' ? 'CONCLUÍDA' : 'EM ANDAMENTO'}
                                </Text>
                            </View>

                            <View style={style.valuesContainer}>
                                <Text style={style.currentAmount}>{formatCurrency(item.currentAmount)}</Text>
                                <Text style={style.targetAmount}>de {formatCurrency(item.targetAmount)}</Text>
                            </View>

                            <View style={style.progressBarTrack}>
                                <View style={[style.progressBarFill, { width: `${item.progressPercentage}%` }]} />
                            </View>

                            <View style={style.cardFooter}>
                                <Text style={style.deadlineText}>Prazo: {formatDate(item.deadline)}</Text>
                                <Text style={style.percentageText}>{item.progressPercentage}%</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>

            <FloatingMenu currentRoute="Metas" />

            {/* MODAL CRIAR */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={createModalVisible}
                onRequestClose={() => setCreateModalVisible(false)}
            >
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={style.modalOverlay}>
                    <View style={style.modalContent}>
                        <Text style={style.modalTitle}>Nova Meta</Text>

                        <View style={style.inputGroup}>
                            <Text style={style.label}>Nome da Meta</Text>
                            <TextInput style={style.input} placeholder="Ex: Viagem, Carro..." placeholderTextColor="#666" value={newName} onChangeText={setNewName} />
                        </View>

                        <View style={style.inputGroup}>
                            <Text style={style.label}>Valor Alvo (R$)</Text>
                            <TextInput style={style.input} placeholder="0,00" placeholderTextColor="#666" keyboardType="numeric" value={newTarget} onChangeText={setNewTarget} />
                        </View>

                        {/* --- DATE PICKER AQUI --- */}
                        <View style={style.inputGroup}>
                            <Text style={style.label}>Prazo Final</Text>
                            
                            {/* Botão que abre o calendário */}
                            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={style.dateButton}>
                                <Text style={style.dateButtonText}>
                                    {newDeadline.toLocaleDateString('pt-BR')}
                                </Text>
                                <FontAwesome name="calendar" size={16} color={COLORS.textSecondary} />
                            </TouchableOpacity>

                            {/* O Componente do Calendário (Aparece condicionalmente) */}
                            {showDatePicker && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={newDeadline}
                                    mode="date"
                                    display="default"
                                    onChange={onChangeDate}
                                    minimumDate={new Date()} // Não permite datas no passado
                                />
                            )}
                        </View>

                        <View style={style.modalActions}>
                            <TouchableOpacity style={style.buttonCancel} onPress={() => setCreateModalVisible(false)}>
                                <Text style={[style.buttonText, { color: COLORS.textSecondary }]}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.buttonSave} onPress={handleCreateGoal} disabled={saving}>
                                {saving ? <ActivityIndicator color="#FFF" /> : <Text style={style.buttonText}>Criar Meta</Text>}
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>

            {/* MODAL DEPOSITAR (Mantido igual) */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={depositModalVisible}
                onRequestClose={() => setDepositModalVisible(false)}
            >
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={style.modalOverlay}>
                    <View style={style.modalContent}>
                        <Text style={style.modalTitle}>Adicionar Dinheiro</Text>
                        <Text style={{color: COLORS.textSecondary, textAlign: 'center', marginBottom: 20}}>
                            Para: {selectedGoal?.name}
                        </Text>

                        <View style={style.inputGroup}>
                            <Text style={style.label}>Valor a depositar (R$)</Text>
                            <TextInput style={style.input} placeholder="0,00" placeholderTextColor="#666" keyboardType="numeric" autoFocus value={depositAmount} onChangeText={setDepositAmount} />
                        </View>

                        <View style={style.modalActions}>
                            <TouchableOpacity style={style.buttonCancel} onPress={() => setDepositModalVisible(false)}>
                                <Text style={[style.buttonText, { color: COLORS.textSecondary }]}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.buttonDeposit} onPress={handleDeposit} disabled={saving}>
                                {saving ? <ActivityIndicator color="#000" /> : <Text style={[style.buttonText, { color: '#000' }]}>Confirmar</Text>}
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
}