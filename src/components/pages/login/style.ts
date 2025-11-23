import { StyleSheet } from "react-native";

// --- Constantes de Design (Tema FinanQuest) ---
export const COLORS = {
    primary: '#6A1B9A',      // Roxo
    background: '#121212',   // Fundo principal
    card: '#1E1E1E',         // Fundo dos cards/inputs
    textPrimary: '#FFFFFF',
    textSecondary: '#B0B0B0',
    inputBorder: '#333333',
    divider: '#333',
};
// ---------------------------------------------------

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    subtext: {
        color: COLORS.textPrimary,
        
    },

    header: {
        backgroundColor: COLORS.primary,
        height: "60%",
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,

    },

    logo: {
        width: 60,
        height: 60,
        tintColor: COLORS.textPrimary,
    },

    card: {
        backgroundColor: COLORS.card,
        width: "88%",
        alignSelf: "center",
        marginTop: -60,
        padding: 25,
        borderRadius: 25,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 6,
    },

    title: {
        textAlign: "center",
        fontSize: 26,
        fontWeight: "bold",
        color: COLORS.textPrimary,
        marginBottom: 8,
    },

    inputGroup: {
        marginBottom: 18,
    },

    label: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 6,
    },

    input: {
        height: 50,
        backgroundColor: "#1A1A1A", // leve contraste mantendo tema dark
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        color: COLORS.textPrimary,
    },

    button: {
        backgroundColor: COLORS.primary,
        height: 50,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },

    buttonText: {
        color: COLORS.textPrimary,
        fontSize: 16,
        fontWeight: "bold",
    },

    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },

    footerText: {
        color: COLORS.textSecondary,
        fontSize: 14,
    },

    footerLink: {
        color: COLORS.primary,
        fontWeight: "bold",
        fontSize: 14,
    },
     dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.divider,
    },
    dividerText: {
        marginTop: 24,
        color: COLORS.textSecondary,
        paddingHorizontal: 16,
        fontSize: 14,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 8,
    },
    socialButton: {
        width: 60,
        height: 60,
        borderRadius: 12,
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },

});