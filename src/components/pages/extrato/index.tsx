import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFocusEffect, useNavigation, NavigationProp } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { style, COLORS } from './style';
import FloatingMenu from '../../menuFlutuante/menuFlutuante';
import api from '../../../services/api';

// Tipagem
interface TransactionData {
    id: number;
    description: string;
    amount: number;
    type: 'RECEITA' | 'DESPESA';
    date: string;
}

export default function Extrato() {
    const navigation = useNavigation<NavigationProp<any>>();
    
    const [loading, setLoading] = useState(true);
    const [allTransactions, setAllTransactions] = useState<TransactionData[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Carregar dados ao entrar na tela
    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    async function fetchData() {
        try {
            // Só ativa loading visual se a lista estiver vazia (primeira carga)
            if (allTransactions.length === 0) setLoading(true);
            
            const response = await api.get('/api/transactions');
            setAllTransactions(response.data);
            
        } catch (error) {
            console.log("Erro ao buscar extrato:", error);
        } finally {
            setLoading(false);
        }
    }

    // --- LÓGICA DE FILTRO ---
    const getFilteredTransactions = () => {
        const selMonth = selectedDate.getMonth();
        const selYear = selectedDate.getFullYear();

        return allTransactions.filter(t => {
            const parts = t.date.split('-'); // YYYY-MM-DD
            // Cria data local segura
            const tDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
            return tDate.getMonth() === selMonth && tDate.getFullYear() === selYear;
        }).sort((a, b) => {
            // Ordena por data (mais recente primeiro) e depois por ID
            return new Date(b.date).getTime() - new Date(a.date).getTime() || b.id - a.id;
        });
    };

    const currentTransactions = getFilteredTransactions();

    // --- CÁLCULO DO SALDO DO MÊS (Opcional, mas útil) ---
    const monthBalance = currentTransactions.reduce((acc, t) => {
        return t.type === 'RECEITA' ? acc + t.amount : acc - t.amount;
    }, 0);

    // --- NAVEGAÇÃO ---
    const handlePrevMonth = () => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setSelectedDate(newDate);
    };

    const handleNextMonth = () => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setSelectedDate(newDate);
    };

    const handleEdit = (transaction: TransactionData) => {
        // Navega para a tela de Transação passando os dados para edição
        // @ts-ignore
        navigation.navigate('Transacao', { 
            transactionToEdit: transaction 
        });
    };

    // --- FORMATAÇÃO ---
    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const getMonthLabel = () => {
        const month = selectedDate.toLocaleDateString('pt-BR', { month: 'long' });
        const year = selectedDate.getFullYear();
        return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
    };

    const formatDate = (dateString: string) => {
        const parts = dateString.split('-');
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
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
                <Text style={style.pageTitle}>Extrato</Text>

                {/* Seletor de Mês */}
                <View style={style.monthSelector}>
                    <TouchableOpacity style={style.monthNavButton} onPress={handlePrevMonth}>
                        <FontAwesome name="chevron-left" size={16} color={COLORS.primary} />
                    </TouchableOpacity>
                    
                    <Text style={style.monthLabel}>{getMonthLabel()}</Text>
                    
                    <TouchableOpacity style={style.monthNavButton} onPress={handleNextMonth}>
                        <FontAwesome name="chevron-right" size={16} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>

                {/* Resumo Rápido */}
                <View style={style.monthSummary}>
                    <Text style={style.summaryText}>Balanço do mês:</Text>
                    <Text style={[style.summaryValue, { color: monthBalance >= 0 ? COLORS.income : COLORS.expense }]}>
                        {formatCurrency(monthBalance)}
                    </Text>
                </View>

                {/* Lista */}
                {currentTransactions.length === 0 ? (
                    <View style={style.emptyState}>
                        <FontAwesome name="file-text-o" size={48} color={COLORS.textSecondary} />
                        <Text style={style.emptyText}>Sem movimentações neste mês.</Text>
                    </View>
                ) : (
                    currentTransactions.map((t) => (
                        <TouchableOpacity 
                            key={t.id} 
                            style={style.transactionItem}
                            onPress={() => handleEdit(t)} // Clique para editar
                            activeOpacity={0.7}
                        >
                            <View style={[
                                style.transactionIconContainer, 
                                t.type === 'DESPESA' ? style.expenseIconBg : style.incomeIconBg
                            ]}>
                                <FontAwesome 
                                    name={t.type === 'DESPESA' ? "cutlery" : "dollar"} 
                                    size={18} 
                                    color={t.type === 'DESPESA' ? COLORS.expense : COLORS.income} 
                                />
                            </View>
                            
                            <View style={style.transactionDetails}>
                                <Text style={style.transactionDescription}>{t.description}</Text>
                                <Text style={style.transactionDate}>{formatDate(t.date)}</Text>
                            </View>
                            
                            <Text style={[
                                style.transactionAmount, 
                                { color: t.type === 'DESPESA' ? COLORS.expense : COLORS.income }
                            ]}>
                                {t.type === 'DESPESA' ? '- ' : '+ '} 
                                {formatCurrency(t.amount)}
                            </Text>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>

            <FloatingMenu currentRoute="Extrato" />
        </View>
    );
}