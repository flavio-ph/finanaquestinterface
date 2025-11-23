import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { style, COLORS } from './style'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { useNavigation, NavigationProp } from "@react-navigation/native";
// Importe o menu flutuante global
import FloatingMenu from '../../menuFlutuante/menuFlutuante';

export default function Home() {

    const userName = "Flávio";
    const userLevel = 12;
    const userXP = 70;
    const xpToNextLevel = 100;
    
    const navigation = useNavigation<NavigationProp<any>>();

    function navegarPara(rota: string) {
        // @ts-ignore
        navigation.navigate(rota);
    }

    return (
        <View style={style.container}>
            <ScrollView contentContainerStyle={style.contentContainer}>
                
                {/* HEADER */}
                <View style={style.header}>
                    <View style={style.userProfile}>
                        <TouchableOpacity onPress={() => navegarPara('Profile')} style={{ flexDirection: 'row', alignItems: 'center' }}>
                             <View style={style.fotoperfil}>
                                {/* Foto placeholder */}
                             </View>
                             <View style={style.nomeNivel}>
                                <Text style={style.welcomeText}>Olá, {userName}</Text>
                                <Text style={style.userLevel}>Nível {userLevel}</Text>
                             </View>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={style.xpStatus} onPress={() => navegarPara('Challenges')} activeOpacity={0.7}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                            <Text style={style.xpLabel}>Progresso (XP)</Text>
                            <FontAwesome name="trophy" size={12} color={COLORS.secondary} />
                        </View>
                        <View style={style.xpBarTrack}>
                            <View style={[style.xpBarFill, { width: `${(userXP / xpToNextLevel) * 100}%` }]} />
                        </View>
                        <Text style={style.xpValue}>{userXP} / {xpToNextLevel} XP</Text>
                    </TouchableOpacity>
                </View>

                {/* CONTEÚDO */}
                <View>
                    {/* Card Saldo */}
                    <View style={style.card}>
                        <Text style={style.cardTitle}>Saldo Atual</Text>
                        <Text style={style.balanceAmount}>R$ 4.320,50</Text>
                        <View style={style.financialOverview}>
                            <View style={style.overviewItem}>
                                <Text style={style.overviewLabel}>Receitas (Mês)</Text>
                                <Text style={[style.overviewAmount, style.incomeAmount]}>R$ 7.500,00</Text>
                            </View>
                            <View style={style.overviewItem}>
                                <Text style={style.overviewLabel}>Despesas (Mês)</Text>
                                <Text style={[style.overviewAmount, style.expenseAmount]}>R$ 3.179,50</Text>
                            </View>
                        </View>
                    </View>

                    {/* Card Desafios */}
                    <View style={style.card}>
                        <View style={style.cardHeader}>
                            <Text style={style.cardTitle}>Desafios Ativos</Text>
                            <TouchableOpacity style={style.seeAllButton} onPress={() => navegarPara('Challenges')}>
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
                        
                        <View style={style.transactionItem}>
                            <View style={[style.transactionIconContainer, style.expenseIconBg]}>
                                <FontAwesome name="cutlery" size={18} color={COLORS.expense} />
                            </View>
                            <View style={style.transactionDetails}>
                                <Text style={style.transactionDescription}>iFood</Text>
                                <Text style={style.transactionCategory}>Alimentação</Text>
                            </View>
                            <Text style={[style.transactionAmount, { color: COLORS.expense }]}>- R$ 89,90</Text>
                        </View>
                         <View style={style.transactionItem}>
                            <View style={[style.transactionIconContainer, style.incomeIconBg]}>
                                <FontAwesome name="dollar" size={18} color={COLORS.income} />
                            </View>
                            <View style={style.transactionDetails}>
                                <Text style={style.transactionDescription}>Salário</Text>
                                <Text style={style.transactionCategory}>Receita Fixa</Text>
                            </View>
                            <Text style={[style.transactionAmount, { color: COLORS.income }]}>+ R$ 7.500,00</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <FloatingMenu currentRoute="Home" />

        </View>
    );
}