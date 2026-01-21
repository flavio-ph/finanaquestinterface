import { StyleSheet, Dimensions } from "react-native";

export const COLORS = {
    primary: '#6A1B9A',      
    secondary: '#FFD54F', 
    background: '#0D0D0D',   // Fundo super escuro
    card: '#1E1E1E',         
    inputBg: '#2C2C2C',      
    textPrimary: '#FFFFFF',
    textSecondary: '#A0A0A0',
    border: '#333333',
    error: '#FF5252',
    success: '#00E676'
};

const { width } = Dimensions.get('window');

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        position: 'relative',
    },

    // --- EFEITOS DE FUNDO (Igual ao Login) ---
    backgroundEffectTopRight: {
        position: 'absolute',
        top: -80,
        right: -80,
        width: width * 0.7,
        height: width * 0.7,
        borderRadius: (width * 0.7) / 2,
        opacity: 0.2,
    },
    backgroundEffectBottomLeft: {
        position: 'absolute',
        bottom: -50,
        left: -50,
        width: width * 0.6,
        height: width * 0.6,
        borderRadius: (width * 0.6) / 2,
        opacity: 0.2,
    },
    // ----------------------------------------

    contentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 24,
        paddingTop: 60, // Espaço extra para o topo
    },

    // --- HEADER ---
    headerContainer: {
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 8,
        // Sombra Neon
        textShadowColor: COLORS.primary,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },

    // --- FORMULÁRIO ---
    formContainer: {
        width: '100%',
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.textSecondary,
        marginBottom: 8,
        marginLeft: 4,
        textTransform: 'uppercase',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.inputBg,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        height: 56,
        paddingHorizontal: 16,
    },
    inputIcon: {
        marginRight: 12,
        width: 20, 
        textAlign: 'center',
    },
    input: {
        flex: 1,
        color: COLORS.textPrimary,
        fontSize: 16,
        height: '100%',
    },

    // --- BOTÃO ---
    buttonContainer: {
        width: '100%',
        height: 56,
        borderRadius: 16,
        marginTop: 24,
        overflow: 'hidden',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
    },
    gradientButton: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },

    // --- RODAPÉ ---
    footerContainer: {
        flexDirection: 'row',
        marginTop: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    footerText: {
        color: COLORS.textSecondary,
        fontSize: 14,
    },
    linkText: {
        color: COLORS.secondary,
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 4,
    },
});