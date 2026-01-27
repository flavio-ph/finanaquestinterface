import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const COLORS = {
    background: "#0F0F11",
    card: "#18181B",
    primary: "#7C3AED", // Roxo Neon
    secondary: "#4C1D95",
    
    text: "#E4E4E7",
    textSecondary: "#A1A1AA",
    
    income: "#00E676", // Verde Neon
    expense: "#FF5252", // Vermelho Suave
    
    border: "#27272A"
};

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    contentContainer: {
        padding: 20,
        paddingTop: 60,
        paddingBottom: 130, // Espaço para o menu
    },

    // --- HEADER ---
    header: {
        marginBottom: 25,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: COLORS.text,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textSecondary,
        marginTop: 5,
    },

    // --- SELETOR DE MÊS ---
    monthSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.card,
        borderRadius: 16,
        padding: 10,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    monthButton: {
        padding: 10,
    },
    monthText: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },

    // --- RESUMO (CARDS) ---
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        gap: 15,
    },
    summaryCard: {
        flex: 1,
        backgroundColor: COLORS.card,
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: 'center',
        
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    summaryLabel: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginTop: 8,
        fontWeight: '600',
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 4,
    },

    // --- CONTAINER DO GRÁFICO ---
    chartSection: {
        backgroundColor: COLORS.card,
        borderRadius: 24,
        padding: 20,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: COLORS.border,
        overflow: 'hidden',
    },
    
    // Novo Header do Gráfico (Título + Botão Olho)
    chartHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    toggleButton: {
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 8,
    },
    toggleText: {
        color: COLORS.primary,
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 5,
    },

    // --- EMPTY STATE ---
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: 20,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: COLORS.border,
        marginTop: 10,
    },
    emptyText: {
        color: COLORS.textSecondary,
        marginTop: 10,
        fontSize: 14,
    }
});