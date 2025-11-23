import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    ScrollView, 
    KeyboardAvoidingView, 
    Platform, 
    Alert 
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { style, COLORS } from './style';
import { FontAwesome } from '@expo/vector-icons';
import FloatingMenu from '../../menuFlutuante/menuFlutuante';

type ParamList = {
    TransactionForm: {
        transactionToEdit?: {
            id: number;
            type: 'DESPESA' | 'RECEITA';
            amount: string;
            description: string;
            category: string;
            date: string;
        };
    };
};

export default function Transacao() {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<ParamList, 'TransactionForm'>>();
    const transactionToEdit = route.params?.transactionToEdit;

    const isEditing = !!transactionToEdit;

    // Estados do Formulário
    const [type, setType] = useState<'DESPESA' | 'RECEITA'>('DESPESA');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date()); // Usando objeto Date

    // Se estiver editando, preenche os campos na montagem
    useEffect(() => {
        if (transactionToEdit) {
            setType(transactionToEdit.type);
            setAmount(transactionToEdit.amount);
            setDescription(transactionToEdit.description);
            setCategory(transactionToEdit.category);
            setDate(new Date(transactionToEdit.date));
        }
    }, [transactionToEdit]);

    const handleSave = () => {
        if (!amount || !description || !category) {
            Alert.alert("Atenção", "Por favor, preencha todos os campos.");
            return;
        }

        const transactionData = {
            type,
            amount: parseFloat(amount.replace(',', '.')), // Tratamento básico de moeda
            description,
            category,
            date: date.toISOString().split('T')[0] // Formato YYYY-MM-DD
        };

        console.log("Salvando Transação:", transactionData);
        Alert.alert("Sucesso", isEditing ? "Transação atualizada!" : "Transação criada!");
        navigation.goBack();
    };

    const handleDelete = () => {
        Alert.alert(
            "Excluir Transação",
            "Tem certeza que deseja excluir esta transação?",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Excluir", 
                    style: "destructive", 
                    onPress: () => {
                        console.log("Deletando ID:", transactionToEdit?.id);
                        navigation.goBack();
                    } 
                }
            ]
        );
    };

    // Formatador de data simples para exibição
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('pt-BR');
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={style.container}
        >
            <ScrollView contentContainerStyle={style.contentContainer}>
                <Text style={style.pageTitle}>
                    {isEditing ? "Editar Transação" : "Nova Transação"}
                </Text>

                {/* Seletor de Tipo */}
                <View style={style.typeSelector}>
                    <TouchableOpacity 
                        style={[style.typeButton, type === 'RECEITA' && style.activeIncomeButton]} 
                        onPress={() => setType('RECEITA')}
                    >
                        {/* <FontAwesome name="arrow-up" size={16} color={type === 'RECEITA' ? COLORS.income : COLORS.textSecondary} /> */}
                        <Text style={[style.typeButtonText, type === 'RECEITA' && style.activeIncomeText]}>Receita</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[style.typeButton, type === 'DESPESA' && style.activeExpenseButton]} 
                        onPress={() => setType('DESPESA')}
                    >
                        {/* <FontAwesome name="arrow-down" size={16} color={type === 'DESPESA' ? COLORS.expense : COLORS.textSecondary} /> */}
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
                                placeholder="Ex: Almoço, Salário..."
                                placeholderTextColor={COLORS.textSecondary}
                                value={description}
                                onChangeText={setDescription}
                            />
                        </View>
                    </View>

                    {/* Categoria (Placeholder para um Modal/Picker real) */}
                    <View style={style.inputGroup}>
                        <Text style={style.label}>Categoria</Text>
                        <TouchableOpacity 
                            style={style.selector}
                            onPress={() => Alert.alert("Todo", "Abrir modal de seleção de categoria")}
                        >
                            <Text style={category ? style.selectorText : style.placeholderText}>
                                {category || "Selecione uma categoria"}
                            </Text>
                            <FontAwesome name="chevron-down" size={14} color={COLORS.textSecondary} />
                        </TouchableOpacity>
                    </View>

                     {/* Data (Placeholder para DateTimePicker real) */}
                     <View style={style.inputGroup}>
                        <Text style={style.label}>Data</Text>
                        <TouchableOpacity 
                            style={style.selector}
                            onPress={() => Alert.alert("Todo", "Abrir DateTimePicker")}
                        >
                            <Text style={style.selectorText}>
                                {formatDate(date)}
                            </Text>
                            <FontAwesome name="calendar" size={16} color={COLORS.textSecondary} />
                        </TouchableOpacity>
                    </View>
                    

                </View>

                {/* Botões de Ação */}
                <TouchableOpacity style={style.saveButton} onPress={handleSave}>
                    <Text style={style.saveButtonText}>Salvar</Text>
                </TouchableOpacity>

                {isEditing && (
                    <TouchableOpacity style={style.deleteButton} onPress={handleDelete}>
                        <Text style={style.deleteButtonText}>Excluir Transação</Text>
                    </TouchableOpacity>
                )}
                
                
            </ScrollView>
             <FloatingMenu currentRoute="Transacao" />
        </KeyboardAvoidingView>
       
    );
}