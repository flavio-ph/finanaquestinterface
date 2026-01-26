import { StyleSheet } from "react-native";

export const COLORS = {
    background: "#0F0F11",
    card: "#18181B",
    primary: "#7C3AED", // Roxo Neon
    secondary: "#F59E0B", // Âmbar (para ícones de desafio)
    text: "#E4E4E7",
    textSecondary: "#A1A1AA",
    success: "#00E676",
    border: "#27272A",
    modalOverlay: 'rgba(0,0,0,0.85)',
};

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    contentContainer: {
        padding: 20,
        paddingTop: 60,
        paddingBottom: 100,
    },

    // --- CABEÇALHO ALINHADO ---
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10, // Espaço antes do subtítulo "Disponíveis"
    },
    pageTitle: {
        fontSize: 32,
        fontWeight: "bold",
        color: COLORS.text,
        letterSpacing: 0.5,
    },
    // Botão agora é parte do fluxo, não absoluto
    addButton: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: COLORS.card, // Fundo escuro
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
        
        // Sombra suave
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    // ---------------------------

    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: COLORS.textSecondary,
        marginBottom: 20,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },

    // --- CARDS ---
    challengeCard: {
        backgroundColor: COLORS.card,
        borderRadius: 24,
        padding: 20,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 16,
        backgroundColor: 'rgba(245, 158, 11, 0.1)', // Fundo laranja transparente
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    headerText: {
        flex: 1,
    },
    challengeName: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.text,
        marginBottom: 4,
    },
    challengeReward: {
        fontSize: 14,
        color: COLORS.secondary, // Laranja/Dourado
        fontWeight: "bold",
    },
    description: {
        fontSize: 14,
        color: COLORS.textSecondary,
        lineHeight: 22,
        marginBottom: 20,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
        paddingTop: 15,
    },
    dateTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.03)',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    dateText: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginLeft: 6,
    },
    statusBadge: {
        backgroundColor: 'rgba(0, 230, 118, 0.1)',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(0, 230, 118, 0.2)',
    },
    statusText: {
        color: COLORS.success,
        fontSize: 12,
        fontWeight: "bold",
    },

    // --- EMPTY STATE ---
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 50,
        opacity: 0.7,
    },
    emptyText: {
        color: COLORS.textSecondary,
        marginTop: 15,
        fontSize: 16,
    },

    // --- MODAL ---
    modalOverlay: {
        flex: 1,
        backgroundColor: COLORS.modalOverlay,
        justifyContent: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: COLORS.card,
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 24,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        color: COLORS.textSecondary,
        marginBottom: 8,
        fontSize: 14,
        fontWeight: '500',
    },
    input: {
        backgroundColor: "#0F0F11",
        borderRadius: 12,
        padding: 16,
        color: COLORS.text,
        borderWidth: 1,
        borderColor: COLORS.border,
        fontSize: 16,
    },
    modalActions: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 24,
    },
    buttonCancel: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#27272A',
        alignItems: 'center',
    },
    buttonSave: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 16,
    }
});