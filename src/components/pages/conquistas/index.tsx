import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import { style, COLORS } from './style';
import { FontAwesome } from '@expo/vector-icons';
import FloatingMenu from '../../menuFlutuante/menuFlutuante';

// Tipo de dados para Conquista
type Achievement = {
    id: string;
    name: string;
    description: string;
    icon: keyof typeof FontAwesome.glyphMap; 
    unlocked: boolean;
};

// Dados Mockados
const MOCK_ACHIEVEMENTS: Achievement[] = [
    { id: '1', name: 'Primeiros Passos', description: 'Complete seu cadastro.', icon: 'user', unlocked: true },
    { id: '2', name: 'Poupador Iniciante', description: 'Economize seus primeiros R$ 100.', icon: 'money', unlocked: true },
    { id: '3', name: 'No Azul', description: 'Termine o mês com saldo positivo.', icon: 'thumbs-up', unlocked: true },
    { id: '4', name: 'Investidor', description: 'Crie sua primeira meta de investimento.', icon: 'line-chart', unlocked: false },
    { id: '5', name: 'Mestre das Metas', description: 'Conclua 5 metas financeiras.', icon: 'trophy', unlocked: false },
    { id: '6', name: 'Disciplina Ferrenha', description: 'Registre gastos por 30 dias seguidos.', icon: 'calendar-check-o', unlocked: false },
    { id: '7', name: 'Desafio Aceito', description: 'Complete seu primeiro desafio semanal.', icon: 'flag-checkered', unlocked: true },
    { id: '8', name: 'Superavit', description: 'Economize 20% da sua renda mensal.', icon: 'percent', unlocked: false },
    { id: '9', name: 'Veterano', description: 'Use o app por 1 ano.', icon: 'star', unlocked: false },
];

export default function Conquistas() {
    // Cálculos de progresso
    const total = MOCK_ACHIEVEMENTS.length;
    const unlockedCount = MOCK_ACHIEVEMENTS.filter(a => a.unlocked).length;
    const progressPercent = (unlockedCount / total) * 100;

    const handlePressBadge = (item: Achievement) => {
        Alert.alert(
            item.name,
            `${item.description}\n\nStatus: ${item.unlocked ? '✅ Desbloqueada' : '🔒 Bloqueada'}`
        );
    };

    const renderBadge = ({ item }: { item: Achievement }) => {
        return (
            <TouchableOpacity 
                style={[style.badgeCard, !item.unlocked && style.lockedCard]} 
                onPress={() => handlePressBadge(item)}
                activeOpacity={0.7}
            >
                <View style={[style.iconContainer, item.unlocked ? style.unlockedIconBg : style.lockedIconBg]}>
                    {item.unlocked ? (
                        <FontAwesome name={item.icon} size={28} color={COLORS.gold} />
                    ) : (
                        <FontAwesome name="lock" size={24} color={COLORS.locked} />
                    )}
                </View>
                
                <Text style={style.badgeName} numberOfLines={2}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={style.container}>
            <Text style={style.pageTitle}>Galeria de Conquistas</Text>

            {/* Cabeçalho de Progresso */}
            <View style={style.progressHeader}>
                <Text style={style.progressText}>
                    {unlockedCount} de {total} desbloqueadas
                </Text>
                <View style={style.progressBarTrack}>
                    <View style={[style.progressBarFill, { width: `${progressPercent}%` }]} />
                </View>
            </View>

            <FlatList
                data={MOCK_ACHIEVEMENTS}
                keyExtractor={item => item.id}
                renderItem={renderBadge}
                numColumns={3} // Grade de 3 colunas
                contentContainerStyle={style.gridContent}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={{ justifyContent: 'flex-start' }} 
            />
            
            <FloatingMenu currentRoute="Conquistas" /> 
        </View>
    );
}