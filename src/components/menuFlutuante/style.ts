import { StyleSheet, Platform, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export const COLORS = {
    // Fundo sólido escuro (Zinc-900) para cobrir o conteúdo atrás
    barBackground: '#18181B', 
    
    primary: '#7C3AED',    // Roxo Neon
    secondary: '#4C1D95',
    
    activeIcon: '#7C3AED',    
    inactiveIcon: '#52525B', // Cinza mais escuro para não chamar atenção
    
    // Sombras
    shadow: '#7C3AED',
    
    modalOverlay: 'rgba(0, 0, 0, 0.85)',
    modalBg: '#18181B',
    cardBg: '#27272A'
};

export const style = StyleSheet.create({
  container: {
        position: 'absolute', // <--- OBRIGATÓRIO
        bottom: 0,           // <--- GRUDA NO CHÃO
        left: 0,
        right: 0,
        zIndex: 9999,        // <--- FICA POR CIMA DE TUDO
        elevation: 20,       // <--- SOMBRA NO ANDROID
    },
    
    // A "Gaveta"
    menuBar: {
        flexDirection: 'row',
        backgroundColor: COLORS.barBackground,
        
        width: '100%',
        // Altura maior no iOS para compensar a barra home
        height: Platform.OS === 'ios' ? 90 : 70, 
        
        // Bordas arredondadas APENAS em cima
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        
        justifyContent: 'space-between',
        alignItems: 'flex-start', // Alinha itens ao topo
        paddingTop: 15,           // Espaço interno superior
        paddingHorizontal: 30,    // Espaço lateral
        
        // Borda sutil no topo para separar do conteúdo
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        
        // Sombra invertida (para cima)
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 20,
    },
    
    // Item Individual
    menuItem: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 40, // Altura da área de toque
    },

    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    // Ponto de Luz (Glow)
    activeDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: COLORS.primary,
        marginTop: 4,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5,
    },

    // --- BOTÃO CENTRAL FLUTUANTE ---
    centerButtonContainer: {
        top: -35, // Sobe para fora da gaveta (efeito FAB)
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    centerButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        
        // Borda grossa da cor do fundo do app para "recortar" a gaveta visualmente
        borderWidth: 6, 
        borderColor: '#0F0F11', // Mesma cor do background da tela (Home)
    },

    // --- MODAL ---
    modalOverlay: {
        flex: 1,
        backgroundColor: COLORS.modalOverlay,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.modalBg,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30,
        paddingBottom: 50,
        borderTopWidth: 1,
        borderColor: COLORS.primary,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    modalTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', letterSpacing: 1 },
    modalGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 15, justifyContent: 'center' },
    modalItem: {
        width: '45%', aspectRatio: 1.5, backgroundColor: COLORS.cardBg,
        borderRadius: 16, justifyContent: 'center', alignItems: 'center',
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
    },
    modalItemText: { color: '#E4E4E7', marginTop: 10, fontSize: 13, fontWeight: '600' }
});