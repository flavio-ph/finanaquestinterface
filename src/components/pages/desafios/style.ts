import { StyleSheet } from "react-native";

// --- Constantes de Design ---
export const COLORS = {
    primary: '#6A1B9A',
    secondary: '#FDD835',    // Amarelo (XP)
    background: '#121212',
    card: '#1E1E1E',
    textPrimary: '#FFFFFF',
    textSecondary: '#B0B0B0',
    locked: '#424242',
    income: '#4CAF50', // Verde (Concluído)
    goalBlue: '#29B6F6', // Azul (Em Andamento)
};

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    contentContainer: {
        padding: 16,
        paddingBottom: 40,
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
        fontSize: 20,
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginTop: 16,
        marginBottom: 16,
        paddingLeft: 4,
    },

    // --- Card de Desafio ---
    challengeCard: {
        backgroundColor: COLORS.card,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        flex: 1,
    },
    challengeName: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.textPrimary,
    },
    challengeDescription: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginTop: 12,
        lineHeight: 20,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#333333',
    },
    rewardContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    rewardLabel: {
        fontSize: 13,
        color: COLORS.textSecondary,
    },
    rewardValue: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.secondary,
    },

    // --- ESTILOS DOS BOTÕES (ADICIONE ISTO) ---
    
    // Botão Padrão ("Iniciar")
    actionButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: COLORS.primary, 
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textPrimary,
    },

    // Botão Ativo ("Em Andamento")
    activeButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: COLORS.goalBlue,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.goalBlue,
    },

    // Botão Concluído ("Concluído")
    completedButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: COLORS.income,
        alignItems: 'center',
        justifyContent: 'center',
    },
    completedButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.income,
    },
});