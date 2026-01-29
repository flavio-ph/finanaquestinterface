import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart, PieChart } from "react-native-chart-kit";

import { style, COLORS } from './style';
import FloatingMenu from '../../menuFlutuante/menuFlutuante';
import api from '../../../services/api';

const screenWidth = Dimensions.get("window").width;

export default function Relatorio() {
    const [loading, setLoading] = useState(true);
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [chartView, setChartView] = useState<'trend' | 'dist'>('trend');

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    async function fetchData() {
        try {
            const response = await api.get('/api/transactions');
            const list = response.data;
            const inc = list.filter((t: any) => t.type === 'RECEITA').reduce((acc: number, t: any) => acc + Number(t.amount), 0);
            const exp = list.filter((t: any) => t.type === 'DESPESA').reduce((acc: number, t: any) => acc + Number(t.amount), 0);
            setIncome(inc);
            setExpense(exp);
        } catch (error) {
            console.log("Erro ao buscar dados", error);
        } finally {
            setLoading(false);
        }
    }

    const formatCurrency = (val: number) => 
        val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // Dados Mock
    const lineChartData = {
        labels: ["Ago", "Set", "Out", "Nov", "Dez", "Jan"],
        datasets: [{
            data: [
                Math.random() * 100, Math.random() * 100, Math.random() * 100, 
                Math.random() * 100, Math.random() * 100, income > 0 ? (income / 100) : 50
            ],
            color: (opacity = 1) => `rgba(124, 58, 237, ${opacity})`,
            strokeWidth: 3
        }],
        legend: ["Fluxo de Caixa"]
    };

    const pieChartData = [
        { name: "Essenciais", population: expense * 0.5 || 100, color: "#F59E0B", legendFontColor: "#E4E4E7", legendFontSize: 12 },
        { name: "Lazer", population: expense * 0.3 || 50, color: "#EC4899", legendFontColor: "#E4E4E7", legendFontSize: 12 },
        { name: "Invest.", population: expense * 0.2 || 30, color: "#3B82F6", legendFontColor: "#E4E4E7", legendFontSize: 12 },
    ];

    const chartConfig = {
        backgroundGradientFrom: COLORS.card,
        backgroundGradientTo: COLORS.card,
        decimalPlaces: 0, 
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: { borderRadius: 16 },
        propsForDots: { r: "5", strokeWidth: "2", stroke: COLORS.primary }
    };

    return (
        <View style={style.container}>
            <ScrollView 
                contentContainerStyle={style.contentContainer} 
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
            >
                {/* HEADER */}
                <View style={style.header}>
                    <Text style={style.title}>Analytics</Text>
                    <Text style={style.subtitle}>Visão geral do seu patrimônio</Text>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} style={{marginTop: 50}} />
                ) : (
                    <>
                        {/* CARDS DE RESUMO (Modificados) */}
                        <View style={style.summaryGrid}>
                            <LinearGradient 
                                // CORES SEMI-TRANSPARENTES (Efeito Vidro Escuro)
                                colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']} 
                                style={style.summaryCard}
                            >
                                <View style={[style.summaryIcon, { backgroundColor: 'rgba(0, 230, 118, 0.15)' }]}>
                                    <Feather name="arrow-up" size={18} color={COLORS.income} />
                                </View>
                                <Text style={style.summaryLabel}>Entradas</Text>
                                <Text style={style.summaryValue}>{formatCurrency(income)}</Text>
                            </LinearGradient>

                            <LinearGradient 
                                // CORES SEMI-TRANSPARENTES (Efeito Vidro Escuro)
                                colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']} 
                                style={style.summaryCard}
                            >
                                <View style={[style.summaryIcon, { backgroundColor: 'rgba(255, 82, 82, 0.15)' }]}>
                                    <Feather name="arrow-down" size={18} color={COLORS.expense} />
                                </View>
                                <Text style={style.summaryLabel}>Saídas</Text>
                                <Text style={style.summaryValue}>{formatCurrency(expense)}</Text>
                            </LinearGradient>
                        </View>

                        {/* TOGGLE BUTTONS */}
                        <View style={style.toggleContainer}>
                            <TouchableOpacity 
                                style={[style.toggleButton, chartView === 'trend' && style.toggleButtonActive]}
                                onPress={() => setChartView('trend')}
                                activeOpacity={0.8}
                            >
                                <Text style={[style.toggleText, chartView === 'trend' && style.toggleTextActive]}>Tendência</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[style.toggleButton, chartView === 'dist' && style.toggleButtonActive]}
                                onPress={() => setChartView('dist')}
                                activeOpacity={0.8}
                            >
                                <Text style={[style.toggleText, chartView === 'dist' && style.toggleTextActive]}>Distribuição</Text>
                            </TouchableOpacity>
                        </View>

                        {/* CHART SECTION */}
                        <View style={style.chartSection}>
                            <View style={style.sectionHeader}>
                                <Text style={style.sectionTitle}>
                                    {chartView === 'trend' ? 'Fluxo Semestral' : 'Gastos por Categoria'}
                                </Text>
                                <Feather name={chartView === 'trend' ? 'activity' : 'pie-chart'} size={18} color={COLORS.textSecondary} />
                            </View>
                            
                            {chartView === 'trend' ? (
                                <LineChart
                                    data={lineChartData}
                                    width={screenWidth - 60}
                                    height={200}
                                    chartConfig={chartConfig}
                                    bezier
                                    style={style.chartStyle}
                                />
                            ) : (
                                expense === 0 ? <Text style={style.emptyText}>Sem dados.</Text> :
                                <PieChart
                                    data={pieChartData}
                                    width={screenWidth - 40}
                                    height={200}
                                    chartConfig={chartConfig}
                                    accessor={"population"}
                                    backgroundColor={"transparent"}
                                    paddingLeft={"15"}
                                    center={[10, 0]}
                                    absolute
                                />
                            )}
                        </View>
                    </>
                )}
            </ScrollView>

            <FloatingMenu currentRoute="Relatorio" />
        </View>
    );
}