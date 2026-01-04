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
    sectionTitle: '#4A4A4A', 
};

type MenuState = 'closed' | 'open';
type SectionType = 'gamificacao' | 'financas' | 'geral' | null;

interface FloatingMenuProps {
    currentRoute: string; 
}

export default function FloatingMenu({ currentRoute }: FloatingMenuProps) {
    const navigation = useNavigation<any>();
    const [menuState, setMenuState] = useState<MenuState>('closed');
    const [activeSection, setActiveSection] = useState<SectionType>(null);

    const toggleMenu = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if (menuState === 'closed') {
            setMenuState('open');
            setActiveSection(null); // Reseta seções ao abrir
        } else {
            setMenuState('closed');
            setActiveSection(null);
        }
    };

    const toggleSection = (section: SectionType) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setActiveSection(activeSection === section ? null : section);
    };

    const navegarPara = (rota: string) => {
        setMenuState('closed');
        navigation.navigate(rota);
    };

    // Componente de Item de Menu (Folha)
    const MenuItem = ({ label, route, icon, color, onPress }: any) => {
        return (
            <View style={styles.menuItem}>
                <View style={styles.menuLabel}>
                    <Text style={styles.menuLabelText}>{label}</Text>
                </View>
                <TouchableOpacity 
                    style={[styles.menuButton, { backgroundColor: COLORS.card, borderColor: color, borderWidth: 0 }]} 
                    onPress={onPress || (() => navegarPara(route))}
                >
                    <FontAwesome name={icon} size={18} color={color} />
                </TouchableOpacity>
            </View>
        );
    };

    // Componente de Seção (Pai) - Agora é um botão clicável
    const SectionTrigger = ({ title, sectionKey, icon, color }: { title: string, sectionKey: SectionType, icon: any, color: string }) => {
        const isActive = activeSection === sectionKey;
        return (
            <View style={styles.menuItem}>
                <View style={[styles.menuLabel, isActive && { backgroundColor: COLORS.primary }]}>
                    <Text style={[styles.menuLabelText, isActive && { color: '#FFF' }]}>{title}</Text>
                </View>
                <TouchableOpacity 
                    style={[styles.menuButton, { backgroundColor: COLORS.card, borderColor: color, borderWidth: 1 }]} 
                    onPress={() => toggleSection(sectionKey)}
                >
                    <FontAwesome name={isActive ? "chevron-down" : icon} size={20} color={color} />
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

    const renderMenuContent = () => {
        
        // 1. Seção Gamificação
        const renderGamification = () => {
            if (activeSection === 'gamificacao') {
                return (
                    <>
                        <MenuItem label="Desafios" route="Challenges" icon="flag" color={COLORS.primary} />
                        <MenuItem label="Conquistas" route="Conquistas" icon="star" color={COLORS.secondary} />
                    </>
                );
            }
            return null;
        };

        // 2. Seção Finanças
        const renderFinance = () => {
            if (activeSection === 'financas') {
                const options = [
                    { label: 'Extrato', route: 'Extrato', icon: 'list-alt', color: COLORS.textPrimary },
                    { label: 'Metas', route: 'Metas', icon: 'bullseye', color: COLORS.primary },
                    { label: 'Relatórios', route: 'Relatorio', icon: 'pie-chart', color: COLORS.primary },
                ].filter(opt => opt.route !== currentRoute);

                return options.map(opt => (
                    <MenuItem key={opt.route} label={opt.label} route={opt.route} icon={opt.icon} color={opt.color} />
                ));
            }
            return null;
        };

        // 3. Seção Geral
        const renderGeral = () => {
            if (activeSection === 'geral') {
                return (
                    <>
                        {currentRoute !== 'Profile' && <MenuItem label="Perfil" route="Profile" icon="user" color={COLORS.textPrimary} />}
                        {currentRoute !== 'Home' && <MenuItem label="Início" route="Home" icon="home" color={COLORS.primary} />}
                    </>
                );
            }
            return null;
        };

        // Lógica de Exibição Principal (Acordeão)
        // Se uma seção está ativa, mostramos o trigger dela + itens.
        // Se nenhuma está ativa, mostramos todos os triggers.
        
        return (
            <>
                {/* GAMIFICAÇÃO */}
                {renderGamification()}
                {(activeSection === null || activeSection === 'gamificacao') && (
                    <SectionTrigger title="Gamificação" sectionKey="gamificacao" icon="trophy" color={COLORS.secondary} />
                )}

                {/* FINANÇAS */}
                {renderFinance()}
                {(activeSection === null || activeSection === 'financas') && (
                    <SectionTrigger title="Finanças" sectionKey="financas" icon="bank" color={COLORS.primary} />
                )}

                {/* GERAL */}
                {renderGeral()}
                {(activeSection === null || activeSection === 'geral') && (
                    <SectionTrigger title="Geral" sectionKey="geral" icon="bars" color={COLORS.textPrimary} />
                )}

                {/* AÇÃO PRINCIPAL (Sempre visível no nível raiz) */}
                {activeSection === null && currentRoute !== 'Transacao' && (
                    <View style={{ marginTop: 8 }}>
                        <ActionButton />
                    </View>
                )}
            </>
        );
    };

    return (
        <>
            {menuState === 'open' && (
                <TouchableWithoutFeedback onPress={() => setMenuState('closed')}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
            )}

            <View style={styles.menuContainer} pointerEvents="box-none">
                {menuState === 'open' && renderMenuContent()}
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
        height: '200%', 
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
        gap: 12, 
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 8,
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