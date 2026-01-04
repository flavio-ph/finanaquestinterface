import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { style, COLORS } from './style';
import { FontAwesome } from '@expo/vector-icons';
// Importação da biblioteca de gráficos
import { PieChart, LineChart } from 'react-native-chart-kit';
import FloatingMenu from '../../menuFlutuante/menuFlutuante';

const screenWidth = Dimensions.get("window").width;

export default function Relatorio() {
    const [currentMonth, setCurrentMonth] = useState("Outubro 2025");

   
    const categoryData = [
        { name: 'Moradia', population: 1200, color: '#E57373', legendFontColor: COLORS.textSecondary, legendFontSize: 12 },
        { name: 'Alimentação', population: 800, color: '#BA68C8', legendFontColor: COLORS.textSecondary, legendFontSize: 12 },
        { name: 'Transporte', population: 400, color: '#64B5F6', legendFontColor: COLORS.textSecondary, legendFontSize: 12 },
        { name: 'Lazer', population: 300, color: '#FFD54F', legendFontColor: COLORS.textSecondary, legendFontSize: 12 },
        { name: 'Outros', population: 150, color: '#90A4AE', legendFontColor: COLORS.textSecondary, legendFontSize: 12 },
    ];

    const monthlyData = {
        labels: ["Mai", "Jun", "Jul", "Ago", "Set", "Out"],
        datasets: [
            {
                data: [500, 800, 200, 1200, 600, 450], 
                color: (opacity = 1) => `rgba(106, 27, 154, ${opacity})`, 
                strokeWidth: 3
            }
        ],
        legend: ["Saldo Mensal (R$)"]
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

    return (
        <ScrollView style={style.container} contentContainerStyle={style.contentContainer}>
            <Text style={style.pageTitle}>Relatórios</Text>

            {/* Seletor de Mês (Reutilizando estilo do History) */}
            <View style={[style.monthSelector, { marginBottom: 24, paddingHorizontal: 0 }]}>
                <TouchableOpacity style={style.monthNavButton} onPress={() => Alert.alert("Info", "Mês anterior")}>
                    <FontAwesome name="chevron-left" size={16} color={COLORS.primary} />
                </TouchableOpacity>
                <Text style={style.monthLabel}>{currentMonth}</Text>
                <TouchableOpacity style={style.monthNavButton} onPress={() => Alert.alert("Info", "Próximo mês")}>
                    <FontAwesome name="chevron-right" size={16} color={COLORS.primary} />
                </TouchableOpacity>
            </View>

            {/* Cards de Resumo do Mês */}
            <View style={style.summaryContainer}>
                <View style={style.summaryCard}>
                    <FontAwesome name="arrow-up" size={24} color={COLORS.income} style={{ marginBottom: 8 }} />
                    <Text style={style.summaryLabel}>Receitas</Text>
                    <Text style={[style.summaryValue, { color: COLORS.income }]}>R$ 5.400</Text>
                </View>
                <View style={style.summaryCard}>
                    <FontAwesome name="arrow-down" size={24} color={COLORS.expense} style={{ marginBottom: 8 }} />
                    <Text style={style.summaryLabel}>Despesas</Text>
                    <Text style={[style.summaryValue, { color: COLORS.expense }]}>R$ 2.850</Text>
                </View>
            </View>

            <View style={style.chartSection}>
                <Text style={style.chartTitle}>Despesas por Categoria</Text>
                <PieChart
                    data={categoryData}
                    width={screenWidth - 64} 
                    height={220}
                    chartConfig={chartConfig}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                    absolute 
                    hasLegend={true}
                />
            </View>

            <View style={style.chartSection}>
                <Text style={style.chartTitle}>Evolução do Saldo (6 Meses)</Text>
                <LineChart
                    data={monthlyData}
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
                    bezier // Linha curva suavizada
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