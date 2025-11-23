import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { style, COLORS } from './style';
import { FontAwesome } from '@expo/vector-icons';
import FloatingMenu from '../../menuFlutuante/menuFlutuante';

type Goal = {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    deadline: string; // YYYY-MM-DD
};

const MOCK_GOALS: Goal[] = [
    { id: '1', name: 'Economia Outubro', targetAmount: 500, currentAmount: 350, deadline: '2025-10-31' },
    { id: '2', name: 'Viagem Fim de Ano', targetAmount: 3000, currentAmount: 1200, deadline: '2025-12-20' },
    { id: '3', name: 'Reserva de Emergência', targetAmount: 10000, currentAmount: 2500, deadline: '2026-06-01' },
];

export default function Metas() {
    const navigation = useNavigation<any>();

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    const renderGoal = ({ item }: { item: Goal }) => {
        const progress = Math.min((item.currentAmount / item.targetAmount) * 100, 100); // Max 100%

        return (
            <TouchableOpacity 
                style={style.goalCard}
                onPress={() => navigation.navigate('GoalForm', { goalToEdit: item })}
                activeOpacity={0.7}
            >
                <View style={style.goalHeader}>
                    <Text style={style.goalName}>{item.name}</Text>
                    <Text style={style.goalPercentage}>{progress.toFixed(0)}%</Text>
                </View>

                <View style={style.progressBarTrack}>
                    <View style={[style.progressBarFill, { width: `${progress}%` }]} />
                </View>

                <View style={style.goalFooter}>
                    <Text style={style.goalValues}>
                        <Text style={style.currentValue}>{formatCurrency(item.currentAmount)}</Text>
                        {' / ' + formatCurrency(item.targetAmount)}
                    </Text>
                    <Text style={style.goalDeadline}>Até {formatDate(item.deadline)}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={style.container}>
            <Text style={style.pageTitle}>Minhas Metas</Text>

            <FlatList
                data={MOCK_GOALS}
                keyExtractor={item => item.id}
                renderItem={renderGoal}
                contentContainerStyle={style.listContent}
                ListEmptyComponent={() => (
                     <View style={{ alignItems: 'center', marginTop: 50 }}>
                        <Text style={{ color: COLORS.textSecondary }}>Nenhuma meta ativa.</Text>
                    </View>
                )}
            />

            {/* FAB para Adicionar Nova Meta */}
            <TouchableOpacity 
                style={style.fab} 
                onPress={() => navigation.navigate('GoalForm')}
            >
                <FontAwesome name="plus" size={24} color={COLORS.textPrimary} />
            </TouchableOpacity>

             <FloatingMenu currentRoute="Metas" />

        </View>
    );
}