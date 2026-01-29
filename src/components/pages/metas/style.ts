import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export const COLORS = {
    background: "#0F0F11",
    card: "#18181B",
    primary: "#7C3AED", // Roxo Neon
    secondary: "#4C1D95",
    accent: "#00E676",  // Verde Neon (para dinheiro/sucesso)
    
    text: "#E4E4E7",
    textSecondary: "#A1A1AA",
    
    border: "#27272A",
    danger: "#FF5252"
};

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    contentContainer: {
        padding: 20,
        paddingTop: 60,
        paddingBottom: 130, // Espaço para menu
    },

    // --- HEADER E RESUMO ---
    headerContainer: {
        marginBottom: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: COLORS.text,
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    
    // Card de Resumo (Topo)
    summaryCard: {
        marginTop: 20,
        borderRadius: 20,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // Sombra Neon
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    summaryLabel: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    summaryValue: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 5,
    },
    summaryIconCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // --- BOTÃO ADICIONAR (Canto Superior) ---
    addButton: {
        position: 'absolute',
        top: 10,
        right: 0,
        width: 45,
        height: 45,
        borderRadius: 14,
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // --- CARD DA META ---
    goalCard: {
        backgroundColor: COLORS.card,
        borderRadius: 24,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
        position: 'relative',
    },
    goalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    iconContainer: {
        width: 45,
        height: 45,
        borderRadius: 12,
        backgroundColor: 'rgba(124, 58, 237, 0.15)', // Roxo bem transparente
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    goalInfo: {
        flex: 1,
    },
    goalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    goalDeadline: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },

    // Valores R$
    goalValuesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    currentValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    targetValue: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 4,
    },

    // Barra de Progresso
    progressBarContainer: {
        height: 12,
        backgroundColor: '#27272A',
        borderRadius: 6,
        overflow: 'hidden',
        marginBottom: 15,
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 6,
    },

    // Ações do Card
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
        paddingTop: 15,
    },
    percentBadge: {
        backgroundColor: 'rgba(0, 230, 118, 0.1)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    percentText: {
        color: COLORS.accent,
        fontSize: 12,
        fontWeight: 'bold',
    },
    depositButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 12,
    },
    depositText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 6,
    },

    // --- MODAL ---
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    modalContent: {
        backgroundColor: '#18181B',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 25,
        paddingBottom: 40,
        borderTopWidth: 1,
        borderColor: COLORS.primary,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#27272A',
        color: '#FFF',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#333',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15,
        marginTop: 10,
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: COLORS.danger,
    },
    confirmButton: {
        backgroundColor: COLORS.primary,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
});