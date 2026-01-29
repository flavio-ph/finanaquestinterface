import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export const COLORS = {
    background: "#0F0F11",
    card: "#18181B",
    primary: "#7C3AED", 
    secondary: "#4C1D95", 
    
    income: "#00E676",
    expense: "#FF5252",
    
    text: "#E4E4E7",
    textSecondary: "#A1A1AA",
};

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        position: 'relative',
    },
    contentContainer: {
        padding: 20,
        paddingTop: 60,
        paddingBottom: 130, 
    },

    // --- Header ---
    header: { marginBottom: 25 }, // Margem menor
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: COLORS.text,
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textSecondary,
        marginTop: 5,
    },

    // --- Cards de Resumo (Compactos) ---
    summaryGrid: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 25,
    },
    summaryCard: {
        flex: 1,
        borderRadius: 18, // Arredondamento levemente menor
        padding: 15,      // <--- MENOS PADDING (Reduz Altura)
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)', // Borda mais visível para o vidro
    },
    summaryIcon: {
        width: 32,        // <--- ÍCONE MENOR
        height: 32,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,  // <--- MENOS ESPAÇO
    },
    summaryLabel: { 
        fontSize: 11, 
        color: COLORS.textSecondary, 
        marginBottom: 2, 
        textTransform: 'uppercase', 
        fontWeight: '600' 
    },
    summaryValue: { 
        fontSize: 18,     // <--- FONTE MENOR
        fontWeight: 'bold', 
        color: '#FFF' 
    },

    // --- Toggle ---
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: '#1E1E22',
        borderRadius: 12,
        padding: 3,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 10,
    },
    toggleButtonActive: {
        backgroundColor: '#2D2D35',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        elevation: 2,
    },
    toggleText: { fontSize: 13, color: COLORS.textSecondary, fontWeight: '600' },
    toggleTextActive: { color: COLORS.primary, fontWeight: 'bold' },

    // --- Container do Gráfico ---
    chartSection: {
        backgroundColor: COLORS.card,
        borderRadius: 24,
        padding: 20,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#27272A',
        alignItems: 'center',
        minHeight: 300,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
    },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.text },
    
    chartStyle: { marginVertical: 8, borderRadius: 16 },
    emptyText: { color: COLORS.textSecondary, textAlign: 'center', marginTop: 50, fontStyle: 'italic' },
});