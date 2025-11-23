import { StyleSheet, Dimensions } from "react-native";

// --- Constantes de Design ---
export const COLORS = {
    primary: '#6A1B9A',      // Roxo
    secondary: '#FDD835',    // Amarelo
    background: '#121212',   // Fundo principal
    card: '#1E1E1E',         // Fundo dos cards
    textPrimary: '#FFFFFF',
    textSecondary: '#B0B0B0',
    inputBorder: '#333333',
    income: '#4CAF50',       // Verde
    expense: '#F44336',      // Vermelho
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
        paddingBottom: 40,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: 24,
        marginTop: 16,
        textAlign: 'left',
        borderBottomColor: COLORS.primary,
        borderTopColor: COLORS.background,
        borderLeftColor: COLORS.background,
        borderRightColor: COLORS.background,
        borderWidth: 1,
       

    },

    monthSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 0, 
        marginBottom: 24,
    },
    monthNavButton: {
        padding: 8,
    },
    monthLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.textPrimary,
    },

    summaryContainer: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 24,
    },
    summaryCard: {
        flex: 1,
        backgroundColor: COLORS.card,
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        // Opcional: Sombra sutil mesmo no dark mode para destacar
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    summaryLabel: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 8,
        marginTop: 8,
    },
    summaryValue: {
        fontSize: 20,
        fontWeight: '700',
    },

    // --- Seções de Gráfico (Específico de Relatórios) ---
    chartSection: {
        backgroundColor: COLORS.card,
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        alignItems: 'center',
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginBottom: 24,
        alignSelf: 'flex-start', // Alinha o título à esquerda dentro do card
        marginLeft: 8,
    },
});