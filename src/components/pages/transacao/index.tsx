import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    ScrollView, 
    KeyboardAvoidingView, 
    Platform, 
    Alert,
    ActivityIndicator,
    Keyboard
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { style, COLORS } from './style';
import { FontAwesome } from '@expo/vector-icons';
import FloatingMenu from '../../menuFlutuante/menuFlutuante';
import api from '../../../services/api';

type ParamList = {
    TransactionForm: {
        transactionToEdit?: {
            id: number;
            type: 'DESPESA' | 'RECEITA';
            amount: number;
            description: string;
            date: string;
        };
    };
};

export default function Transacao() {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<ParamList, 'TransactionForm'>>();
    const transactionToEdit = route.params?.transactionToEdit;
    const isEditing = !!transactionToEdit;

    // Estados
    const [type, setType] = useState<'DESPESA' | 'RECEITA'>('DESPESA');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);

    // Carregar dados na edição
    useEffect(() => {
        if (transactionToEdit) {
            setType(transactionToEdit.type);
            // Formata o valor numérico para string BR (ex: 12.50 -> "12,50")
            setAmount(transactionToEdit.amount.toFixed(2).replace('.', ','));
            setDescription(transactionToEdit.description);
            // Cria a data ajustando o fuso horário para não exibir o dia anterior errado
            const parts = transactionToEdit.date.split('-'); // ["2023", "10", "25"]
            const localDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
            setDate(localDate);
        }
    }, [transactionToEdit]);

    // Função para pegar a data local YYYY-MM-DD (Evita erro de fuso horário)
    const getLocalDateISO = (dateObj: Date) => {
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    async function handleSave() {
        Keyboard.dismiss();

        if (!amount || !description) {
            return Alert.alert("Atenção", "Preencha o valor e a descrição.");
        }

        // 1. Converter "1.200,50" para float 1200.50
        const cleanAmount = amount.replace(/\./g, '').replace(',', '.');
        const numericAmount = parseFloat(cleanAmount);

        if (isNaN(numericAmount) || numericAmount <= 0) {
            return Alert.alert("Valor Inválido", "O valor deve ser maior que zero.");
        }

        // 2. Montar Payload
        const payload = {
            description: description.trim(),
            amount: numericAmount,
            type: type,
            date: getLocalDateISO(date) // Usa a função segura de data
        };

        try {
            setIsLoading(true);

            if (isEditing && transactionToEdit) {
                await api.put(`/api/transactions/${transactionToEdit.id}`, payload);
                Toast.show({ type: 'success', text1: 'Atualizado!', text2: 'Transação editada com sucesso.' });
            } else {
                await api.post('/api/transactions', payload);
                Toast.show({ type: 'success', text1: 'Sucesso!', text2: 'Nova transação registrada.' });
            }

            // Voltar para Home após 1 segundo
            setTimeout(() => navigation.goBack(), 1000);

        } catch (error: any) {
            console.log("Erro ao salvar:", error);
            const serverMessage = error.response?.data?.message;
            
            // Tratamento específico de validação (ex: data futura)
            if (error.response?.status === 400 && error.response?.data?.errors) {
                const firstError = Object.values(error.response.data.errors)[0];
                Alert.alert("Erro de Validação", String(firstError));
            } else {
                Alert.alert("Erro", serverMessage || "Não foi possível salvar a transação.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    function handleDelete() {
        if (!transactionToEdit) return;

        Alert.alert("Excluir", "Deseja realmente apagar esta transação?", [
            { text: "Cancelar", style: "cancel" },
            { 
                text: "Excluir", 
                style: "destructive", 
                onPress: async () => {
                    try {
                        setIsLoading(true);
                        await api.delete(`/api/transactions/${transactionToEdit.id}`);
                        Toast.show({ type: 'success', text1: 'Removido', text2: 'Transação excluída.' });
                        setTimeout(() => navigation.goBack(), 1000);
                    } catch (error) {
                        Alert.alert("Erro", "Não foi possível excluir.");
                        setIsLoading(false);
                    }
                } 
            }
        ]);
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={style.container}
        >
            <ScrollView contentContainerStyle={style.contentContainer} keyboardShouldPersistTaps="handled">
                <Text style={style.pageTitle}>
                    {isEditing ? "Editar Transação" : "Nova Transação"}
                </Text>

                {/* Seletor de Tipo */}
                <View style={style.typeSelector}>
                    <TouchableOpacity 
                        style={[style.typeButton, type === 'RECEITA' && style.activeIncomeButton]} 
                        onPress={() => setType('RECEITA')}
                        activeOpacity={0.7}
                    >
                        <Text style={[style.typeButtonText, type === 'RECEITA' && style.activeIncomeText]}>Receita</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[style.typeButton, type === 'DESPESA' && style.activeExpenseButton]} 
                        onPress={() => setType('DESPESA')}
                        activeOpacity={0.7}
                    >
                        <Text style={[style.typeButtonText, type === 'DESPESA' && style.activeExpenseText]}>Despesa</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.formCard}>
                    {/* Valor */}
                    <View style={style.inputGroup}>
                        <Text style={style.label}>Valor (R$)</Text>
                        <View style={style.inputContainer}>
                            <TextInput
                                style={[style.input, style.inputValue, { color: type === 'RECEITA' ? COLORS.income : COLORS.expense }]}
                                placeholder="0,00"
                                placeholderTextColor={COLORS.textSecondary}
                                keyboardType="numeric"
                                value={amount}
                                onChangeText={setAmount}
                            />
                        </View>
                    </View>

                    {/* Descrição */}
                    <View style={style.inputGroup}>
                        <Text style={style.label}>Descrição</Text>
                        <View style={style.inputContainer}>
                            <TextInput
                                style={style.input}
                                placeholder="Ex: Mercado, Salário..."
                                placeholderTextColor={COLORS.textSecondary}
                                value={description}
                                onChangeText={setDescription}
                            />
                        </View>
                    </View>

                    {/* Data Fixa (Hoje) */}
                    <View style={style.inputGroup}>
                        <Text style={style.label}>Data</Text>
                        <View style={style.selector}>
                            <Text style={style.selectorText}>{date.toLocaleDateString('pt-BR')}</Text>
                            <FontAwesome name="calendar" size={16} color={COLORS.textSecondary} />
                        </View>
                    </View>
                </View>

                {/* Botões */}
                <TouchableOpacity 
                    style={[style.saveButton, isLoading && { opacity: 0.7 }]} 
                    onPress={handleSave}
                    disabled={isLoading}
                >
                    {isLoading ? <ActivityIndicator color="#FFF" /> : <Text style={style.saveButtonText}>Salvar</Text>}
                </TouchableOpacity>

                {isEditing && (
                    <TouchableOpacity 
                        style={[style.deleteButton, isLoading && { opacity: 0.7 }]} 
                        onPress={handleDelete}
                        disabled={isLoading}
                    >
                        <Text style={style.deleteButtonText}>Excluir Transação</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
            
            <FloatingMenu currentRoute="Transacao" />
        </KeyboardAvoidingView>
    );
}