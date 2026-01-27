import React, { useState, useEffect, useContext } from 'react';
import { 
    View, Text, TouchableOpacity, ScrollView, Modal, 
    TextInput, ActivityIndicator, Alert 
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import { style, COLORS } from './style';
import FloatingMenu from '../../menuFlutuante/menuFlutuante';
import { AuthContext } from '../../../services/authContext';
import api from '../../../services/api';

// Interface para tipar os dados da meta
interface Goal {
    id: number;
    title: string;
    currentAmount: number;
    targetAmount: number;
    progressPercentage: number;
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
            // CORREÇÃO 1: Adicionado /api
            const response = await api.get('/api/goals');
            setGoals(response.data);
        } catch (error) {
            console.log("Erro ao buscar metas");
        } finally {
            setLoading(false);
        }
    }

    async function handleCreateGoal() {
        if (!title || !targetAmount) return Alert.alert("Erro", "Preencha os campos!");
        
        try {
            // CORREÇÃO 2: Adicionado /api e verificação do nome do campo
            // Se o seu Java DTO espera "name", mude para { name: title, ... }
            // Se espera "title", mantenha { title, ... }
            await api.post('/api/goals', {
                title: title, 
                targetAmount: parseFloat(targetAmount.replace(',', '.')),
                deadline: deadline || null
            });
            
            Toast.show({ type: 'success', text1: 'Meta criada!' });
            setModalVisible(false);
            setTitle(""); setTargetAmount(""); setDeadline("");
            fetchGoals();
            
        } catch (error) {
            console.log(error);
            Alert.alert("Erro", "Falha ao criar meta.");
        }
    }

    async function handleDelete(id: number) {
        try {
            // CORREÇÃO 3: Adicionado /api
            await api.delete(`/api/goals/${id}`);
            fetchGoals();
        } catch (error) {
            Alert.alert("Erro", "Não foi possível excluir.");
        }
    }

    const formatCurrency = (val: number) => 
        val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return (
        <View style={style.container}>
            <ScrollView contentContainerStyle={style.contentContainer}>
                
                {/* --- HEADER --- */}
                <View style={style.headerRow}>
                    <Text style={style.title}>Minhas Metas</Text>
                    
                    <TouchableOpacity 
                        style={style.addButton} 
                        onPress={() => setModalVisible(true)}
                        activeOpacity={0.7}
                    >
                        <FontAwesome name="plus" size={20} color="#FFF" />
                    </TouchableOpacity>
                </View>
                {/* -------------- */}

                {loading ? (
                    <ActivityIndicator color={COLORS.primary} size="large" style={{marginTop: 50}} />
                ) : goals.length === 0 ? (
                    <Text style={{color: COLORS.textSecondary, textAlign: 'center', marginTop: 50}}>
                        Nenhuma meta ativa. Crie uma agora!
                    </Text>
                ) : (
                    goals.map((item) => (
                        <View key={item.id} style={style.goalCard}>
                            <View style={style.goalHeader}>
                                <Text style={style.goalTitle}>{item.title}</Text>
                                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                    <FontAwesome name="trash" size={16} color={COLORS.textSecondary} />
                                </TouchableOpacity>
                            </View>
                            
                            <View style={style.goalValues}>
                                <Text style={style.valueText}>{formatCurrency(item.currentAmount)}</Text>
                                <Text style={style.valueText}>{formatCurrency(item.targetAmount)}</Text>
                            </View>

                            <View style={style.progressBarBackground}>
                                <View style={[style.progressBarFill, { width: `${Math.min(item.progressPercentage, 100)}%` }]} />
                            </View>
                            
                            <View style={style.cardActions}>
                                <TouchableOpacity style={[style.actionButton, style.depositButton]}>
                                    <Text style={[style.actionText, style.depositText]}>Depositar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}

            </ScrollView>

            {/* Menu fora do ScrollView */}
            <FloatingMenu currentRoute="Metas" />

            {/* Modal de Criação */}
            <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
                <View style={style.modalContainer}>
                    <View style={style.modalContent}>
                        <Text style={style.modalTitle}>Nova Meta</Text>
                        
                        <TextInput 
                            style={style.input} 
                            placeholder="Nome da Meta (ex: Viagem)" 
                            placeholderTextColor={COLORS.textSecondary}
                            value={title} onChangeText={setTitle}
                        />
                        <TextInput 
                            style={style.input} 
                            placeholder="Valor Alvo (ex: 5000)" 
                            placeholderTextColor={COLORS.textSecondary}
                            keyboardType="numeric"
                            value={targetAmount} onChangeText={setTargetAmount}
                        />

                        <View style={style.modalButtons}>
                            <TouchableOpacity style={[style.button, style.cancelButton]} onPress={() => setModalVisible(false)}>
                                <Text style={style.buttonText}>Cancelar</Text>
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