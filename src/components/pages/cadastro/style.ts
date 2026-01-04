import { StyleSheet } from "react-native";
export const COLORS = {
    primary: '#6A1B9A',      // Roxo
    secondary: '#FDD835',    // Amarelo
    background: '#121212',   // Fundo principal
    card: '#1E1E1E',         // Fundo dos cards
    textPrimary: '#FFFFFF',
    textSecondary: '#B0B0B0',
    inputBorder: '#4A4A4A',
    danger: '#D32F2F',       // Para o botão de Logout
};

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background, // fundo principal
    },

    header: {
        backgroundColor: COLORS.primary, // roxo
        height: "30%",
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
        backgroundColor: COLORS.card, // fundo dos cards
        width: "88%",
        alignSelf: "center",
        marginTop: -60,
        padding: 25,
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },

    title: {
        textAlign: "center",
        fontSize: 26,
        fontWeight: "bold",
        color: COLORS.textPrimary,
        marginBottom: 25,
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
        backgroundColor: COLORS.card,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        color: COLORS.textPrimary,
    },

    button: {
        backgroundColor: COLORS.primary, // amarelo
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
        color: COLORS.primary, // roxo
        fontWeight: "bold",
        fontSize: 14,
    },

    subtext: {
        color: COLORS.textPrimary
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.card,
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
