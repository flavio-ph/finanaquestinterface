import { StyleSheet, Dimensions } from "react-native";

export const COLORS = {
    primary: '#6A1B9A',
    primaryDark: '#4A148C',
    accent: '#00E676',       // Verde Neon para destaque/sucesso
    secondary: '#FFD54F',    // Amarelo para XP/Ouro
    background: '#0D0D0D',   // Fundo super escuro
    card: '#1E1E1E',         // Fundo dos cards
    cardHighlight: '#2C2C2C', // Fundo alternativo
    textPrimary: '#FFFFFF',
    textSecondary: '#A0A0A0',
    income: '#4CAF50',
    expense: '#F44336',
    border: '#333333'
};

const { width } = Dimensions.get('window');

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    // Gradiente de fundo sutil (se quiser usar na tela toda) ou apenas container
    contentContainer: {
        padding: 20,
        paddingTop: 50, // Mais espaço para a StatusBar
        paddingBottom: 100,
    },

    // --- HEADER ---
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    userProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.cardHighlight,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.primary,
        marginRight: 12,
    },
    avatarText: { // Caso use iniciais
        fontSize: 20,
        color: COLORS.primary,
        fontWeight: 'bold'
    },
    greetingContainer: {
        justifyContent: 'center',
    },
    welcomeText: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
    },
    userLevelBadge: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
        marginTop: 4,
        alignSelf: 'flex-start',
    },
    userLevelText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#FFF',
    },

    // --- XP BAR (Gamification) ---
    xpContainer: {
        width: '35%',
        alignItems: 'flex-end',
    },
    xpLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
        gap: 6,
    },
    xpLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.secondary,
    },
    xpTrack: {
        width: '100%',
        height: 8,
        backgroundColor: '#333',
        borderRadius: 4,
        overflow: 'hidden',
    },
    xpFill: {
        height: '100%',
        borderRadius: 4,
    },
    xpValue: {
        fontSize: 10,
        color: COLORS.textSecondary,
        marginTop: 4,
    },

    // --- CARD DE SALDO (Hero Card) ---
    balanceCard: {
        borderRadius: 24,
        padding: 24,
        marginBottom: 24,
        // Sombras suaves
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    balanceLabel: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    balanceAmount: {
        fontSize: 36,
        fontWeight: '700',
        color: '#FFF',
        marginBottom: 24,
    },
    financeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    financeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: 'rgba(0,0,0,0.2)', // Fundo escuro semitransparente
        padding: 12,
        borderRadius: 16,
        flex: 0.48, // Ocupar quase metade cada
    },
    financeIconBox: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    financeInfo: {
        flex: 1,
    },
    financeLabel: {
        fontSize: 10,
        color: 'rgba(255,255,255,0.7)',
    },
    financeValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF',
    },

    // --- SEÇÕES GERAIS ---
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
    },
    seeAllButton: {
        padding: 4,
    },
    seeAllText: {
        fontSize: 12,
        color: COLORS.primary,
        fontWeight: '600',
    },

    // --- CARD DE DESAFIO (Quest) ---
    questCard: {
        backgroundColor: COLORS.card,
        borderRadius: 20,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: COLORS.border,
        flexDirection: 'row',
        alignItems: 'center',
    },
    questIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(106, 27, 154, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    questContent: {
        flex: 1,
    },
    questTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    questDesc: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginBottom: 8,
    },
    questProgressTrack: {
        height: 6,
        backgroundColor: '#333',
        borderRadius: 3,
        overflow: 'hidden',
    },
    questProgressFill: {
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 3,
    },

    // --- LISTA DE TRANSAÇÕES ---
    transactionList: {
        gap: 12,
    },
    transactionItem: {
        backgroundColor: COLORS.card,
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'transparent', // Para manter o layout
    },
    transactionIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    transInfo: {
        flex: 1,
    },
    transTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    transDate: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },
    transAmount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});