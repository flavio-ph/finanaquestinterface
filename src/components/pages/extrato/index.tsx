import React, { useState, useCallback, useContext } from 'react';
import { 
    View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert 
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { style, COLORS } from './style';

import FloatingMenu from '../../menuFlutuante/menuFlutuante';
import { AuthContext } from '../../../services/authContext';
import api from '../../../services/api';

interface Transaction {
    id: number;
    description: string;
    amount: number;
    type: 'RECEITA' | 'DESPESA';
    date: string;
}

export default function Extrato() {
    const navigation = useNavigation<any>();
    const { user } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    async function fetchData() {
        try {
            // Loading suave: só mostra spinner se a lista estiver vazia
            if(transactions.length === 0) setLoading(true);
            
            const response = await api.get('/api/transactions');
            setTransactions(response.data);
        } catch (error) {
            console.log("Erro ao buscar transações");
        } finally {
            setLoading(false);
        }
    }

    // --- LÓGICA DE FILTRO E CÁLCULO ---
    const filteredList = transactions.filter(t => {
        const d = new Date(t.date);
        return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const incomeTotal = filteredList
        .filter(t => t.type === 'RECEITA')
        .reduce((acc, curr) => acc + Number(curr.amount), 0);

    const expenseTotal = filteredList
        .filter(t => t.type === 'DESPESA')
        .reduce((acc, curr) => acc + Number(curr.amount), 0);
    // ----------------------------------

    function changeMonth(direction: -1 | 1) {
        let newMonth = selectedMonth + direction;
        let newYear = selectedYear;
        
        if (newMonth > 11) { newMonth = 0; newYear++; }
        if (newMonth < 0) { newMonth = 11; newYear--; }
        
        setSelectedMonth(newMonth);
        setSelectedYear(newYear);
    }

    const formatCurrency = (val: number) => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const getMonthName = (m: number) => new Date(2023, m, 1).toLocaleString('pt-BR', { month: 'long' });

    function handleTransactionPress(t: Transaction) {
        Alert.alert(
            "Opções",
            `Transação: ${t.description}`,
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Excluir", 
                    style: "destructive", 
                    onPress: async () => {
                        try {
                            await api.delete(`/api/transactions/${t.id}`);
                            fetchData();
                        } catch(e) { Alert.alert("Erro", "Falha ao excluir"); }
                    } 
                }
            ]
        );
    }

    // Ícone dinâmico baseado no tipo (simples) ou descrição (avançado se quiser implementar depois)
    const getIcon = (type: string) => type === 'RECEITA' ? 'arrow-up-bold' : 'cart-outline';

    return (
        <View style={style.container}>
            <ScrollView contentContainerStyle={style.contentContainer} showsVerticalScrollIndicator={false}>
                
                {/* HEADER */}
                <View style={style.header}>
                    <Text style={style.title}>Extrato</Text>
                    <Text style={style.subtitle}>Histórico de suas atividades</Text>
                </View>

                {/* SELETOR DE MÊS */}
                <View style={style.monthSelector}>
                    <TouchableOpacity onPress={() => changeMonth(-1)} style={style.monthButton}>
                        <FontAwesome name="chevron-left" size={14} color={COLORS.primary} />
                    </TouchableOpacity>
                    
                    <Text style={style.monthText}>
                        {getMonthName(selectedMonth)} <Text style={{color: COLORS.textSecondary}}>{selectedYear}</Text>
                    </Text>
                    
                    <TouchableOpacity onPress={() => changeMonth(1)} style={style.monthButton}>
                        <FontAwesome name="chevron-right" size={14} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>

                {/* RESUMO DO MÊS (CARDS) */}
                <View style={style.summaryRow}>
                    <View style={style.summaryCard}>
                        <View style={[style.summaryIconBox, { backgroundColor: 'rgba(0, 230, 118, 0.1)' }]}>
                            <FontAwesome name="arrow-up" size={16} color={COLORS.income} />
                        </View>
                        <View>
                            <Text style={style.summaryLabel}>Entradas</Text>
                            <Text style={[style.summaryValue, { color: COLORS.income }]}>{formatCurrency(incomeTotal)}</Text>
                        </View>
                    </View>

                    <View style={style.summaryCard}>
                        <View style={[style.summaryIconBox, { backgroundColor: 'rgba(255, 82, 82, 0.1)' }]}>
                            <FontAwesome name="arrow-down" size={16} color={COLORS.expense} />
                        </View>
                        <View>
                            <Text style={style.summaryLabel}>Saídas</Text>
                            <Text style={[style.summaryValue, { color: COLORS.expense }]}>{formatCurrency(expenseTotal)}</Text>
                        </View>
                    </View>
                </View>

                {/* LISTA DE TRANSAÇÕES */}
                <Text style={style.sectionTitle}>Transações</Text>

                {loading ? (
                    <ActivityIndicator color={COLORS.primary} size="large" style={{marginTop: 50}} />
                ) : filteredList.length === 0 ? (
                    <View style={style.emptyContainer}>
                        <MaterialCommunityIcons name="clipboard-text-outline" size={60} color={COLORS.textSecondary} />
                        <Text style={style.emptyText}>Nenhuma movimentação neste mês.</Text>
                    </View>
                ) : (
                    filteredList.map((item) => (
                        <TouchableOpacity 
                            key={item.id} 
                            style={style.transactionCard} 
                            onPress={() => handleTransactionPress(item)}
                            activeOpacity={0.7}
                        >
                            {/* Ícone */}
                            <View style={[
                                style.tIconContainer, 
                                { backgroundColor: item.type === 'RECEITA' ? 'rgba(0, 230, 118, 0.1)' : 'rgba(255, 82, 82, 0.1)' }
                            ]}>
                                <MaterialCommunityIcons 
                                    name={item.type === 'RECEITA' ? "bank-transfer-in" : "shopping-outline"} 
                                    size={24} 
                                    color={item.type === 'RECEITA' ? COLORS.income : COLORS.expense} 
                                />
                            </View>

                            {/* Detalhes */}
                            <View style={style.tContent}>
                                <Text style={style.tTitle} numberOfLines={1}>{item.description}</Text>
                                <Text style={style.tDate}>
                                    {new Date(item.date).toLocaleDateString('pt-BR')}
                                </Text>
                            </View>

                            {/* Valor */}
                            <Text style={[
                                style.tAmount, 
                                { color: item.type === 'RECEITA' ? COLORS.income : COLORS.expense }
                            ]}>
                                {item.type === 'RECEITA' ? '+ ' : '- '}
                                {formatCurrency(item.amount)}
                            </Text>
                        </TouchableOpacity>
                    ))
                )}

            </ScrollView>

            <FloatingMenu currentRoute="Extrato" />
        </View>
    );
}