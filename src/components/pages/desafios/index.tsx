import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { style, COLORS } from './style';
import { FontAwesome } from '@expo/vector-icons';
import FloatingMenu from '../../menuFlutuante/menuFlutuante';

// Tipo de dados para Desafio
type ChallengeStatus = 'disponivel' | 'ativo' | 'concluido';
type ChallengeType = 'semanal' | 'mensal';

type Challenge = {
    id: string;
    name: string;
    description: string;
    icon: keyof typeof FontAwesome.glyphMap;
    type: ChallengeType;
    rewardXp: number;
    status: ChallengeStatus;
};

// Dados Mockados
const MOCK_CHALLENGES: Challenge[] = [
    { id: '1', name: 'Economia Expressa', description: 'Gaste R$ 50,00 a menos em Alimentação esta semana.', icon: 'cutlery', type: 'semanal', rewardXp: 100, status: 'disponivel' },
    { id: '2', name: 'Check-in Diário', description: 'Registre transações por 7 dias seguidos.', icon: 'calendar-check-o', type: 'semanal', rewardXp: 150, status: 'ativo' },
    { id: '3', name: 'Zero Lazer Supérfluo', description: 'Não gaste com Lazer esta semana.', icon: 'film', type: 'semanal', rewardXp: 200, status: 'concluido' },
    { id: '4', name: 'Meta de Poupança Mensal', description: 'Economize R$ 300,00 este mês.', icon: 'bank', type: 'mensal', rewardXp: 500, status: 'disponivel' },
    { id: '5', name: 'Foco no Supermercado', description: 'Mantenha os gastos de Supermercado abaixo de R$ 600.', icon: 'shopping-basket', type: 'mensal', rewardXp: 400, status: 'ativo' },
];

// Componente de Card reutilizável
const ChallengeCard = ({ challenge }: { challenge: Challenge }) => {
    
    // Estado do botão baseado no status do desafio
    let buttonStyle = style.actionButton;
    let buttonTextStyle = style.actionButtonText;
    let buttonText = "Iniciar";

    if (challenge.status === 'ativo') {
        buttonStyle = style.activeButton;
        buttonTextStyle = style.activeButtonText;
        buttonText = "Em Andamento";
    } else if (challenge.status === 'concluido') {
        buttonStyle = style.completedButton;
        buttonTextStyle = style.completedButtonText;
        buttonText = "Concluído";
    }

    const handlePress = () => {
        if (challenge.status === 'disponivel') {
            Alert.alert("Novo Desafio", `Deseja iniciar o desafio "${challenge.name}"?`);
            // Aqui você mudaria o estado (ex: setChallengeStatus(id, 'ativo'))
        } else {
             Alert.alert(challenge.name, `Recompensa: ${challenge.rewardXp} XP`);
        }
    };

    return (
        <View style={style.challengeCard}>
            <View style={style.cardHeader}>
                <View style={[style.iconContainer, challenge.status === 'concluido' && { borderColor: COLORS.income, borderWidth: 1 }]}>
                    <FontAwesome 
                        name={challenge.icon} 
                        size={24} 
                        color={challenge.status === 'concluido' ? COLORS.income : COLORS.primary} 
                    />
                </View>
                <View style={style.headerText}>
                    <Text style={style.challengeName}>{challenge.name}</Text>
                </View>
            </View>

            <Text style={style.challengeDescription}>{challenge.description}</Text>

            <View style={style.cardFooter}>
                <View style={style.rewardContainer}>
                    <Text style={style.rewardLabel}>Recompensa</Text>
                    <Text style={style.rewardValue}>{challenge.rewardXp} XP</Text>
                </View>

                <TouchableOpacity 
                    style={buttonStyle}
                    onPress={handlePress}
                    disabled={challenge.status === 'concluido'}
                >
                    <Text style={buttonTextStyle}>{buttonText}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


export default function Challenges() {
    
    // Filtra os desafios por tipo
    const weeklyChallenges = MOCK_CHALLENGES.filter(c => c.type === 'semanal');
    const monthlyChallenges = MOCK_CHALLENGES.filter(c => c.type === 'mensal');

    return (
        <View style={style.container}>
            <ScrollView contentContainerStyle={style.contentContainer}>
                <Text style={style.pageTitle}>Central de Desafios</Text>

                {/* Seção Semanal */}
                <Text style={style.sectionTitle}>Desafios Semanais</Text>
                {weeklyChallenges.map(challenge => (
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                ))}

                {/* Seção Mensal */}
                <Text style={style.sectionTitle}>Desafios Mensais</Text>
                {monthlyChallenges.map(challenge => (
                    <ChallengeCard key={challenge.id} challenge={challenge} />
                ))}
              <FloatingMenu currentRoute="Challenges" />
            </ScrollView>

          
        </View>
    );
}