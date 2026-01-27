import React, { useState, useCallback, useContext } from 'react';
import { 
    View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions, LayoutAnimation, Platform, UIManager
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { PieChart } from "react-native-chart-kit";

import { style, COLORS } from './style';
import FloatingMenu from '../../menuFlutuante/menuFlutuante';
import { AuthContext } from '../../../services/authContext';
import api from '../../../services/api';

// Habilita animações no Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const screenWidth = Dimensions.get("window").width;

interface Transaction {
    id: number;
    description: string;
    amount: number;
    type: 'RECEITA' | 'DESPESA';
    date: string;
}

export default function Relatorio() {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    
    // Controle de Mês
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    // Controle de Visibilidade do Gráfico
    const [showPieChart, setShowPieChart] = useState(true);

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    async function fetchData() {
        try {
            if (transactions.length === 0) setLoading(true);
            const response = await api.get('/api/transactions');
            setTransactions(response.data);
        } catch (error) {
            console.log("Erro ao buscar dados do relatório");
        } finally {
            setLoading(false);
        }
    }

    // --- CÁLCULOS ---
    const filteredTransactions = transactions.filter(t => {
        const d = new Date(t.date);
        return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
    });

    const incomeTotal = filteredTransactions
        .filter(t => t.type === 'RECEITA')
        .reduce((acc, curr) => acc + Number(curr.amount), 0);

    const expenseTotal = filteredTransactions
        .filter(t => t.type === 'DESPESA')
        .reduce((acc, curr) => acc + Number(curr.amount), 0);

    const expensesByDesc = filteredTransactions
        .filter(t => t.type === 'DESPESA')
        .reduce((acc, curr) => {
            acc[curr.description] = (acc[curr.description] || 0) + Number(curr.amount);
            return acc;
        }, {} as Record<string, number>);

    const pieData = Object.keys(expensesByDesc).map((key, index) => ({
        name: key,
        population: expensesByDesc[key],
        color: [
            '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#6366F1', '#EC4899'
        ][index % 6],
        legendFontColor: "#A1A1AA",
        legendFontSize: 12
    })).sort((a, b) => b.population - a.population).slice(0, 5); // Top 5

    // --- FUNÇÕES ---
    const changeMonth = (direction: -1 | 1) => {
        let newMonth = selectedMonth + direction;
        let newYear = selectedYear;
        
        if (newMonth > 11) { newMonth = 0; newYear++; }
        if (newMonth < 0) { newMonth = 11; newYear--; }
        
        setSelectedMonth(newMonth);
        setSelectedYear(newYear);
    };

    const toggleChart = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShowPieChart(!showPieChart);
    };

    const formatCurrency = (val: number) => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const getMonthName = (m: number) => new Date(2023, m, 1).toLocaleString('pt-BR', { month: 'long' });

    if (loading) {
        return (
            <View style={[style.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <View style={style.container}>
            <ScrollView contentContainerStyle={style.contentContainer} showsVerticalScrollIndicator={false}>
                
                <View style={style.header}>
                    <Text style={style.title}>Relatórios</Text>
                    <Text style={style.subtitle}>Análise financeira mensal</Text>
                </View>

                {/* SELETOR DE MÊS */}
                <View style={style.monthSelector}>
                    <TouchableOpacity onPress={() => changeMonth(-1)} style={style.monthButton}>
                        <FontAwesome name="chevron-left" size={16} color={COLORS.primary} />
                    </TouchableOpacity>
                    
                    <Text style={style.monthText}>
                        {getMonthName(selectedMonth)} <Text style={{color: COLORS.textSecondary}}>{selectedYear}</Text>
                    </Text>
                    
                    <TouchableOpacity onPress={() => changeMonth(1)} style={style.monthButton}>
                        <FontAwesome name="chevron-right" size={16} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>

                {/* RESUMO MENSAL (CARDS) */}
                <View style={style.summaryContainer}>
                    <View style={style.summaryCard}>
                        <FontAwesome name="arrow-up" size={20} color={COLORS.income} />
                        <Text style={style.summaryLabel}>Receitas</Text>
                        <Text style={[style.summaryValue, { color: COLORS.income }]}>{formatCurrency(incomeTotal)}</Text>
                    </View>
                    
                    <View style={style.summaryCard}>
                        <FontAwesome name="arrow-down" size={20} color={COLORS.expense} />
                        <Text style={style.summaryLabel}>Despesas</Text>
                        <Text style={[style.summaryValue, { color: COLORS.expense }]}>{formatCurrency(expenseTotal)}</Text>
                    </View>
                </View>

                {/* GRÁFICO DE PIZZA (COM TOGGLE) */}
                <View style={style.chartSection}>
                    <View style={style.chartHeader}>
                        <Text style={style.chartTitle}>Despesas por Tipo</Text>
                        
                        <TouchableOpacity onPress={toggleChart} style={style.toggleButton} activeOpacity={0.7}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <FontAwesome 
                                    name={showPieChart ? "eye-slash" : "pie-chart"} 
                                    size={16} 
                                    color={COLORS.primary} 
                                />
                                <Text style={style.toggleText}>
                                    {showPieChart ? "Ocultar" : "Mostrar"}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                    {/* Renderização Condicional do Gráfico */}
                    {showPieChart && (
                        <View>
                            {pieData.length > 0 ? (
                                <PieChart
                                    data={pieData}
                                    width={screenWidth - 60}
                                    height={220}
                                    chartConfig={{
                                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    }}
                                    accessor={"population"}
                                    backgroundColor={"transparent"}
                                    paddingLeft={"15"}
                                    center={[0, 0]}
                                    absolute
                                />
                            ) : (
                                <View style={style.emptyState}>
                                    <FontAwesome name="pie-chart" size={40} color={COLORS.textSecondary} />
                                    <Text style={style.emptyText}>Sem despesas neste mês.</Text>
                                </View>
                            )}
                        </View>
                    )}
                </View>

            </ScrollView>

            <FloatingMenu currentRoute="Relatorio" />
        </View>
    );
}