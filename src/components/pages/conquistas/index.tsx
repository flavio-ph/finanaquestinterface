import React, { useState, useCallback, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { style, COLORS } from './style';
import FloatingMenu from '../../menuFlutuante/menuFlutuante';
import { AuthContext } from '../../../services/authContext';
import api from '../../../services/api';

// Tipagem
interface Achievement {
    id: number;
    name: string;
    description: string;
    iconName?: string; // Para mapear ícones
    rewardXp: number;
    unlockedAt?: string | null; // Se tiver data, está desbloqueado
}

export default function Conquistas() {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [achievements, setAchievements] = useState<Achievement[]>([]);

    // Dados Mockados (Enquanto o backend não retorna a lista completa)
    // No futuro, isso virá de: api.get('/achievements')
    const allAchievementsMock: Achievement[] = [
        { id: 1, name: "Primeiro Passo", description: "Faça seu cadastro no FinanQuest.", rewardXp: 100, iconName: "flag" },
        { id: 2, name: "Poupador Iniciante", description: "Registre sua primeira receita.", rewardXp: 150, iconName: "money" },
        { id: 3, name: "Mestre da Organização", description: "Crie 5 categorias de despesas.", rewardXp: 300, iconName: "list" },
        { id: 4, name: "Investidor", description: "Cumpra uma meta financeira.", rewardXp: 500, iconName: "line-chart" },
        { id: 5, name: "Lendário", description: "Atinja o nível 10.", rewardXp: 1000, iconName: "trophy" },
    ];

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    async function fetchData() {
        try {
            if (achievements.length === 0) setLoading(true);

            // 1. Buscar conquistas desbloqueadas do usuário
            // (Assumindo que criamos esse endpoint ou pegamos do /users/{id})
            let unlockedIds: number[] = [];
            
            if (user?.id) {
                try {
                    const response = await api.get(`/users/${user.id}/achievements`);
                    // Supondo que retorne lista de objetos com ID
                    unlockedIds = response.data.map((a: any) => a.id);
                } catch (e) {
                    // Fallback se o endpoint não existir: Desbloqueia as básicas
                    unlockedIds = [1, 2]; 
                }
            }

            // 2. Cruzar dados (Fundir Mock com Realidade)
            const processedList = allAchievementsMock.map(ach => ({
                ...ach,
                unlockedAt: unlockedIds.includes(ach.id) ? new Date().toISOString() : null
            }));

            setAchievements(processedList);

        } catch (error) {
            console.log("Erro ao carregar conquistas", error);
        } finally {
            setLoading(false);
        }
    }

    // Cálculos de Progresso
    const unlockedCount = achievements.filter(a => a.unlockedAt).length;
    const totalCount = achievements.length;
    const progressPercent = totalCount > 0 ? (unlockedCount / totalCount) * 100 : 0;

    // Função para escolher cor do ícone baseada na dificuldade (simulada pelo XP)
    const getIconColor = (xp: number, isUnlocked: boolean) => {
        if (!isUnlocked) return COLORS.lockedIcon;
        if (xp >= 1000) return COLORS.gold;
        if (xp >= 300) return COLORS.secondary; // Prata/Amarelo
        return COLORS.bronze;
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
                
                {/* HEADER DE PROGRESSO */}
                <View style={style.headerContainer}>
                    <Text style={style.pageTitle}>Hall da Fama</Text>
                    <Text style={style.progressText}>{unlockedCount} de {totalCount} Desbloqueadas</Text>
                    
                    <View style={style.progressBarTrack}>
                        <LinearGradient
                            colors={[COLORS.primary, COLORS.secondary]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={[style.progressBarFill, { width: `${progressPercent}%` }]}
                        />
                    </View>
                </View>

                {/* LISTA */}
                <Text style={style.sectionTitle}>Conquistas</Text>

                {achievements.map((item) => {
                    const isUnlocked = !!item.unlockedAt;
                    
                    return (
                        <View 
                            key={item.id} 
                            style={[style.achievementCard, !isUnlocked && style.achievementCardLocked]}
                        >
                            {/* Ícone */}
                            <View style={[style.iconContainer, { borderColor: getIconColor(item.rewardXp, isUnlocked) }]}>
                                <FontAwesome 
                                    name={isUnlocked ? (item.iconName as any || "star") : "lock"} 
                                    size={24} 
                                    color={getIconColor(item.rewardXp, isUnlocked)} 
                                />
                            </View>

                            {/* Textos */}
                            <View style={style.textContainer}>
                                <Text style={[style.title, !isUnlocked && { color: COLORS.textSecondary }]}>
                                    {item.name}
                                </Text>
                                <Text style={style.description}>
                                    {isUnlocked ? item.description : "??? (Bloqueado)"}
                                </Text>
                                
                                <View style={style.xpBadge}>
                                    <Text style={style.xpText}>+{item.rewardXp} XP</Text>
                                </View>
                            </View>
                        </View>
                    );
                })}

            </ScrollView>

            <FloatingMenu currentRoute="Conquistas" />
        </View>
    );
}