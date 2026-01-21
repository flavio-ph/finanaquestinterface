import { StyleSheet, Platform, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export const COLORS = {
    background: '#121212', // Fundo quase preto, mas não #000
    border: '#2A2A2A',
    active: '#00E676',     // Verde Neon
    inactive: '#888',
    gradientStart: '#6A1B9A',
    gradientEnd: '#4A148C',
    white: '#FFF',
    overlay: 'rgba(0,0,0,0.7)', // Para o fundo do modal
    modalBg: '#1E1E1E'
};

export const style = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 25 : 15,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 999,
    },
    menuBar: {
        flexDirection: 'row',
        backgroundColor: COLORS.background,
        width: width * 0.92, // 92% da largura da tela
        maxWidth: 400,       // Trava em telas muito grandes
        height: 65,
        borderRadius: 20,    // Bordas menos arredondadas (mais moderno)
        
        justifyContent: 'space-around', // Distribuição uniforme
        alignItems: 'center',
        
        // Sombra suave estilo "Glassmorphism"
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
        
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    menuItem: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeLabel: {
        fontSize: 10,
        color: COLORS.active,
        marginTop: 4,
        fontWeight: 'bold',
    },
    
    // Botão Central (Transação)
    centerButtonContainer: {
        top: -20, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerButton: {
        width: 58,
        height: 58,
        borderRadius: 29,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#0D0D0D', // Mesma cor do fundo da tela para "recortar"
        elevation: 5,
    },

    // --- ESTILOS DO MODAL "MAIS OPÇÕES" ---
    modalOverlay: {
        flex: 1,
        backgroundColor: COLORS.overlay,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.modalBg,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 20,
        paddingBottom: 40,
        borderTopWidth: 1,
        borderColor: COLORS.border,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    modalItem: {
        width: '48%', // Dois por linha
        backgroundColor: '#252525',
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#333',
    },
    modalItemText: {
        color: '#FFF',
        marginLeft: 10,
        fontSize: 14,
        fontWeight: '600',
    }
});