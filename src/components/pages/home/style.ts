import { StyleSheet } from "react-native";

export const COLORS = {
    background: "#0F0F11",
    card: "#18181B",
    primary: "#7C3AED",   // Roxo Principal
    secondary: "#4C1D95", // Roxo Escuro
    income: "#00E676",    // Verde Neon
    expense: "#FF5252",   // Vermelho Suave
    text: "#E4E4E7",      // Branco Gelo
    textSecondary: "#A1A1AA", // Cinza
};

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        position: 'relative',
    },
    contentContainer: {
        padding: 20,
        paddingTop: 60,
        // Espaço extra em baixo para o menu "gaveta" não tapar o conteúdo
        paddingBottom: 130, 
    },

    // --- Header (Perfil) ---
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    levelText: {
        fontSize: 12,
        color: COLORS.primary,
        fontWeight: '600',
        marginTop: 2,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    
    // Foto de Perfil
    profileImageContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.card,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#333',
        overflow: 'hidden', // Garante que a imagem fique redonda
    },
    profileImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    // --- Barra de XP ---
    xpContainer: {
        marginBottom: 25,
    },
    xpHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    xpLabel: { 
        color: COLORS.textSecondary, 
        fontSize: 12, 
        fontWeight: 'bold' 
    },
    xpPercent: { 
        color: COLORS.text, 
        fontSize: 12, 
        fontWeight: 'bold' 
    },
    xpBarBackground: {
        height: 8,
        backgroundColor: '#27272A',
        borderRadius: 4,
        overflow: 'hidden',
    },
    xpBarFill: {
        height: '100%',
        borderRadius: 4,
    },

    // --- Cartão de Saldo (Minimalista & Moderno) ---
    balanceCard: {
        padding: 25,
        borderRadius: 30, // Bordas bem arredondadas
        marginBottom: 30,
        
        // Sombra suave e colorida (Glow)
        shadowColor: "#7C3AED",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
        
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)', // Borda sutil "vidro"
    },
    balanceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    balanceLabel: { 
        fontSize: 14, 
        color: 'rgba(255,255,255,0.7)', 
        textTransform: 'uppercase', 
        letterSpacing: 1, 
        fontWeight: '600' 
    },
    balanceValue: { 
        fontSize: 40, 
        fontWeight: 'bold', 
        color: '#FFF', 
        marginBottom: 25,
        letterSpacing: -1, // Aproxima os números para ficar moderno
    },
    
    // Área de Receita/Despesa (Grid)
    balanceRow: { 
        flexDirection: 'row', 
        gap: 15, // Espaço entre os cartões
    },
    
    // Mini Cards de Estatística (Glassmorphism)
    miniStatCard: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)', // Fundo escuro transparente
        padding: 12,
        borderRadius: 16,
        gap: 10,
    },
    
    // Ícone minimalista
    statIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.1)', // Fundo muito sutil
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    statLabel: { 
        fontSize: 10, 
        color: 'rgba(255,255,255,0.6)', 
        marginBottom: 2 
    },
    statValue: { 
        fontSize: 14, 
        fontWeight: 'bold', 
        color: '#FFF' 
    },

    // --- Atalhos Rápidos ---
    sectionTitle: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        color: COLORS.text, 
        marginBottom: 15 
    },
    shortcutsGrid: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 30 
    },
    shortcutItem: { 
        alignItems: 'center', 
        gap: 8 
    },
    shortcutIcon: { 
        width: 56, 
        height: 56, 
        borderRadius: 18, 
        justifyContent: 'center', 
        alignItems: 'center', 
        shadowOpacity: 0.3, 
        elevation: 5 
    },
    shortcutLabel: { 
        color: COLORS.textSecondary, 
        fontSize: 12 
    },

    // --- Dica do Mestre ---
    tipCard: {
        backgroundColor: '#1F1F23',
        padding: 20,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        borderLeftWidth: 4,
        borderLeftColor: '#F59E0B',
    },
    tipText: { 
        color: '#DDD', 
        fontSize: 14, 
        flex: 1, 
        lineHeight: 20 
    },
});