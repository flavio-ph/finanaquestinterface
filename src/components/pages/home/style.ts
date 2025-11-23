import { StyleSheet } from "react-native";

// --- Constantes de Design (Tema FinanQuest) ---
export const COLORS = {
    primary: '#6A1B9A',      // Roxo
    secondary: '#FDD835',    // Amarelo (XP/Conquistas)
    background: '#121212',   // Fundo principal
    card: '#1E1E1E',         // Fundo dos cards
    textPrimary: '#FFFFFF',
    textSecondary: '#B0B0B0',
    income: '#4CAF50',
    expense: '#F44336',
    divider: '#333',
};
// ---------------------------------------------------

export const style = StyleSheet.create({
    container: {
        paddingTop: 24,
        flex: 1,
        backgroundColor: COLORS.background,
    },
    contentContainer: {
        padding: 16,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
        borderBottomColor: '#1f1b1bff',
        borderTopColor: '#121212',
        borderLeftColor: '#121212',
        borderRightColor: '#121212', 
        borderWidth: 1,
        minWidth: '100%'
    },
    userProfile: {
        display: 'flex',
        flexDirection: 'row'
    },

    textoPerfil: {
        width: '100%',
        height: '100%',
    },

    welcomeText: {
        fontSize: 16,
        color: COLORS.textSecondary,
    },
    fotoperfil:{
        width: 40,
        height: 40,
        borderColor: '#1f1b1bff',
        borderWidth: 2,
        borderRadius: 50

    },
    userLevel: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.primary,
    },

    nomeNivel: {
        marginLeft: 8,  
    },

    xpStatus: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        width: '40%',
    },
    xpLabel: {
        fontSize: 13,
        color: COLORS.textSecondary,
        marginBottom: 4,
    },
    xpBarTrack: { // A barra de fundo
        width: '100%',
        height: 8,
        backgroundColor: '#333',
        borderRadius: 4,
        overflow: 'hidden',
    },
    xpBarFill: { // O preenchimento
        height: '100%',
        backgroundColor: COLORS.secondary,
        borderRadius: 4,
    },
    xpValue: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.secondary,
        marginTop: 4,
    },

    // --- Card Genérico ---
    card: {
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.textSecondary,
        marginBottom: 16,
    },

    // --- Card: Resumo de Saldo ---
    balanceAmount: {
        fontSize: 36,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: 16,
    },
    financialOverview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    overviewItem: {
        flexDirection: 'column',
    },
    overviewLabel: {
        fontSize: 15,
        color: COLORS.textSecondary,
        marginBottom: 4,
    },
    overviewAmount: {
        fontSize: 18,
        fontWeight: '600',
    },
    incomeAmount: {
        color: COLORS.income,
    },
    expenseAmount: {
        color: COLORS.expense,
    },

    // --- Card: Desafios Ativos ---
    challengeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    challengeIcon: {
        // O ícone em si será estilizado pelo componente de ícone
    },
    challengeDetails: {
        flex: 1, // Para ocupar o espaço restante
    },
    challengeDescription: {
        fontSize: 15,
        fontWeight: '500',
        color: COLORS.textPrimary,
        marginBottom: 8,
    },
    challengeProgressBar: { // Track
        height: 6,
        backgroundColor: '#333',
        borderRadius: 3,
        overflow: 'hidden',
        marginBottom: 4,
    },
    challengeProgressFill: { // Fill
        height: '100%',
        backgroundColor: COLORS.secondary,
        borderRadius: 3,
    },
    challengeStatus: {
        fontSize: 13,
        color: COLORS.textSecondary,
    },

    // --- Card: Transações Recentes ---
    transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.divider,
    },
    transactionIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    expenseIconBg: {
        backgroundColor: 'rgba(244, 67, 54, 0.2)',
    },
    incomeIconBg: {
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
    },
    transactionDetails: {
        flex: 1,
        flexDirection: 'column',
    },
    transactionDescription: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.textPrimary,
    },
    transactionCategory: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: '600',
    },

    // --- FAB (Floating Action Button) ---
   fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        backgroundColor: COLORS.primary,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        zIndex: 10, // Importante para ficar acima do overlay
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },

    // --- NOVOS ESTILOS PARA O MENU ---
    
    // Fundo escuro transparente
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)', // Escurece a tela
        zIndex: 5,
    },

    // Container que segura os botões menores
    menuContainer: {
        position: 'absolute',
        bottom: 100, // Começa acima do botão principal
        right: 38,   // Alinhado ao centro do FAB (ajuste fino se necessário)
        alignItems: 'flex-end',
        zIndex: 6,
        gap: 16, // Espaçamento entre os itens
    },

    // Linha contendo Label + Botão
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    // O texto descritivo (ex: "Nova Transação")
    menuLabel: {
        backgroundColor: COLORS.card,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginRight: 12,
        elevation: 4,
    },
    menuLabelText: {
        color: COLORS.textPrimary,
        fontSize: 14,
        fontWeight: '600',
    },

    // O botão menor
    menuButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16, // Movemos o margin do title para cá
    },
 
    seeAllButton: {
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    seeAllText: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: '600',
    },
});