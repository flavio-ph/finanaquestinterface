import React, { useState, useCallback, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { PieChart, LineChart } from 'react-native-chart-kit';

import { style, COLORS } from './style';
import FloatingMenu from '../../menuFlutuante/menuFlutuante';
import api from '../../../services/api';

const screenWidth = Dimensions.get("window").width;

// Definição dos tipos
interface TransactionData {
    id: number;
    description: string;
    amount: number;
    type: 'RECEITA' | 'DESPESA';
    date: string; // YYYY-MM-DD
}

// Cores para o gráfico de pizza
const CHART_COLORS = ['#E57373', '#BA68C8', '#64B5F6', '#FFD54F', '#4DB6AC', '#FF8A65', '#90A4AE'];

export default function Relatorio() {
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState<TransactionData[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Estados Calculados
    const [monthlyIncome, setMonthlyIncome] = useState(0);
    const [monthlyExpense, setMonthlyExpense] = useState(0);
    const [pieData, setPieData] = useState<any[]>([]);
    const [lineData, setLineData] = useState<any>({
        labels: [],
        datasets: [{ data: [0] }]
    });

    // Carregar dados ao focar na tela
    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    // Recalcular gráficos quando as transações ou a data mudarem
    useFocusEffect(
        useCallback(() => {
            if (transactions.length > 0) {
                processMonthData();
                processLineChartData();
            }
        }, [transactions, selectedDate])
    );

    async function fetchData() {
        try {
            // Evita loading se já tiver dados, para navegação suave entre meses
            if(transactions.length === 0) setLoading(true);
            
            const response = await api.get('/api/transactions');
            setTransactions(response.data);
            
            // Processa pela primeira vez
            setLoading(false);
        } catch (error) {
            console.log("Erro ao carregar relatórios:", error);
            setLoading(false);
        }
    }

    // --- LÓGICA DE PROCESSAMENTO ---

    // 1. Processa Resumo e Gráfico de Pizza (Mês Selecionado)
    const processMonthData = () => {
        const selMonth = selectedDate.getMonth();
        const selYear = selectedDate.getFullYear();

        // Filtra transações do mês escolhido
        const currentMonthTrans = transactions.filter(t => {
            const parts = t.date.split('-');
            const tDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
            return tDate.getMonth() === selMonth && tDate.getFullYear() === selYear;
        });

        // Calcula Totais
        let income = 0;
        let expense = 0;
        
        // Para o gráfico de Pizza (Agrupa despesas por DESCRIÇÃO)
        const expenseMap: { [key: string]: number } = {};

        currentMonthTrans.forEach(t => {
            if (t.type === 'RECEITA') {
                income += t.amount;
            } else {
                expense += t.amount;
                // Agrupa despesas
                const desc = t.description; // Como não temos categoria, usamos a descrição
                expenseMap[desc] = (expenseMap[desc] || 0) + t.amount;
            }
        });

        setMonthlyIncome(income);
        setMonthlyExpense(expense);

        // Formata dados para o Pie Chart
        const newPieData = Object.keys(expenseMap).map((key, index) => ({
            name: key,
            population: expenseMap[key],
            color: CHART_COLORS[index % CHART_COLORS.length],
            legendFontColor: COLORS.textSecondary,
            legendFontSize: 12
        })).sort((a, b) => b.population - a.population); // Maiores primeiro

        // Se não houver despesas, cria um placeholder
        if (newPieData.length === 0) {
            setPieData([{
                name: 'Sem despesas',
                population: 100,
                color: '#333',
                legendFontColor: COLORS.textSecondary,
                legendFontSize: 12
            }]);
        } else {
            setPieData(newPieData);
        }
    };

    // 2. Processa Gráfico de Linha (Últimos 6 Meses)
    const processLineChartData = () => {
        const labels = [];
        const dataPoints = [];

        // Loop pelos últimos 6 meses (incluindo o atual)
        for (let i = 5; i >= 0; i--) {
            const d = new Date();
            d.setMonth(d.getMonth() - i);
            
            const monthName = d.toLocaleDateString('pt-BR', { month: 'short' });
            labels.push(monthName.replace('.', '')); // "jan", "fev"

            // Filtra e soma o saldo daquele mês específico
            const monthTrans = transactions.filter(t => {
                const parts = t.date.split('-');
                const tDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
                return tDate.getMonth() === d.getMonth() && tDate.getFullYear() === d.getFullYear();
            });

            const monthBalance = monthTrans.reduce((acc, t) => {
                return t.type === 'RECEITA' ? acc + t.amount : acc - t.amount;
            }, 0);

            dataPoints.push(monthBalance);
        }

        setLineData({
            labels: labels,
            datasets: [{ 
                data: dataPoints,
                color: (opacity = 1) => `rgba(106, 27, 154, ${opacity})`, 
                strokeWidth: 3
            }],
            legend: ["Saldo (Últimos 6 meses)"]
        });
    };

    // --- UTILS ---

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

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

    const getMonthLabel = () => {
        const month = selectedDate.toLocaleDateString('pt-BR', { month: 'long' });
        const year = selectedDate.getFullYear();
        return `${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`;
    };

    const chartConfig = {
        backgroundGradientFrom: COLORS.card,
        backgroundGradientTo: COLORS.card,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, 
        labelColor: (opacity = 1) => COLORS.textSecondary,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false,
        decimalPlaces: 0,
    };

    if (loading) {
        return (
            <View style={[style.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <ScrollView style={style.container} contentContainerStyle={style.contentContainer}>
            <Text style={style.pageTitle}>Relatórios</Text>

            {/* Seletor de Mês */}
            <View style={[style.monthSelector, { marginBottom: 24, paddingHorizontal: 0 }]}>
                <TouchableOpacity style={style.monthNavButton} onPress={handlePrevMonth}>
                    <FontAwesome name="chevron-left" size={16} color={COLORS.primary} />
                </TouchableOpacity>
                
                <Text style={style.monthLabel}>{getMonthLabel()}</Text>
                
                <TouchableOpacity style={style.monthNavButton} onPress={handleNextMonth}>
                    <FontAwesome name="chevron-right" size={16} color={COLORS.primary} />
                </TouchableOpacity>
            </View>

            {/* Cards de Resumo do Mês */}
            <View style={style.summaryContainer}>
                <View style={style.summaryCard}>
                    <FontAwesome name="arrow-up" size={24} color={COLORS.income} style={{ marginBottom: 8 }} />
                    <Text style={style.summaryLabel}>Receitas</Text>
                    <Text style={[style.summaryValue, { color: COLORS.income }]}>
                        {formatCurrency(monthlyIncome)}
                    </Text>
                </View>
                <View style={style.summaryCard}>
                    <FontAwesome name="arrow-down" size={24} color={COLORS.expense} style={{ marginBottom: 8 }} />
                    <Text style={style.summaryLabel}>Despesas</Text>
                    <Text style={[style.summaryValue, { color: COLORS.expense }]}>
                        {formatCurrency(monthlyExpense)}
                    </Text>
                </View>
            </View>

            {/* Gráfico de Pizza (Despesas por "Categoria"/Descrição) */}
            <View style={style.chartSection}>
                <Text style={style.chartTitle}>Despesas do Mês</Text>
                {monthlyExpense === 0 ? (
                    <Text style={{ color: COLORS.textSecondary, marginVertical: 20 }}>
                        Nenhuma despesa neste mês.
                    </Text>
                ) : (
                    <PieChart
                        data={pieData}
                        width={screenWidth - 32} 
                        height={220}
                        chartConfig={chartConfig}
                        accessor={"population"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        absolute 
                        hasLegend={true}
                    />
                )}
            </View>

            {/* Gráfico de Linha (Evolução 6 Meses) */}
            <View style={style.chartSection}>
                <Text style={style.chartTitle}>Evolução do Saldo (6 Meses)</Text>
                <LineChart
                    data={lineData}
                    width={screenWidth - 64}
                    height={220}
                    chartConfig={{
                        ...chartConfig,
                        propsForDots: {
                            r: "5",
                            strokeWidth: "2",
                            stroke: COLORS.primary
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
            </View>
            
            <FloatingMenu currentRoute="Relatorio" />
        </ScrollView>
    );
}