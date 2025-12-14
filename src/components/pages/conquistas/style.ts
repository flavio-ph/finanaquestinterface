import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');
// Cálculo para 3 colunas com espaçamento
const CARD_MARGIN = 8;
const CARD_WIDTH = (width / 3) - (CARD_MARGIN * 3) - 10; 

// --- Constantes de Design ---
export const COLORS = {
    primary: '#6A1B9A',
    secondary: '#FDD835',    // Amarelo/Dourado do tema
    background: '#121212',
    card: '#1E1E1E',
    textPrimary: '#FFFFFF',
    textSecondary: '#B0B0B0',
    gold: '#FFD700',         // Cor específica para badges desbloqueadas
    locked: '#424242',       // Cor para ícones bloqueados
};
// ---------------------------------------------------

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: 24,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: 16,
        marginTop: 16,
        textAlign: 'center',
    },

    // --- Cabeçalho de Progresso ---
    progressHeader: {
        alignItems: 'center',
        marginBottom: 24,
    },
    progressText: {
        fontSize: 16,
        color: COLORS.textSecondary,
        marginBottom: 8,
    },
    progressBarTrack: {
        width: '60%',
        height: 8,
        backgroundColor: '#333',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: COLORS.secondary,
        borderRadius: 4,
    },

    // --- Grade de Conquistas ---
    gridContent: {
        padding: 16,
        paddingBottom: 100, // Espaço extra para não cobrir com o menu
    },
    badgeCard: {
        width: CARD_WIDTH,
        minHeight: 130, 
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: 12,
        margin: CARD_MARGIN,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    lockedCard: {
        opacity: 0.5, 
        backgroundColor: '#181818', // Um pouco mais escuro
    },
    
    // Ícone da Badge
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        borderWidth: 2,
    },
    unlockedIconBg: {
        backgroundColor: 'rgba(255, 215, 0, 0.15)', // Dourado translúcido
        borderColor: COLORS.gold,
    },
    lockedIconBg: {
        backgroundColor: '#2C2C2C',
        borderColor: COLORS.locked,
    },

    // Textos da Badge
    badgeName: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.textPrimary,
        textAlign: 'center',
        marginBottom: 4,
    },
});