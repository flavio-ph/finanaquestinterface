import { StyleSheet } from "react-native";

export const COLORS = {
    primary: '#6A1B9A',      // Roxo
    background: '#121212',   // Fundo principal
    card: '#1E1E1E',         // Fundo dos cards
    textPrimary: '#FFFFFF',
    textSecondary: '#B0B0B0',
    inputBorder: '#333333',
    income: '#4CAF50',       // Verde para Receita
    expense: '#F44336',      // Vermelho para Despesa
    danger: '#D32F2F',       // Para botão de excluir
};
// ---------------------------------------------------

export const style = StyleSheet.create({
    container: {
        paddingTop: 16,
        flex: 1,
        backgroundColor: COLORS.background,
        minHeight: '100%',
    },
    contentContainer: {
        padding: 16,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: 24,
        marginTop: 16,
        textAlign: 'center',
    },

    typeSelector: {
        flexDirection: 'row',
        marginBottom: 24,
        gap: 16,
    },
    typeButton: {
        flex: 1,
        height: 50,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        backgroundColor: COLORS.card,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    typeButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.textSecondary,
    },
    // Estados selecionados
    activeIncomeButton: {
        backgroundColor: 'rgba(76, 175, 80, 0.2)', // Verde translúcido
        borderColor: COLORS.income,
    },
    activeIncomeText: {
        color: COLORS.income,
    },
    activeExpenseButton: {
        backgroundColor: 'rgba(244, 67, 54, 0.2)', // Vermelho translúcido
        borderColor: COLORS.expense,
    },
    activeExpenseText: {
        color: COLORS.expense,
    },

    // --- Formulário ---
    formCard: {
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: 20,
        marginBottom: 24,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 8,
    },
    inputContainer: {
        height: 55,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        backgroundColor: COLORS.background,
        borderRadius: 10,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    input: {
        fontSize: 16,
        color: COLORS.textPrimary,
        height: '100%',
    },
    // Estilo específico para o valor (maior destaque)
    inputValue: {
        fontSize: 24,
        fontWeight: '700',
    },

    // --- Seletores (Data/Categoria) ---
    // Imitam inputs mas são tocáveis
    selector: {
        height: 55,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        backgroundColor: COLORS.background,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    selectorText: {
        fontSize: 16,
        color: COLORS.textPrimary,
    },
    placeholderText: {
        color: COLORS.textSecondary,
    },

    // --- Botões de Ação ---
    saveButton: {
        height: 55,
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    saveButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.textPrimary,
    },
    deleteButton: {
        height: 55,
        borderWidth: 1,
        borderColor: COLORS.danger,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    deleteButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.danger,
    },
});