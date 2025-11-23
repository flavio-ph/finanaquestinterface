import { StyleSheet } from "react-native";

export const COLORS = {
    primary: '#6A1B9A',      
    background: '#121212',   
    card: '#1E1E1E',         
    textPrimary: '#FFFFFF',
    textSecondary: '#B0B0B0',
    inputBorder: '#333333',
    income: '#4CAF50',       
    expense: '#F44336',     
};
// ---------------------------------------------------

export const style = StyleSheet.create({
    container: {
        paddingTop: 32

        ,
        flex: 1,
        backgroundColor: COLORS.background,
    },
    
    monthSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
        backgroundColor: COLORS.background, 
    },
    monthNavButton: {
        padding: 8,
    },
    monthLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.textPrimary,
    },

   
    filterContainer: {
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    filterScroll: {
        gap: 8, 
    },
    filterChip: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.inputBorder,
        backgroundColor: COLORS.card,
        marginRight: 8, 
    },
    filterChipActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    filterLabel: {
        color: COLORS.textSecondary,
        fontWeight: '500',
    },
    filterLabelActive: {
        color: COLORS.textPrimary,
        fontWeight: '700',
    },

    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 80, // Espaço extra para não ficar escondido atrás de tab bars ou FABs
    },
    sectionHeader: { 
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textSecondary,
        marginTop: 16,
        marginBottom: 8,
    },
    transactionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.card,
        padding: 16,
        borderRadius: 12,
        marginBottom: 8,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    detailsContainer: {
        flex: 1,
    },
    description: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.textPrimary,
    },
    category: {
        fontSize: 13,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    amountContainer: {
        alignItems: 'flex-end',
    },
    amount: {
        fontSize: 16,
        fontWeight: '600',
    },
    dateText: { // Pequena data se não usar section header
        fontSize: 12,
        color: COLORS.textSecondary,
        marginTop: 4,
    }
});