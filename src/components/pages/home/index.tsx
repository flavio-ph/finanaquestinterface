import React, { useContext, useState, useCallback } from 'react';
import { 
    View, Text, ScrollView, TouchableOpacity, Image 
} from 'react-native'; // <--- ADICIONADO "Image" AQUI
import { useFocusEffect, useNavigation, NavigationProp } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient'; 

import { style, COLORS } from './style'; 
import FloatingMenu from '../../menuFlutuante/menuFlutuante';
import { AuthContext } from '../../../services/authContext';
import api from '../../../services/api';

interface TransactionData {
    id: number;
    description: string;
    amount: number;
    type: 'RECEITA' | 'DESPESA';
    date: string;
}

// --- ATUALIZAÇÃO 1: Adicionar profilePicture na interface ---
interface UserProfile {
    name: string;
    level: number;
    experiencePoints: number;
    profilePicture?: string; // <--- NOVO CAMPO
}

export default function Home() {
    const navigation = useNavigation<NavigationProp<any>>();
    const { user } = useContext(AuthContext);

    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [transactions, setTransactions] = useState<TransactionData[]>([]);
    
    const [balance, setBalance] = useState(0);
    const [monthlyIncome, setMonthlyIncome] = useState(0);
    const [monthlyExpense, setMonthlyExpense] = useState(0);
    // const [loading, setLoading] = useState(true); // Opcional

    useFocusEffect(
        useCallback(() => {
            if (user?.id) {
                fetchData();
            }
        }, [user])
    );

    async function fetchData() {
        try {
            if (user?.id) {
                const userRes = await api.get(`/users/${user.id}`);
                setProfile(userRes.data);
            }

            const transRes = await api.get('/api/transactions');
            const list: TransactionData[] = transRes.data;

            let totalBalance = 0;
            let mIncome = 0;
            let mExpense = 0;
            
            const currentMonth = new Date().getMonth(); 
            const currentYear = new Date().getFullYear();

            const sortedList = list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

            sortedList.forEach(item => {
                const val = Number(item.amount);
                const itemDate = new Date(item.date);

                if (item.type === 'RECEITA') {
                    totalBalance += val;
                } else {
                    totalBalance -= val;
                }

                if (itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear) {
                    if (item.type === 'RECEITA') mIncome += val;
                    else mExpense += val;
                }
            });

            setTransactions(sortedList.slice(0, 5)); 
            setBalance(totalBalance);
            setMonthlyIncome(mIncome);
            setMonthlyExpense(mExpense);

        } catch (error) {
            console.log("Erro ao carregar Home:", error);
        }
    }

    function navegarPara(rota: string) {
        // @ts-ignore
        navigation.navigate(rota);
    }

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const currentLevel = profile?.level || user?.level || 1;
    const currentXP = profile?.experiencePoints || user?.experiencePoints || 0;
    
    const xpToNextLevel = currentLevel * 100;
    const progressPercent = Math.min((currentXP / xpToNextLevel) * 100, 100);

    const displayName = profile?.name || user?.name || "Visitante";
    
    // --- LÓGICA DA FOTO: Prioriza a da API (recente), senão usa a do Contexto ---
    const displayPhoto = profile?.profilePicture || user?.profilePicture;

    return (
        <View style={style.container}>
            <ScrollView contentContainerStyle={style.contentContainer} showsVerticalScrollIndicator={false}>
                
                {/* --- HEADER --- */}
                <View style={style.header}>
                    <View style={style.userProfile}>
                        <TouchableOpacity onPress={() => navegarPara('Perfil')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                             
                             {/* --- ATUALIZAÇÃO 2: Exibir a Imagem se existir --- */}
                             <View style={[style.avatarContainer, { overflow: 'hidden' }]}> 
                                {displayPhoto ? (
                                    <Image 
                                        source={{ uri: displayPhoto }} 
                                        style={{ width: '100%', height: '100%', borderRadius: 50 }} 
                                    />
                                ) : (
                                    <FontAwesome name="user" size={24} color={COLORS.primary} />
                                )}
                             </View>
                             {/* ------------------------------------------------ */}

                             <View style={style.greetingContainer}>
                                <Text style={style.welcomeText}>Bem-vindo de volta,</Text>
                                <Text style={style.userName}>
                                    {displayName.split(' ')[0]}
                                </Text>
                                <View style={style.userLevelBadge}>
                                    <Text style={style.userLevelText}>LVL {currentLevel}</Text>
                                </View>
                             </View>
                        </TouchableOpacity>
                    </View>

                    {/* Barra de XP */}
                    <TouchableOpacity style={style.xpContainer} onPress={() => navegarPara('Conquistas')} activeOpacity={0.7}>
                        <View style={style.xpLabelRow}>
                            <Text style={style.xpLabel}>RANK</Text>
                            <FontAwesome name="trophy" size={12} color={COLORS.secondary} />
                        </View>
                        <View style={style.xpTrack}>
                            <LinearGradient
                                colors={[COLORS.secondary, '#FFAB00']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={[style.xpFill, { width: `${progressPercent}%` }]}
                            />
                        </View>
                        <Text style={style.xpValue}>{currentXP} / {xpToNextLevel} XP</Text>
                    </TouchableOpacity>
                </View>

                {/* --- CARD DE SALDO --- */}
                <LinearGradient
                    colors={[COLORS.primary, '#311B92']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={style.balanceCard}
                >
                    <Text style={style.balanceLabel}>Saldo Total</Text>
                    <Text style={style.balanceAmount}>{formatCurrency(balance)}</Text>
                    
                    <View style={style.financeRow}>
                        <View style={style.financeItem}>
                            <View style={style.financeIconBox}>
                                <FontAwesome name="arrow-up" size={14} color={COLORS.accent} />
                            </View>
                            <View style={style.financeInfo}>
                                <Text style={style.financeLabel}>Entradas</Text>
                                <Text style={style.financeValue}>{formatCurrency(monthlyIncome)}</Text>
                            </View>
                        </View>

                        <View style={style.financeItem}>
                            <View style={style.financeIconBox}>
                                <FontAwesome name="arrow-down" size={14} color="#FF5252" />
                            </View>
                            <View style={style.financeInfo}>
                                <Text style={style.financeLabel}>Saídas</Text>
                                <Text style={style.financeValue}>{formatCurrency(monthlyExpense)}</Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>

                {/* --- QUEST ATIVA --- */}
                <View style={style.sectionHeader}>
                    <Text style={style.sectionTitle}>Desafios ativos</Text>
                    <TouchableOpacity style={style.seeAllButton} onPress={() => navegarPara('Desafios')}>
                        <Text style={style.seeAllText}>Ver todas</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={style.questCard} onPress={() => navegarPara('Desafios')} activeOpacity={0.8}>
                    <View style={style.questIconContainer}>
                         <FontAwesome name="shield" size={24} color={COLORS.primary} />
                    </View>
                    <View style={style.questContent}>
                        <Text style={style.questTitle}>Economia de Guerreiro</Text>
                        <Text style={style.questDesc}>Gaste menos de R$ 500 em Alimentação</Text>
                        
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                             <View style={{flex: 1, height: 6, backgroundColor: '#333', borderRadius: 3}}>
                                <View style={{width: '80%', height: '100%', backgroundColor: COLORS.accent, borderRadius: 3}} />
                             </View>
                             <Text style={{fontSize: 10, color: COLORS.accent, fontWeight: 'bold'}}>80%</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                {/* --- TRANSAÇÕES RECENTES --- */}
                <View style={style.sectionHeader}>
                    <Text style={style.sectionTitle}>Últimas Transações</Text>
                    <TouchableOpacity style={style.seeAllButton} onPress={() => navegarPara('Extrato')}>
                        <Text style={style.seeAllText}>Ver extrato</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={style.transactionList}>
                    {transactions.length === 0 ? (
                        <Text style={{color: COLORS.textSecondary, fontStyle: 'italic', padding: 10}}>
                            Nenhuma transação recente.
                        </Text>
                    ) : (
                        transactions.map((t) => (
                            <View key={t.id} style={style.transactionItem}>
                                <View style={[
                                    style.transactionIcon, 
                                    { backgroundColor: t.type === 'DESPESA' ? 'rgba(244, 67, 54, 0.1)' : 'rgba(76, 175, 80, 0.1)' }
                                ]}>
                                    <FontAwesome 
                                        name={t.type === 'DESPESA' ? "shopping-basket" : "money"} 
                                        size={18} 
                                        color={t.type === 'DESPESA' ? COLORS.expense : COLORS.income} 
                                    />
                                </View>
                                <View style={style.transInfo}>
                                    <Text style={style.transTitle}>{t.description}</Text>
                                    <Text style={style.transDate}>
                                        {new Date(t.date).toLocaleDateString('pt-BR')}
                                    </Text>
                                </View>
                                <Text style={[
                                    style.transAmount, 
                                    { color: t.type === 'DESPESA' ? COLORS.expense : COLORS.income }
                                ]}>
                                    {t.type === 'DESPESA' ? '- ' : '+ '} 
                                    {formatCurrency(t.amount)}
                                </Text>
                            </View>
                        ))
                    )}
                </View>

                {/* Espaço extra para o menu */}
                <View style={{ height: 130 }} />

            </ScrollView>

            <FloatingMenu currentRoute="Home" />
        </View>
    );
}