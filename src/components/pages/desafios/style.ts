import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export const COLORS = {
    background: "#0F0F11",
    card: "#18181B",
    primary: "#7C3AED", // Roxo Neon
    secondary: "#4C1D95",
    
    xp: "#FFD700", // Dourado para XP
    success: "#00E676",
    text: "#E4E4E7",
    textSecondary: "#A1A1AA",
    border: "#27272A"
};

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    contentContainer: {
        padding: 20,
        paddingTop: 60,
        paddingBottom: 130, // Espaço para menu
    },

    // --- HEADER ---
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: COLORS.text,
        letterSpacing: 1,
        textShadowColor: 'rgba(124, 58, 237, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textSecondary,
        marginTop: 5,
    },

    // --- TAB SELECTOR (Disponíveis | Concluídos) ---
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.card,
        borderRadius: 16,
        padding: 4,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 12,
    },
    activeTab: {
        backgroundColor: 'rgba(124, 58, 237, 0.2)', // Roxo transparente
    },
    tabText: {
        color: COLORS.textSecondary,
        fontWeight: '600',
        fontSize: 14,
    },
    activeTabText: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },

    // --- CARD DE MISSÃO (QUEST) ---
    questCard: {
        backgroundColor: COLORS.card,
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        flexDirection: 'row',
        alignItems: 'center',
        
        // Sombra
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    // Estilo para missões concluídas (mais apagadas)
    completedCard: {
        opacity: 0.7,
        borderColor: 'rgba(0, 230, 118, 0.3)',
    },

    // Ícone Esquerdo
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },

    // Conteúdo Central
    questContent: {
        flex: 1,
    },
    questTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    questDesc: {
        fontSize: 12,
        color: COLORS.textSecondary,
        lineHeight: 16,
    },

    // Recompensa (Direita)
    rewardContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingLeft: 10,
    },
    xpBadge: {
        backgroundColor: 'rgba(255, 215, 0, 0.1)', // Dourado fraco
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 215, 0, 0.3)',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    xpText: {
        color: COLORS.xp,
        fontWeight: 'bold',
        fontSize: 12,
    },
    checkIcon: {
        marginTop: 5,
    },

    // Empty State
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        opacity: 0.5,
    },
    emptyText: {
        color: COLORS.textSecondary,
        marginTop: 15,
        fontSize: 14,
    }
});