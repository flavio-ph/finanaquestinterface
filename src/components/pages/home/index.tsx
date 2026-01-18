import React, { useContext, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect, useNavigation, NavigationProp } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons'; 

import { style, COLORS } from './style'; 
import FloatingMenu from '../../menuFlutuante/menuFlutuante';
import { AuthContext } from '../../../services/authContext';
import api from '../../../services/api';

// Definição dos tipos vindos da API
interface TransactionData {
    id: number;
    description: string;
    amount: number;
    type: 'RECEITA' | 'DESPESA';
    date: string;
}

interface UserProfile {
    name: string;
    level: number;
    experiencePoints: number;
}

export default function Home() {
    const navigation = useNavigation<NavigationProp<any>>();
    const { user } = useContext(AuthContext); // Pega o ID do utilizador logado

    // Estados para armazenar dados da API
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [transactions, setTransactions] = useState<TransactionData[]>([]);
    
    // Estados calculados
    const [balance, setBalance] = useState(0);
    const [monthlyIncome, setMonthlyIncome] = useState(0);
    const [monthlyExpense, setMonthlyExpense] = useState(0);
    const [loading, setLoading] = useState(true);

    // useFocusEffect: Recarrega os dados sempre que a tela ganha foco (ex: voltou de "Nova Transação")
    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    async function fetchData() {
        try {
            setLoading(true);

            // 1. Busca dados frescos do utilizador (XP e Nível atualizados)
            if (user?.id) {
                const userRes = await api.get(`/users/${user.id}`);
                setProfile(userRes.data);
            }

            // 2. Busca todas as transações
            const transRes = await api.get('/api/transactions');
            const list: TransactionData[] = transRes.data;

            // 3. Cálculos Financeiros (Saldo Total e Resumo do Mês)
            let totalBalance = 0;
            let mIncome = 0;
            let mExpense = 0;
            
            const currentMonth = new Date().getMonth(); // 0 = Janeiro, 1 = Fevereiro...
            const currentYear = new Date().getFullYear();

            // Ordena transações: Mais recentes primeiro
            const sortedList = list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

            sortedList.forEach(item => {
                const val = Number(item.amount);
                const itemDate = new Date(item.date);

                // Cálculo do Saldo Geral
                if (item.type === 'RECEITA') {
                    totalBalance += val;
                } else {
                    totalBalance -= val;
                }

                // Cálculo do Mês Atual
                if (itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear) {
                    if (item.type === 'RECEITA') {
                        mIncome += val;
                    } else {
                        mExpense += val;
                    }
                }
            });

            setTransactions(sortedList.slice(0, 5)); // Pega apenas as 5 últimas para exibir
            setBalance(totalBalance);
            setMonthlyIncome(mIncome);
            setMonthlyExpense(mExpense);

        } catch (error) {
            console.log("Erro ao carregar Home:", error);
            // Opcional: Toast de erro
        } finally {
            setLoading(false);
        }
    }

    function navegarPara(rota: string) {
        // @ts-ignore
        navigation.navigate(rota);
    }

    // Função auxiliar para formatar dinheiro
    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    // Cálculos de XP (Exemplo: 100 * Nível)
    const xpToNextLevel = (profile?.level || 1) * 100;
    const currentXP = profile?.experiencePoints || 0;
    const progressPercent = Math.min((currentXP / xpToNextLevel) * 100, 100);

    if (loading && !profile) {
        return (
            <View style={[style.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <View style={style.container}>
            <ScrollView contentContainerStyle={style.contentContainer}>
                
                {/* HEADER */}
                <View style={style.header}>
                    <View style={style.userProfile}>
                        <TouchableOpacity onPress={() => navegarPara('Perfil')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                             <View style={style.fotoperfil}>
                                {/* Placeholder ou Imagem real se tiver no futuro */}
                                <FontAwesome name="user-circle" size={36} color={COLORS.textSecondary} />
                             </View>
                             <View style={style.nomeNivel}>
                                <Text style={style.welcomeText}>Olá, {profile?.name.split(' ')[0]}</Text>
                                <Text style={style.userLevel}>Nível {profile?.level}</Text>
                             </View>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={style.xpStatus} onPress={() => navegarPara('Conquistas')} activeOpacity={0.7}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                            <Text style={style.xpLabel}>Progresso (XP)</Text>
                            <FontAwesome name="trophy" size={12} color={COLORS.secondary} />
                        </View>
                        <View style={style.xpBarTrack}>
                            <View style={[style.xpBarFill, { width: `${progressPercent}%` }]} />
                        </View>
                        <Text style={style.xpValue}>{currentXP} / {xpToNextLevel} XP</Text>
                    </TouchableOpacity>
                </View>

                {/* CONTEÚDO */}
                <View>
                    {/* Card Saldo */}
                    <View style={style.card}>
                        <Text style={style.cardTitle}>Saldo Atual</Text>
                        <Text style={style.balanceAmount}>{formatCurrency(balance)}</Text>
                        <View style={style.financialOverview}>
                            <View style={style.overviewItem}>
                                <Text style={style.overviewLabel}>Receitas (Mês)</Text>
                                <Text style={[style.overviewAmount, style.incomeAmount]}>
                                    {formatCurrency(monthlyIncome)}
                                </Text>
                            </View>
                            <View style={style.overviewItem}>
                                <Text style={style.overviewLabel}>Despesas (Mês)</Text>
                                <Text style={[style.overviewAmount, style.expenseAmount]}>
                                    {formatCurrency(monthlyExpense)}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Card Desafios (Mantido estático por enquanto, pois não há endpoint no controller) */}
                    <View style={style.card}>
                        <View style={style.cardHeader}>
                            <Text style={style.cardTitle}>Desafios Ativos</Text>
                            <TouchableOpacity style={style.seeAllButton} onPress={() => navegarPara('Desafios')}>
                                <Text style={style.seeAllText}>Ver todos</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={style.challengeItem}>
                            <FontAwesome name="shopping-cart" size={24} color={COLORS.primary} style={style.challengeIcon} />
                            <View style={style.challengeDetails}>
                                <Text style={style.challengeDescription}>Gastar menos de R$ 500 em "Alimentação"</Text>
                                <View style={style.challengeProgressBar}>
                                    <View style={[style.challengeProgressFill, { width: '80%' }]} />
                                </View>
                                <Text style={style.challengeStatus}>R$ 400,00 / R$ 500,00</Text>
                            </View>
                        </View>
                    </View>

                    {/* Card Transações */}
                    <View style={style.card}>
                        <View style={style.cardHeader}>
                            <Text style={style.cardTitle}>Transações Recentes</Text>
                            <TouchableOpacity style={style.seeAllButton} onPress={() => navegarPara('Extrato')}>
                                <Text style={style.seeAllText}>Ver extrato</Text>
                            </TouchableOpacity>
                        </View>
                        
                        {transactions.length === 0 ? (
                            <Text style={{color: COLORS.textSecondary, fontStyle: 'italic', padding: 10}}>
                                Nenhuma transação recente.
                            </Text>
                        ) : (
                            transactions.map((t) => (
                                <View key={t.id} style={style.transactionItem}>
                                    <View style={[
                                        style.transactionIconContainer, 
                                        t.type === 'DESPESA' ? style.expenseIconBg : style.incomeIconBg
                                    ]}>
                                        <FontAwesome 
                                            name={t.type === 'DESPESA' ? "cutlery" : "dollar"} 
                                            size={18} 
                                            color={t.type === 'DESPESA' ? COLORS.expense : COLORS.income} 
                                        />
                                    </View>
                                    <View style={style.transactionDetails}>
                                        <Text style={style.transactionDescription}>{t.description}</Text>
                                        <Text style={style.transactionCategory}>
                                            {new Date(t.date).toLocaleDateString('pt-BR')}
                                        </Text>
                                    </View>
                                    <Text style={[
                                        style.transactionAmount, 
                                        { color: t.type === 'DESPESA' ? COLORS.expense : COLORS.income }
                                    ]}>
                                        {t.type === 'DESPESA' ? '- ' : '+ '} 
                                        {formatCurrency(t.amount)}
                                    </Text>
                                </View>
                            ))
                        )}
                    </View>
                </View>
            </ScrollView>

            <FloatingMenu currentRoute="Home" />

        </View>
    );
}