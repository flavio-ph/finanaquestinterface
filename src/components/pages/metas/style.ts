import { StyleSheet } from "react-native";

export const COLORS = {
    background: "#0F0F11",
    card: "#18181B",
    primary: "#7C3AED", // Roxo Neon
    text: "#E4E4E7",
    textSecondary: "#A1A1AA",
    success: "#00E676",
    danger: "#FF5252",
    border: "#27272A"
};

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    contentContainer: {
        padding: 20,
        paddingTop: 60, // Espaço para status bar
        paddingBottom: 100, // Espaço para o menu
    },
    
    // --- CABEÇALHO ALINHADO ---
    headerRow: {
        flexDirection: 'row', // Coloca lado a lado
        justifyContent: 'space-between', // Separa nas pontas
        alignItems: 'center', // Centraliza verticalmente (O Segredo)
        marginBottom: 25,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: COLORS.text,
        letterSpacing: 0.5,
    },
    addButton: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        
        // Sombra/Glow
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 8,
    },
    // ---------------------------

    // Estilos dos Cards (Mantidos/Melhorados)
    goalCard: {
        backgroundColor: COLORS.card,
        borderRadius: 20,
        padding: 20,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    goalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    goalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.text,
        flex: 1,
    },
    goalValues: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    valueText: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: "#27272A",
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: COLORS.success,
        borderRadius: 4,
    },
    
    // Botões de Ação do Card
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 15,
        gap: 10,
    },
    actionButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: '#27272A',
    },
    actionText: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.text,
    },
    depositButton: {
        backgroundColor: 'rgba(0, 230, 118, 0.15)', // Verde transparente
    },
    depositText: {
        color: COLORS.success,
    },

    // Modal
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    modalContent: {
        backgroundColor: COLORS.card,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 25,
        borderTopWidth: 1,
        borderColor: COLORS.border,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: "#0F0F11",
        borderRadius: 12,
        padding: 15,
        color: COLORS.text,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 15,
        marginTop: 10,
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#27272A',
    },
    confirmButton: {
        backgroundColor: COLORS.primary,
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#FFF',
    }
});