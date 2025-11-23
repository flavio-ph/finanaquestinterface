import { StyleSheet } from "react-native";

// --- Constantes de Design ---
export const COLORS = {
    primary: '#6A1B9A',      // Roxo
    secondary: '#FDD835',    // Amarelo
    background: '#121212',   // Fundo principal
    card: '#1E1E1E',         // Fundo dos cards
    textPrimary: '#FFFFFF',
    textSecondary: '#B0B0B0',
    inputBorder: '#333333',
    income: '#4CAF50',
    expense: '#F44336',
    danger: '#D32F2F',
    goalBlue: '#29B6F6',     // Nova cor para diferenciar Metas de XP
};
// ---------------------------------------------------

export const style = StyleSheet.create({
    container: {
        paddingTop: 24,
        flex: 1,
        backgroundColor: COLORS.background,
    },
    contentContainer: {
        padding: 16,
    },
    listContent: {
        padding: 16,
        paddingBottom: 80,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: 24,
        marginTop: 16,
        textAlign: 'center',
    },

    // --- Cards de Meta ---
    goalCard: {
        backgroundColor: COLORS.card,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
    },
    goalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    goalName: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.textPrimary,
    },
    goalPercentage: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.goalBlue,
    },
    
    // Barra de Progresso da Meta
    progressBarTrack: {
        height: 10,
        backgroundColor: '#333',
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 12,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: COLORS.goalBlue,
        borderRadius: 5,
    },
    
    goalFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    goalValues: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    currentValue: {
        color: COLORS.textPrimary,
        fontWeight: '600',
    },
    goalDeadline: {
        fontSize: 12,
        color: COLORS.textSecondary,
        fontStyle: 'italic',
    },

    // --- Estilos reutilizados do TransactionForm para GoalForm ---
    // (formCard, inputGroup, label, inputContainer, input, saveButton...)
    // Você pode reutilizar os mesmos nomes se estiverem no mesmo arquivo style.ts global,
    // ou copiar aqui se estiver separando por módulos.
    // Vou assumir que estão disponíveis ou você copiará do TransactionForm.
    // Adicionando apenas o que for específico se necessário.
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
    },
    deleteButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.danger,
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        backgroundColor: COLORS.primary,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
});