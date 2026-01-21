import { StyleSheet } from "react-native";

export const COLORS = {
    primary: '#6A1B9A',      
    background: '#121212',   
    card: '#1E1E1E',         
    textPrimary: '#FFFFFF',
    textSecondary: '#B0B0B0',
    income: '#4CAF50',       
    expense: '#F44336',      
};

export const style = StyleSheet.create({
    container: {
        paddingTop: 16,
        flex: 1,
        backgroundColor: COLORS.background,
    },
    contentContainer: {
        padding: 16,
        paddingBottom: 80, // Espaço extra para o menu flutuante não tapar o último item
    },
    
    // Título
    pageTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: 24,
        marginTop: 16,
        textAlign: 'center',
    },

    // Navegação de Mês
    monthSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: 12,
        marginBottom: 20,
    },
    monthNavButton: {
        padding: 10,
    },
    monthLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.textPrimary,
        textTransform: 'capitalize',
    },

    // Resumo do Mês (Opcional)
    monthSummary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    summaryText: {
        color: COLORS.textSecondary,
        fontSize: 14,
    },
    summaryValue: {
        color: COLORS.textPrimary,
        fontWeight: 'bold',
        fontSize: 14,
    },

    // Lista de Transações
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.card,
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    transactionIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    incomeIconBg: {
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
    },
    expenseIconBg: {
        backgroundColor: 'rgba(244, 67, 54, 0.1)',
    },
    transactionDetails: {
        flex: 1,
    },
    transactionDescription: {
        fontSize: 16,
        color: COLORS.textPrimary,
        fontWeight: '500',
    },
    transactionDate: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginTop: 4,
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    
    // Estado Vazio
    emptyState: {
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        color: COLORS.textSecondary,
        marginTop: 10,
        fontStyle: 'italic',
    }
});