import { StyleSheet, Dimensions } from "react-native";

export const COLORS = {
    primary: '#6A1B9A',
    secondary: '#FFD54F', // Dourado
    background: '#0D0D0D',
    card: '#1E1E1E',
    cardLocked: '#151515', // Mais escuro para bloqueados
    textPrimary: '#FFFFFF',
    textSecondary: '#A0A0A0',
    border: '#333333',
    lockedIcon: '#444444',
    bronze: '#CD7F32',
    silver: '#C0C0C0',
    gold: '#FFD700',
};

const { width } = Dimensions.get('window');

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: 16,
    },
    contentContainer: {
        padding: 20,
        paddingBottom: 80,
    },
    
    // Header com Progresso
    headerContainer: {
        alignItems: 'center',
        marginBottom: 32,
        marginTop: 16,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    progressText: {
        fontSize: 14,
        color: COLORS.secondary,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    progressBarTrack: {
        width: '80%',
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

    // Seções
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textSecondary,
        marginBottom: 16,
        marginTop: 8,
        paddingLeft: 4,
        borderLeftWidth: 3,
        borderLeftColor: COLORS.primary,
    },

    // Card de Conquista
    achievementCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.card,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        // Sombra
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    achievementCardLocked: {
        backgroundColor: COLORS.cardLocked,
        borderColor: '#222',
        opacity: 0.7,
    },
    
    // Ícone / Medalha
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 2,
    },
    
    // Texto
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    description: {
        fontSize: 12,
        color: COLORS.textSecondary,
        lineHeight: 16,
    },
    
    // XP Badge
    xpBadge: {
        marginTop: 6,
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        backgroundColor: 'rgba(106, 27, 154, 0.3)',
    },
    xpText: {
        fontSize: 10,
        color: COLORS.secondary,
        fontWeight: 'bold',
    },

    // Estado Vazio
    emptyState: { alignItems: 'center', marginTop: 40 },
    emptyText: { color: COLORS.textSecondary, marginTop: 12 },
});