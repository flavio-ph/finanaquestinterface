import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export const COLORS = {
    background: "#0F0F11",
    card: "#18181B",
    primary: "#7C3AED", // Roxo Neon
    secondary: "#4C1D95",
    
    income: "#00E676", // Verde Neon
    expense: "#FF5252", // Vermelho Suave
    
    text: "#E4E4E7",
    textSecondary: "#A1A1AA",
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
        paddingBottom: 130, // Espaço para menu flutuante
    },

    // --- HEADER ---
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: COLORS.text,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textSecondary,
        marginTop: 5,
    },

    // --- SELETOR DE MÊS (HUD STYLE) ---
    monthSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.card,
        borderRadius: 16,
        padding: 8,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    monthButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    monthText: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        letterSpacing: 0.5,
    },

    // --- RESUMO DO MÊS (BALANÇO) ---
    summaryRow: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 30,
    },
    summaryCard: {
        flex: 1,
        backgroundColor: COLORS.card,
        borderRadius: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: COLORS.border,
        flexDirection: 'row',
        alignItems: 'center',
        // Sombra leve
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    summaryIconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    summaryLabel: {
        fontSize: 10,
        color: COLORS.textSecondary,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.text,
        marginTop: 2,
    },

    // --- LISTA DE TRANSAÇÕES ---
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textSecondary,
        marginBottom: 15,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    transactionCard: {
        backgroundColor: COLORS.card,
        borderRadius: 18,
        padding: 15,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    tIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    tContent: {
        flex: 1,
    },
    tTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    tDate: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },
    tAmount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    
    // Empty State
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        opacity: 0.6,
    },
    emptyText: {
        color: COLORS.textSecondary,
        fontSize: 14,
        marginTop: 10,
    }
});