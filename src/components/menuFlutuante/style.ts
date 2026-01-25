import { StyleSheet, Platform, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export const COLORS = {
    // Fundo extraído do App.tsx web (#0a0a0c)
    background: '#0F0F11', 
    
    // Roxo Neon (baseado no purple-600/violet-900 do código web)
    primary: '#7C3AED', 
    secondary: '#4C1D95',
    
    // Cores de estado
    activeIcon: '#FFF',
    inactiveIcon: '#6B7280', // Cinza azulado moderno
    
    white: '#FFF',
    
    // Sombras
    shadowColor: '#7C3AED', // Sombra roxa
    modalOverlay: 'rgba(10, 10, 12, 0.9)', // Fundo escuro quase opaco
    modalBg: '#131315',
    cardBg: '#1C1C1E'
};

export const style = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 30 : 20,
        alignSelf: 'center',
        zIndex: 999,
    },
    menuBar: {
        flexDirection: 'row',
        backgroundColor: COLORS.background,
        
        // Cápsula larga
        width: width * 0.90,
        maxWidth: 400,
        height: 70,
        borderRadius: 40, // Bem redondo
        
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        
        // Sombra com "Glow" Roxo (Estilo Cyberpunk)
        shadowColor: COLORS.shadowColor,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 15,
        
        // Borda sutil para separar do fundo preto
        borderWidth: 1,
        borderColor: 'rgba(124, 58, 237, 0.2)', 
    },
    
    // O "Slider" ativo (Bolinha que fica atrás do ícone)
    activeBackground: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.primary,
        zIndex: -1, // Fica atrás do ícone
    },

    menuItem: {
        height: '100%',
        width: 50, // Largura fixa para alinhar o slider
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    // Botão Central (Transação)
    centerButtonContainer: {
        top: -25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerButton: {
        width: 65,
        height: 65,
        borderRadius: 35,
        backgroundColor: '#0a0a0c', // Cor do fundo da tela para "recortar"
        justifyContent: 'center',
        alignItems: 'center',
        
        // Borda e Sombra
        borderWidth: 4,
        borderColor: '#0a0a0c',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.6,
        shadowRadius: 15,
        elevation: 10,
    },
    centerIconCircle: {
        width: '100%',
        height: '100%',
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
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
        padding: 25,
        paddingBottom: 50,
        borderTopWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    modalTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', // Toque tech
    },
    modalGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 15,
        justifyContent: 'center',
    },
    modalItem: {
        width: '45%',
        aspectRatio: 1.3,
        backgroundColor: COLORS.cardBg,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    modalItemText: {
        color: '#A1A1AA',
        marginTop: 10,
        fontSize: 14,
        fontWeight: '500',
    }
});