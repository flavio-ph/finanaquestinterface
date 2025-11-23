import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, LayoutAnimation, Platform, UIManager, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";

// Habilita animações no Android
if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const COLORS = {
    primary: '#6A1B9A',
    secondary: '#FDD835',
    background: '#121212',
    card: '#1E1E1E',
    textPrimary: '#FFFFFF',
    textSecondary: '#B0B0B0',
    overlay: 'rgba(0,0,0,0.7)',
};

type MenuState = 'closed' | 'main' | 'gamification';

interface FloatingMenuProps {
    currentRoute: string; 
}

export default function FloatingMenu({ currentRoute }: FloatingMenuProps) {
    const navigation = useNavigation<any>();
    const [menuState, setMenuState] = useState<MenuState>('closed');

    const toggleMenu = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setMenuState(prev => prev === 'closed' ? 'main' : 'closed');
    };

    const openGamificationSubmenu = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setMenuState('gamification');
    };

    const backToMainMenu = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setMenuState('main');
    };

    const navegarPara = (rota: string) => {
        setMenuState('closed');
        navigation.navigate(rota);
    };

    // Componente de Item de Menu
    const MenuItem = ({ label, route, icon, color, isSubmenuTrigger = false, onPress }: any) => {
        return (
            <View style={styles.menuItem}>
                <View style={styles.menuLabel}>
                    <Text style={styles.menuLabelText}>{label}</Text>
                </View>
                <TouchableOpacity 
                    style={[styles.menuButton, { backgroundColor: COLORS.card, borderColor: color, borderWidth: isSubmenuTrigger ? 1 : 0 }]} 
                    onPress={onPress || (() => navegarPara(route))}
                >
                    <FontAwesome name={icon} size={20} color={color} />
                </TouchableOpacity>
            </View>
        );
    };

    // Botão de Ação Principal (Nova Transação)
    const ActionButton = () => (
        <View style={styles.menuItem}>
            <View style={styles.menuLabel}>
                <Text style={styles.menuLabelText}>Nova Transação</Text>
            </View>
            <TouchableOpacity 
                style={[styles.menuButton, { backgroundColor: COLORS.secondary }]} 
                onPress={() => navegarPara('Transacao')}
            >
                <FontAwesome name="plus" size={20} color={COLORS.background} />
            </TouchableOpacity>
        </View>
    );

    // Lógica de Renderização do Menu Principal
    const renderMainOptions = () => {
        // Opções padrão do menu (Ordem visual: Topo -> Base)
        // Queremos que a opção "substituída" (Home ou atual) fique na BASE (última renderizada)
        
        const defaultOptions = [
            { label: 'Perfil', route: 'Profile', icon: 'user', color: COLORS.textPrimary },
            { label: 'Relatórios', route: 'Relatorio', icon: 'pie-chart', color: COLORS.primary },
            { label: 'Metas', route: 'Metas', icon: 'bullseye', color: COLORS.primary },
            { label: 'Extrato', route: 'Extrato', icon: 'list-alt', color: COLORS.textPrimary },
        ];

        // Filtra a opção da página atual da lista padrão
        const filteredOptions = defaultOptions.filter(opt => opt.route !== currentRoute);

        return (
            <>
                {/* 1. Submenu Gamificação (Fica no topo visualmente) */}
                <MenuItem 
                    label="Gamificação" 
                    icon="trophy" 
                    color={COLORS.secondary} 
                    isSubmenuTrigger 
                    onPress={openGamificationSubmenu} 
                />

                {/* 2. Opções Padrão (Menos a atual) */}
                {filteredOptions.map((opt) => (
                    <MenuItem 
                        key={opt.route} 
                        label={opt.label} 
                        route={opt.route} 
                        icon={opt.icon} 
                        color={opt.color} 
                    />
                ))}

                {/* 3. Botão "Início" (Aparece se NÃO estiver na Home) */}
                {/* Sendo renderizado por último (antes do ActionButton), fica na base da pilha */}
                {currentRoute !== 'Home' && (
                    <MenuItem 
                        label="Início" 
                        route="Home" 
                        icon="home" 
                        color={COLORS.primary} 
                    />
                )}

                {/* 4. Botão de Ação Principal (Nova Transação) - Sempre visível exceto na própria tela */}
                {currentRoute !== 'Transacao' && <ActionButton />}
            </>
        );
    };

    return (
        <>
            {menuState !== 'closed' && (
                <TouchableWithoutFeedback onPress={() => setMenuState('closed')}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
            )}

            <View style={styles.menuContainer} pointerEvents="box-none">
                
                {menuState === 'main' && renderMainOptions()}

                {menuState === 'gamification' && (
                    <>
                        <MenuItem label="Desafios" route="Challenges" icon="flag" color={COLORS.primary} />
                        <MenuItem label="Conquistas" route="Challenges" icon="star" color={COLORS.secondary} />
                        
                        <View style={styles.menuItem}>
                            <View style={styles.menuLabel}>
                                <Text style={styles.menuLabelText}>Voltar</Text>
                            </View>
                            <TouchableOpacity 
                                style={[styles.menuButton, { backgroundColor: COLORS.background, borderColor: COLORS.textSecondary, borderWidth: 1 }]} 
                                onPress={backToMainMenu}
                            >
                                <FontAwesome name="arrow-left" size={18} color={COLORS.textPrimary} />
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>

            <TouchableOpacity 
                style={styles.fab} 
                onPress={toggleMenu}
                activeOpacity={0.8}
            >
                <FontAwesome 
                    name={menuState === 'closed' ? "bars" : "close"} 
                    size={24} 
                    color={COLORS.textPrimary} 
                />
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        backgroundColor: COLORS.primary,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        zIndex: 9999,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '200%', // Garante cobertura total
        width: '100%',
        backgroundColor: COLORS.overlay, 
        zIndex: 9998,
    },
    menuContainer: {
        position: 'absolute',
        bottom: 100, 
        right: 38,   
        alignItems: 'flex-end',
        zIndex: 9999,
        gap: 16, 
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 12,
    },
    menuLabel: {
        backgroundColor: COLORS.card,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginRight: 12,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    menuLabelText: {
        color: COLORS.textPrimary,
        fontSize: 14,
        fontWeight: '600',
    },
    menuButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.card,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});