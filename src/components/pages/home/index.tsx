import React, { useState, useCallback, useContext } from 'react';
import { 
    View, Text, ScrollView, TouchableOpacity, Image, StatusBar, ActivityIndicator 
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { style, COLORS } from './style';
import FloatingMenu from '../../menuFlutuante/menuFlutuante';
import { AuthContext } from '../../../services/authContext';
import api from '../../../services/api';

export default function Home() {
    const navigation = useNavigation<any>();
    const { user } = useContext(AuthContext);

    // Estados
    const [loading, setLoading] = useState(true);
    const [balance, setBalance] = useState(0);
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    
    // Estados do Usuário (Sincronizados com o Backend)
    const [userName, setUserName] = useState(user?.name || 'Jogador');
    const [profilePic, setProfilePic] = useState<string | null>(null);
    const [level, setLevel] = useState(user?.level || 1);
    const [xp, setXp] = useState(user?.experiencePoints || 0);

    // Lógica de Nível e Progresso
    const nextLevelXp = level * 1000;
    const progress = Math.min((xp / nextLevelXp) * 100, 100);
    
    // Pega apenas o primeiro nome
    const firstName = userName ? userName.split(' ')[0] : 'Jogador';

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    async function fetchData() {
        try {
            // 1. Atualizar Dados do Usuário (Foto, Nome, XP)
            if (user?.id) {
                const userRes = await api.get(`/api/users/${user.id}`);
                const uData = userRes.data;
                
                setUserName(uData.name);
                setLevel(uData.level);
                setXp(uData.experiencePoints);
                setProfilePic(uData.profilePicture); // Base64 ou URL
            }

            // 2. Atualizar Finanças (Transações)
            const transRes = await api.get('/api/transactions');
            const transactions = transRes.data;

            const totalIncome = transactions
                .filter((t: any) => t.type === 'RECEITA')
                .reduce((acc: number, t: any) => acc + Number(t.amount), 0);
                
            const totalExpense = transactions
                .filter((t: any) => t.type === 'DESPESA')
                .reduce((acc: number, t: any) => acc + Number(t.amount), 0);

            setIncome(totalIncome);
            setExpense(totalExpense);
            setBalance(totalIncome - totalExpense);

        } catch (error) {
            console.log("Erro ao carregar dados da home", error);
        } finally {
            setLoading(false);
        }
    }

    // Auxiliar: Trata a imagem Base64 se necessário
    const getProfileSource = () => {
        if (!profilePic) return null;
        
        // Se já for uma URL completa ou já tiver o prefixo data:image
        if (profilePic.startsWith('http') || profilePic.startsWith('data:image')) {
            return { uri: profilePic };
        }
        
        // Se for Base64 pura (comum em Java Spring Boot), adiciona o prefixo
        return { uri: `data:image/jpeg;base64,${profilePic}` };
    };

    const formatCurrency = (val: number) => 
        val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return (
        <View style={style.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

            <ScrollView contentContainerStyle={style.contentContainer} showsVerticalScrollIndicator={false}>
                
                {/* --- HEADER --- */}
                <View style={style.header}>
                    <View>
                        <Text style={style.greeting}>Olá, {firstName}</Text>
                        <Text style={style.levelText}>Nível {level} • Mago das Finanças</Text>
                    </View>
                    
                    <TouchableOpacity 
                        style={style.profileImageContainer} 
                        onPress={() => navigation.navigate('Perfil')}
                        activeOpacity={0.8}
                    >
                        {profilePic ? (
                            <Image 
                                source={getProfileSource()} 
                                style={style.profileImage} 
                            />
                        ) : (
                            <FontAwesome5 name="user-ninja" size={24} color={COLORS.primary} />
                        )}
                    </TouchableOpacity>
                </View>

                {/* --- XP BAR --- */}
                <View style={style.xpContainer}>
                    <View style={style.xpHeader}>
                        <Text style={style.xpLabel}>XP {xp} / {nextLevelXp}</Text>
                        <Text style={style.xpPercent}>{progress.toFixed(0)}%</Text>
                    </View>
                    <View style={style.xpBarBackground}>
                        <LinearGradient
                            colors={[COLORS.primary, '#D946EF']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={[style.xpBarFill, { width: `${progress}%` }]}
                        />
                    </View>
                </View>

                {/* --- CARD DE SALDO (ROXO) --- */}
                <LinearGradient
                    colors={['#111111', '#111111']} 
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={style.balanceCard}
                >
                    <View style={style.balanceHeader}>
                        <Text style={style.balanceLabel}>Saldo Total</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Extrato')}>
                            <Feather name="more-horizontal" size={20} color="rgba(255,255,255,0.5)" />
                        </TouchableOpacity>
                    </View>
                    
                    <Text style={style.balanceValue}>{formatCurrency(balance)}</Text>
                    
                    <View style={style.balanceRow}>
                        {/* Mini Card Entradas */}
                        <View style={style.miniStatCard}>
                            <View style={style.statIconContainer}>
                                <Feather name="arrow-up" size={18} color="#4ADE80" />
                            </View>
                            <View>
                                <Text style={style.statLabel}>Entradas</Text>
                                <Text style={style.statValue}>{formatCurrency(income)}</Text>
                            </View>
                        </View>

                        {/* Mini Card Saídas */}
                        <View style={style.miniStatCard}>
                            <View style={style.statIconContainer}>
                                <Feather name="arrow-down" size={18} color="#F87171" />
                            </View>
                            <View>
                                <Text style={style.statLabel}>Saídas</Text>
                                <Text style={style.statValue}>{formatCurrency(expense)}</Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>

                {/* --- ACESSO RÁPIDO (GRID) --- */}
                <Text style={style.sectionTitle}>Acesso Rápido</Text>
                <View style={style.shortcutsGrid}>
                    <TouchableOpacity style={style.shortcutItem} onPress={() => navigation.navigate('Relatorio')}>
                        <View style={[style.shortcutIcon, { backgroundColor: '#3B82F6' }]}>
                            <FontAwesome5 name="chart-pie" size={20} color="#FFF" />
                        </View>
                        <Text style={style.shortcutLabel}>Análise</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.shortcutItem} onPress={() => navigation.navigate('Metas')}>
                        <View style={[style.shortcutIcon, { backgroundColor: '#F59E0B' }]}>
                            <FontAwesome5 name="bullseye" size={20} color="#FFF" />
                        </View>
                        <Text style={style.shortcutLabel}>Metas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.shortcutItem} onPress={() => navigation.navigate('Desafios')}>
                        <View style={[style.shortcutIcon, { backgroundColor: '#EC4899' }]}>
                            <FontAwesome5 name="gift" size={20} color="#FFF" />
                        </View>
                        <Text style={style.shortcutLabel}>Quests</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={style.shortcutItem} onPress={() => navigation.navigate('Perfil')}>
                        <View style={[style.shortcutIcon, { backgroundColor: '#8B5CF6' }]}>
                            <FontAwesome5 name="cog" size={20} color="#FFF" />
                        </View>
                        <Text style={style.shortcutLabel}>Perfil</Text>
                    </TouchableOpacity>
                </View>

                {/* --- DICA --- */}
                <Text style={style.sectionTitle}>Dica do Mestre</Text>
                <View style={style.tipCard}>
                    <FontAwesome5 name="lightbulb" size={24} color="#F59E0B" />
                    <Text style={style.tipText}>
                        Manter seu saldo positivo no final do mês garante XP bônus para subir de nível!
                    </Text>
                </View>

            </ScrollView>

            <FloatingMenu currentRoute="Home" />
        </View>
    );
}