import { StyleSheet } from "react-native";

const COLORS = {
    primary: '#6A1B9A',     
    background: '#121212',   
    card: '#1E1E1E',         
    textPrimary: '#FFFFFF',  
    textSecondary: '#B0B0B0', 
    inputBorder: '#4A4A4A',
    divider: '#333',         
};
// ---------------------------------------------------

export const style = StyleSheet.create({

   container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '100%',
        minHeight: '100%',
        padding: 0, 
        backgroundColor: COLORS.background, 
    },
    form: {
        width: 350,
        borderRadius: 12, 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    login: {
        fontSize: 36,
        fontWeight: '700',
        color: COLORS.textPrimary, 
        marginBottom: 32,
    },

    possuiconta: {
        color: COLORS.textSecondary, 
        marginBottom: 32,
        marginTop: 24,
    },

    facalogin: {
        color: COLORS.primary, 
        fontWeight: '500'
    },

    emailsenha: {
        // Label "Email"
        color: COLORS.textSecondary,
        minWidth: '100%',
        textAlign: 'left', 
    },

    input: {
        // Estilo para o <TextInput>
        borderColor: COLORS.primary, 
        height: '100%',
        color: COLORS.textPrimary, 
        fontSize: 16,
    },

    boxinput: {
        // View do <TextInput>
        minWidth: '100%',
        height: 45,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.inputBorder, 
        marginTop: 8,
        paddingHorizontal: 10, 
        justifyContent: 'center',
    },

    senha: {
        // Label "Senha"
        marginTop: 24,
        color: COLORS.textSecondary,
        minWidth: '100%',
        textAlign: 'left',
    },

    esqueceusenha: {
        minWidth: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        marginBottom: 24,
    },

    textoesqueceusenha: {
        color: COLORS.primary, 
        fontWeight: '500'
    },

    botao: {
        minHeight: 50,
        minWidth: '100%',
        backgroundColor: COLORS.primary, 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10, 
    },

    textoentrar: {
        color: COLORS.textPrimary, 
        fontWeight: '500',
        fontSize: 16,
    },

    grupoOu: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '100%',
        marginTop: 16,
        gap: 16,
    },

    linha: {
        flex: 1, 
        height: 1, 
        backgroundColor: COLORS.divider, 
    },

    logo: {
        maxHeight: 16,
        minHeight: 16,
        width: 16,
    },

    logos: {
        // Botão de Login Social
        marginTop: 16,
        display: 'flex',
        flexDirection: 'row',
        minWidth: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        height: 50,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: COLORS.inputBorder, 
        borderRadius: 10,
    },

    textoLogo: {
        color: COLORS.textSecondary, 
        fontWeight: '500',
    },
 
});