import { StyleSheet, Dimensions } from "react-native";

export const COLORS = {
    primary: '#6A1B9A',      
    secondary: '#FFD54F', // Amarelo Dourado para XP
    background: '#121212',   
    card: '#1E1E1E',         
    textPrimary: '#FFFFFF',
    textSecondary: '#B0B0B0',
    accent: '#00E676',    // Verde Neon
    inputBg: '#2C2C2C',
    border: '#333'
};

const { width, height } = Dimensions.get('window');

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: 16,
    },
    contentContainer: {
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

    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.textSecondary,
        marginBottom: 16,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },

    // Card do Desafio (Mantido igual)
    challengeCard: {
        backgroundColor: COLORS.card,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#333',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    iconContainer: {
        width: 48, height: 48, borderRadius: 24,
        backgroundColor: 'rgba(255, 213, 79, 0.1)',
        justifyContent: 'center', alignItems: 'center', marginRight: 12,
    },
    headerText: { flex: 1 },
    challengeName: { fontSize: 18, fontWeight: 'bold', color: COLORS.textPrimary },
    challengeReward: { fontSize: 14, color: COLORS.secondary, fontWeight: 'bold', marginTop: 2 },
    description: { fontSize: 14, color: COLORS.textSecondary, marginBottom: 16, lineHeight: 20 },
    footerRow: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        borderTopWidth: 1, borderTopColor: '#333', paddingTop: 12,
    },
    dateTag: { flexDirection: 'row', alignItems: 'center' },
    dateText: { color: COLORS.textSecondary, fontSize: 12, marginLeft: 6 },
    statusBadge: {
        backgroundColor: 'rgba(0, 230, 118, 0.1)',
        paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8,
    },
    statusText: { color: COLORS.accent, fontSize: 12, fontWeight: '600' },
    emptyState: { alignItems: 'center', marginTop: 60, opacity: 0.7 },
    emptyText: { color: COLORS.textSecondary, marginTop: 16, fontSize: 16 },

    // --- NOVOS ESTILOS PARA O MODAL DE CADASTRO ---
    
    // Botão Flutuante de Adicionar (Canto Superior Direito)
    addButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.card,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border
    },

    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    modalContent: {
        width: '100%',
        backgroundColor: COLORS.card,
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginBottom: 20,
        textAlign: 'center'
    },
    inputGroup: { marginBottom: 15 },
    label: { color: COLORS.textSecondary, marginBottom: 5, fontSize: 14 },
    input: {
        backgroundColor: COLORS.inputBg,
        borderRadius: 10,
        padding: 12,
        color: COLORS.textPrimary,
        borderWidth: 1,
        borderColor: COLORS.border,
        fontSize: 16
    },
    
    // Botões do Modal
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        gap: 10
    },
    buttonCancel: {
        flex: 1,
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: 'center'
    },
    buttonSave: {
        flex: 1,
        padding: 15,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        alignItems: 'center'
    },
    buttonText: { fontWeight: 'bold', color: COLORS.textPrimary }
});