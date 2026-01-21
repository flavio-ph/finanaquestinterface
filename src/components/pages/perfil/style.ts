import { StyleSheet } from "react-native";

export const COLORS = {
    primary: '#6A1B9A',      
    secondary: '#FFD54F', 
    background: '#0D0D0D',   // Fundo super escuro (Igual Home)
    card: '#1E1E1E',         // Fundo dos cards
    inputBg: '#2C2C2C',      // Fundo dos inputs
    textPrimary: '#FFFFFF',
    textSecondary: '#A0A0A0',
    border: '#333333',
    danger: '#FF5252',       // Vermelho mais vibrante
    success: '#00E676'
};

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    contentContainer: {
        padding: 24,
        paddingTop: 40,
        paddingBottom: 100,
        alignItems: 'center', // Centralizar conteúdo verticalmente
    },

    // --- HEADER (Avatar & Info) ---
    header: {
        alignItems: 'center',
        marginBottom: 40,
        width: '100%',
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.card,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: COLORS.primary, // Borda roxa vibrante
        marginBottom: 16,
        // Sombra / Glow
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
    },
    avatarText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginBottom: 8,
    },
    badgesRow: {
        flexDirection: 'row',
        gap: 12,
    },
    levelBadge: {
        backgroundColor: 'rgba(106, 27, 154, 0.3)', // Roxo transparente
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    levelText: {
        color: COLORS.secondary, // Dourado
        fontWeight: 'bold',
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    xpBadge: {
        backgroundColor: COLORS.card,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    xpText: {
        color: COLORS.textSecondary,
        fontSize: 12,
    },

    // --- FORMULÁRIO ---
    formSection: {
        width: '100%',
        marginBottom: 32,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 8,
        marginLeft: 4,
        fontWeight: '600',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.card,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        height: 56,
        paddingHorizontal: 16,
    },
    inputContainerEditable: {
        backgroundColor: COLORS.inputBg,
        borderColor: COLORS.primary, // Borda roxa quando editável
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        color: COLORS.textPrimary,
        fontSize: 16,
        height: '100%',
    },
    inputTextReadOnly: {
        color: COLORS.textSecondary, // Texto cinza quando não editável
    },

    // --- BOTÕES ---
    actionButtonContainer: {
        width: '100%',
        height: 56,
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden', // Para o gradiente não vazar
        // Sombra
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
    },
    gradientButton: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },

    cancelButton: {
        width: '100%',
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
        marginBottom: 16,
        backgroundColor: COLORS.card,
    },
    cancelButtonText: {
        color: COLORS.textPrimary,
        fontSize: 16,
        fontWeight: '600',
    },

    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        gap: 8,
    },
    logoutButtonText: {
        color: COLORS.danger,
        fontSize: 16,
        fontWeight: 'bold',
    },
});