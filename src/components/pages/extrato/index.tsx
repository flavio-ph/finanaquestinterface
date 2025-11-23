import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { style, COLORS } from './style';
import { FontAwesome } from '@expo/vector-icons';
import FloatingMenu from '../../menuFlutuante/menuFlutuante';


type Transaction = {
    id: string;
    description: string;
    amount: number;
    type: 'RECEITA' | 'DESPESA';
    category: string;
    date: string; 
};

const MOCK_DATA: Transaction[] = [
    { id: '1', description: 'Salário', amount: 5000, type: 'RECEITA', category: 'Renda Fixa', date: '2025-10-05' },
    { id: '2', description: 'Aluguel', amount: 1200, type: 'DESPESA', category: 'Moradia', date: '2025-10-10' },
    { id: '3', description: 'Supermercado', amount: 450.50, type: 'DESPESA', category: 'Alimentação', date: '2025-10-12' },
    { id: '4', description: 'Freelance', amount: 800, type: 'RECEITA', category: 'Renda Extra', date: '2025-10-15' },
    { id: '5', description: 'Cinema', amount: 120, type: 'DESPESA', category: 'Lazer', date: '2025-10-20' },
];

type FilterType = 'TODOS' | 'RECEITA' | 'DESPESA';

export default function Extrato() {
    const navigation = useNavigation<any>();
    const [activeFilter, setActiveFilter] = useState<FilterType>('TODOS');
    const [currentMonth, setCurrentMonth] = useState(new Date()); // Mês atual


    // Função para formatar moeda
    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    // Função para formatar data curta (DD/MM)
    const formatDateShort = (dateString: string) => {
        const date = new Date(dateString);
        return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;
    };

    // Lógica de Filtro (Mock)
    const filteredData = MOCK_DATA.filter(item => {
        if (activeFilter === 'TODOS') return true;
        return item.type === activeFilter;
    });

    // Renderização de cada item da lista
    const renderItem = ({ item }: { item: Transaction }) => {
        const isIncome = item.type === 'RECEITA';
        const iconName = isIncome ? 'dollar' : 'tag'; // Ícones simples por enquanto
        const iconColor = isIncome ? COLORS.income : COLORS.expense;
        const iconBg = isIncome ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)';

        return (
            <TouchableOpacity 
                style={style.transactionCard} 
                onPress={() => navigation.navigate('TransactionForm', { transactionToEdit: item })}
            >
                <View style={[style.iconContainer, { backgroundColor: iconBg }]}>
                    <FontAwesome name={iconName} size={16} color={iconColor} />
                </View>
                <View style={style.detailsContainer}>
                    <Text style={style.description}>{item.description}</Text>
                    <Text style={style.category}>{item.category}</Text>
                </View>
                <View style={style.amountContainer}>
                    <Text style={[style.amount, { color: iconColor }]}>
                        {isIncome ? '+ ' : '- '}{formatCurrency(item.amount)}
                    </Text>
                    <Text style={style.dateText}>{formatDateShort(item.date)}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={style.container}>
            
            {/* Seletor de Mês */}
            <View style={style.monthSelector}>
                <TouchableOpacity style={style.monthNavButton} onPress={() => Alert.alert("Info", "Mês anterior")}>
                    <FontAwesome name="chevron-left" size={16} color={COLORS.primary} />
                </TouchableOpacity>
                <Text style={style.monthLabel}>Outubro 2025</Text>
                <TouchableOpacity style={style.monthNavButton} onPress={() => Alert.alert("Info", "Próximo mês")}>
                    <FontAwesome name="chevron-right" size={16} color={COLORS.primary} />
                </TouchableOpacity>
            </View>

            {/* Filtros Rápidos */}
            <View style={style.filterContainer}>
                {/* Usando FlatList horizontal para os filtros se houver muitos */}
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={['TODOS', 'RECEITA', 'DESPESA'] as FilterType[]}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={[style.filterChip, activeFilter === item && style.filterChipActive]}
                            onPress={() => setActiveFilter(item)}
                        >
                            <Text style={[style.filterLabel, activeFilter === item && style.filterLabelActive]}>
                                {item === 'TODOS' ? 'Todos' : item === 'RECEITA' ? 'Receitas' : 'Despesas'}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            {/* Lista de Transações */}
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={style.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <View style={{ alignItems: 'center', marginTop: 50 }}>
                        <Text style={{ color: COLORS.textSecondary }}>Nenhuma transação encontrada.</Text>
                    </View>
                    
                )}
               
            />
              <FloatingMenu currentRoute="Extrato" />
        </View>
    );
}