import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get('window');

export const COLORS = {
    background: "#0F0F11",
    primary: "#7C3AED",    // Roxo Neon
    secondary: "#4C148C",
    text: "#E4E4E7",       // Branco gelo
    textSecondary: "#A1A1AA", // Cinza claro
    inputBg: "#18181B",    // Fundo do input (Cinza bem escuro)
    border: "#27272A"      // Borda sutil
};

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    
    // Efeitos de Fundo (Bolhas de gradiente)
    backgroundEffectTopLeft: {
        position: 'absolute',
        top: -100,
        left: -100,
        width: 300,
        height: 300,
        borderRadius: 150,
        opacity: 0.4,
    },
    backgroundEffectBottomRight: {
        position: 'absolute',
        bottom: -50,
        right: -50,
        width: 400,
        height: 400,
        borderRadius: 200,
        opacity: 0.3,
    },

    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 25,
    },

    // --- LOGO E TEXTOS ---
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    appName: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FFF',
        letterSpacing: 2,
        marginBottom: 10,
        textShadowColor: COLORS.primary,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    tagline: {
        fontSize: 16,
        color: COLORS.textSecondary,
        textAlign: 'center',
    },

    // --- FORMULÁRIO ---
    formContainer: {
        width: '100%',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        color: COLORS.textSecondary,
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        marginLeft: 4,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    
    // --- AQUI ESTÁ A CORREÇÃO DA ALTURA ---
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.inputBg,
        
        // Altura aumentada para ficar confortável
        height: 56, 
        
        borderRadius: 16, // Bordas mais arredondadas
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 15,
        
        // Sombra leve no input para profundidade
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    
    inputIcon: {
        marginRight: 15,
    },
    
    input: {
        flex: 1,
        height: '100%', // Garante que o texto fique centralizado na altura nova
        color: COLORS.text,
        fontSize: 16, // Fonte um pouco maior para leitura melhor
    },
    // ----------------------------------------

    // --- BOTÃO DE LOGIN ---
    loginButtonContainer: {
        marginTop: 10,
        borderRadius: 16,
        overflow: 'hidden', // Importante para o gradiente respeitar a borda
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 8,
    },
    gradientButton: {
        height: 56, // Mesma altura dos inputs para consistência
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    },

    // --- RODAPÉ ---
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    footerText: {
        color: COLORS.textSecondary,
        fontSize: 14,
    },
    signupText: {
        color: '#FFD54F',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 5,
        textDecorationLine: 'underline',
    }
});