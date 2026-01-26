import { StyleSheet, Platform, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export const COLORS = {
    background: '#0F0F11', 
    primary: '#7C3AED',    // Roxo Neon
    activeIcon: '#FFF',    
    inactiveIcon: '#6B7280', 
    iconBgInactive: '#18181B', 
    iconBgActive: '#7C3AED',   
    modalOverlay: 'rgba(10, 10, 12, 0.95)',
    modalBg: '#131315',
    cardBg: '#1C1C1E'
};

export const style = StyleSheet.create({
    container: {
        // --- O SEGREDO PARA NÃO DESCER ---
        position: 'absolute', 
        bottom: Platform.OS === 'ios' ? 35 : 25, 
        left: 0, 
        right: 0,
        // ---------------------------------
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999, // Fica acima de tudo
        elevation: 20,
    },
    
    menuBar: {
        flexDirection: 'row', // VOLTA A SER HORIZONTAL
        backgroundColor: COLORS.background,
        
        width: width * 0.92,
        maxWidth: 420,
        height: 75,
        borderRadius: 40,
        
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 10,
        
        // Sombra Neon
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 15,
        
        borderWidth: 1,
        borderColor: 'rgba(124, 58, 237, 0.3)', 
    },
    
    menuItem: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 60, 
    },

    // --- BOLHAS DOS ÍCONES (Mantido) ---
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25, 
        backgroundColor: COLORS.iconBgInactive, 
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#27272A', 
    },
    
    activeIconContainer: {
        backgroundColor: COLORS.primary, 
        borderColor: '#A78BFA', 
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 15,
        elevation: 20,
    },

    // BOTÃO CENTRAL (FLOAT)
    centerButtonContainer: {
        top: -25, // Sobe para fora da barra
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    centerButton: {
        width: 68,
        height: 68,
        borderRadius: 34,
        backgroundColor: COLORS.background, 
        justifyContent: 'center',
        alignItems: 'center',
        
        borderWidth: 4,
        borderColor: COLORS.background,
        
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.7,
        shadowRadius: 18,
        elevation: 15,
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
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        padding: 25,
        paddingBottom: 50,
        borderTopWidth: 1,
        borderColor: COLORS.primary, 
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    modalTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', letterSpacing: 1 },
    modalGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 15, justifyContent: 'center' },
    modalItem: {
        width: '45%', aspectRatio: 1.3, backgroundColor: COLORS.cardBg,
        borderRadius: 25, justifyContent: 'center', alignItems: 'center',
        borderWidth: 1, borderColor: 'rgba(124, 58, 237, 0.2)',
    },
    modalItemText: { color: '#E4E4E7', marginTop: 10, fontSize: 14, fontWeight: '600' }
});