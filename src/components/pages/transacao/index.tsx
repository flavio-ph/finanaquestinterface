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
            amount: number; // Backend manda number
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

    // Preenche dados se for Edição
    useEffect(() => {
        if (transactionToEdit) {
            setType(transactionToEdit.type);
            setAmount(String(transactionToEdit.amount)); // Converte number para string pro input
            setDescription(transactionToEdit.description);
            // Corrige o fuso horário ou usa a string direta YYYY-MM-DD
            if (transactionToEdit.date) {
                setDate(new Date(transactionToEdit.date));
            }
        }
    }, [transactionToEdit]);

    async function handleSave() {
        Keyboard.dismiss();

        if (!amount || !description) {
            return Alert.alert("Atenção", "Preencha o valor e a descrição.");
        }

        // Formatação do valor (troca vírgula por ponto)
        const cleanAmount = amount.replace(/\./g, '').replace(',', '.');
        const numericAmount = parseFloat(cleanAmount);

        if (isNaN(numericAmount) || numericAmount <= 0) {
            return Alert.alert("Erro", "Valor inválido.");
        }

        const payload = {
            description,
            amount: numericAmount,
            type,
            date: date.toISOString().split('T')[0] // YYYY-MM-DD
        };

        try {
            setIsLoading(true);

            if (isEditing && transactionToEdit) {
                // EDITAR (PUT)
                await api.put(`/api/transactions/${transactionToEdit.id}`, payload);
                Toast.show({ type: 'success', text1: 'Atualizado!', text2: 'Transação alterada com sucesso.' });
            } else {
                // CRIAR (POST)
                await api.post('/api/transactions', payload);
                Toast.show({ type: 'success', text1: 'Sucesso!', text2: 'Nova transação salva.' });
            }

            // Voltar após delay
            setTimeout(() => navigation.goBack(), 1000);

        } catch (error: any) {
            console.log("Erro ao salvar:", error);
            const msg = error.response?.data?.message || "Não foi possível salvar.";
            Alert.alert("Erro", msg);
        } finally {
            setIsLoading(false);
        }
    };

    function handleDelete() {
        if (!transactionToEdit) return;

        Alert.alert(
            "Excluir",
            "Tem certeza que deseja apagar esta transação?",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Excluir", 
                    style: "destructive", 
                    onPress: async () => {
                        try {
                            setIsLoading(true);
                            await api.delete(`/api/transactions/${transactionToEdit.id}`);
                            Toast.show({ type: 'success', text1: 'Apagada', text2: 'Transação removida.' });
                            setTimeout(() => navigation.goBack(), 1000);
                        } catch (error) {
                            Alert.alert("Erro", "Não foi possível excluir.");
                            setIsLoading(false);
                        }
                    } 
                }
            ]
        );
    };

    const formatDate = (d: Date) => d.toLocaleDateString('pt-BR');

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

                    {/* Data (Simples, usa data atual) */}
                    <View style={style.inputGroup}>
                        <Text style={style.label}>Data</Text>
                        <TouchableOpacity style={style.selector}>
                            <Text style={style.selectorText}>{formatDate(date)}</Text>
                            <FontAwesome name="calendar" size={16} color={COLORS.textSecondary} />
                        </TouchableOpacity>
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