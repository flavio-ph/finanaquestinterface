import { StyleSheet } from "react-native";

// --- Constantes de Design (Mesma paleta) ---
export const COLORS = {
    primary: '#6A1B9A',      // Roxo
    secondary: '#FDD835',    // Amarelo
    background: '#121212',   // Fundo principal
    card: '#1E1E1E',         // Fundo dos cards
    textPrimary: '#FFFFFF',
    textSecondary: '#B0B0B0',
    inputBorder: '#4A4A4A',
    danger: '#D32F2F',       // Para o botão de Logout
};
// ---------------------------------------------------

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: 16,
    },
    contentContainer: {
        padding: 16,
        alignItems: 'center',
    },

    // --- Cabeçalho do Perfil ---
    header: {
        alignItems: 'center',
        marginBottom: 32,
        marginTop: 16,
    },
    avatarContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: COLORS.card,
        borderWidth: 3,
        borderColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatarText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    userName: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    userLevelBadge: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
    },
    userLevelText: {
        color: COLORS.textPrimary,
        fontWeight: '600',
        fontSize: 14,
    },

    // --- Seção de Formulário ---
    formSection: {
        width: '100%',
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: 20,
        marginBottom: 24,
    },
    label: {
        color: COLORS.textSecondary,
        marginBottom: 8,
        fontSize: 14,
    },
    inputContainer: {
        height: 50,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        borderRadius: 8,
        marginBottom: 20,
        justifyContent: 'center',
        paddingHorizontal: 16,
        backgroundColor: COLORS.background, // Ligeiramente diferente do card para contraste
    },
    inputContainerEditable: {
        borderColor: COLORS.primary, // Destaca quando está editável
    },
    input: {
        color: COLORS.textPrimary,
        fontSize: 16,
        height: '100%',
    },
    inputTextReadOnly: {
        color: COLORS.textSecondary, // Texto mais apagado se não estiver editando
    },

    // --- Botões ---
    actionButton: {
        height: 50,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        width: '100%',
    },
    actionButtonText: {
        color: COLORS.textPrimary,
        fontSize: 16,
        fontWeight: '600',
    },
    logoutButton: {
        height: 50,
        borderWidth: 1,
        borderColor: COLORS.danger,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    logoutButtonText: {
        color: COLORS.danger,
        fontSize: 16,
        fontWeight: '600',
    },
});