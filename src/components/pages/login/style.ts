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
    error: '#FF5252'
};

const { width, height } = Dimensions.get('window');

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        position: 'relative', // Necessário para os elementos absolutos
    },
    
    // --- NOVOS ESTILOS PARA OS EFEITOS DE FUNDO ---
    backgroundEffectTopLeft: {
        position: 'absolute',
        top: -100,
        left: -100,
        width: width * 0.8, // Ocupa 80% da largura
        height: width * 0.8,
        borderRadius: (width * 0.8) / 2, // Torna um círculo
        opacity: 0.3, // Bem sutil
    },
    backgroundEffectBottomRight: {
        position: 'absolute',
        bottom: -50,
        right: -50,
        width: width * 0.6,
        height: width * 0.6,
        borderRadius: (width * 0.6) / 2,
        opacity: 0.2, // Ainda mais sutil
       
    },
    // ----------------------------------------------

    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        zIndex: 1, // Garante que o conteúdo fique na frente dos efeitos
    },

    // --- LOGO & TITULO ---
    logoContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 16,
    },
    appName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        letterSpacing: 2,
        textTransform: 'uppercase',
        // Sombra de texto neon
        textShadowColor: COLORS.primary,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    tagline: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginTop: 4,
    },

    // --- FORMULÁRIO ---
    formContainer: {
        width: '100%',
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.textSecondary,
        marginBottom: 8,
        marginLeft: 4,
        textTransform: 'uppercase',
    },
    inputGroup: {
        marginBottom: 20,
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
    },
    input: {
        flex: 1,
        color: COLORS.textPrimary,
        fontSize: 16,
        height: '100%',
    },

    // --- BOTÕES ---
    loginButtonContainer: {
        width: '100%',
        height: 56,
        borderRadius: 16,
        marginTop: 16,
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
    loginButtonText: {
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
    },
    footerText: {
        color: COLORS.textSecondary,
        fontSize: 14,
    },
    signupText: {
        color: COLORS.secondary,
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 4,
    },
});