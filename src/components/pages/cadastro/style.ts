import { StyleSheet, Dimensions } from "react-native";

// --- Constantes de Design (Tema FinanQuest) ---
const COLORS = {
    primary: '#6A1B9A',      // Roxo (Botões, Links)
    background: '#121212',   // Fundo principal da tela
    card: '#1E1E1E',         // Fundo do formulário/card
    textPrimary: '#FFFFFF',  // Títulos e texto principal
    textSecondary: '#B0B0B0', // Texto de apoio, placeholders, labels
    inputBorder: '#4A4A4A',   // Borda sutil para inputs
    divider: '#333',         // Linha "OU"
};
// ---------------------------------------------------

export const style = StyleSheet.create({

    container: {
        flex: 1, // Adicionado para garantir que o container preencha a tela
        alignItems: 'center',
        justifyContent: 'center', // Alterado para 'center' para verticalizar
        minWidth: '100%',
        padding: 0, // APLICADO: Removido padding para o form ir de borda a borda
        backgroundColor: COLORS.background, // APLICADO: Fundo escuro
    },
    form: {
        minWidth: 350,
        borderRadius: 12, 
        padding: 24,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },

    login: {
        fontSize: 32,
        fontWeight: '700',
        marginBottom: 16,
        color: COLORS.textPrimary, 
    },

    possuiconta: {
        color: COLORS.textSecondary, 
        marginBottom: 32,
        marginTop: 24,
        minWidth: '100%',
        textAlign: 'center',
    },

    facalogin: {
        color: COLORS.primary,
        fontWeight: '500'
    },

    emailsenha: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        minWidth: '100%',
        color: COLORS.textSecondary, 
    },

    input: {
        height: '100%',
        color: COLORS.textPrimary, 
        fontSize: 16,
    },


    boxinput: {
        minWidth: '100%',
        height: 45,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.inputBorder, 
        marginTop: 8,
        marginBottom: 24, 
        paddingHorizontal: 10,
        justifyContent: 'center',
    },

    senha: {
        color: COLORS.textSecondary, 
        minWidth: '100%',
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