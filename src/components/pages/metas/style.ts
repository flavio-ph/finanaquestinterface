import { StyleSheet } from "react-native";

export const COLORS = {
    primary: '#6A1B9A',      
    secondary: '#FFD54F', 
    background: '#121212',   
    card: '#1E1E1E',         
    textPrimary: '#FFFFFF',
    textSecondary: '#B0B0B0',
    accent: '#00E676',    
    danger: '#D32F2F',
    inputBg: '#2C2C2C',
    border: '#333',
    progressBarBg: '#333'
};

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

    // --- Card da Meta ---
    goalCard: {
        backgroundColor: COLORS.card,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        elevation: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    goalName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        flex: 1,
    },
    goalStatus: {
        fontSize: 12,
        fontWeight: 'bold',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        overflow: 'hidden',
    },
    valuesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    currentAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.accent,
    },
    targetAmount: {
        fontSize: 16,
        color: COLORS.textSecondary,
    },
    progressBarTrack: {
        height: 10,
        backgroundColor: COLORS.progressBarBg,
        borderRadius: 5,
        marginBottom: 12,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: COLORS.accent,
        borderRadius: 5,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    deadlineText: { fontSize: 12, color: COLORS.textSecondary },
    percentageText: { fontSize: 14, fontWeight: 'bold', color: COLORS.textPrimary },
    emptyState: { alignItems: 'center', marginTop: 60, opacity: 0.7 },
    emptyText: { color: COLORS.textSecondary, marginTop: 16, fontSize: 16 },

    // --- MODAIS E BOTÕES ---
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    modalContent: {
        width: '100%',
        backgroundColor: COLORS.card,
        borderRadius: 20,
        padding: 24,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginBottom: 20,
        textAlign: 'center'
    },
    inputGroup: { marginBottom: 16 },
    label: { color: COLORS.textSecondary, marginBottom: 8, fontSize: 14 },
    input: {
        backgroundColor: COLORS.inputBg,
        borderRadius: 10,
        padding: 14,
        color: COLORS.textPrimary,
        borderWidth: 1,
        borderColor: COLORS.border,
        fontSize: 16
    },
    
    // --- ESTILO NOVO PARA O BOTÃO DE DATA ---
    dateButton: {
        backgroundColor: COLORS.inputBg,
        borderRadius: 10,
        padding: 14,
        borderWidth: 1,
        borderColor: COLORS.border,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dateButtonText: {
        fontSize: 16,
        color: COLORS.textPrimary,
    },
    
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        gap: 12
    },
    buttonCancel: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: 'center'
    },
    buttonSave: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        alignItems: 'center'
    },
    buttonDeposit: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        backgroundColor: COLORS.accent,
        alignItems: 'center'
    },
    buttonText: { fontWeight: 'bold', color: COLORS.textPrimary, fontSize: 16 }
});