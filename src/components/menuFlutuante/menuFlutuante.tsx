import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, Modal, Animated, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { style, COLORS } from './style';

interface Props {
    currentRoute?: string;
}

export default function FloatingMenu({ currentRoute }: Props) {
    const navigation = useNavigation<any>();
    const route = useRoute();
    const activeRoute = currentRoute || route.name;
    const [modalVisible, setModalVisible] = useState(false);

    // Rotas do menu
    const routes = ['Home', 'Extrato', 'Metas', 'Menu'];
    
    // Animações
    const scaleAnims = useRef(routes.reduce((acc, r) => ({ ...acc, [r]: new Animated.Value(1) }), {} as any)).current;
    const centerButtonScale = useRef(new Animated.Value(1)).current;

    const navegar = (rota: string) => {
        // Animação de toque
        Animated.sequence([
            Animated.timing(scaleAnims[rota], { toValue: 0.8, duration: 50, useNativeDriver: true }),
            Animated.spring(scaleAnims[rota], { toValue: 1, friction: 4, useNativeDriver: true })
        ]).start();

        if (rota === 'Menu') {
            setModalVisible(true);
        } else {
            setModalVisible(false);
            navigation.navigate(rota);
        }
    };

    const animateCenterButton = () => {
        Animated.sequence([
            Animated.timing(centerButtonScale, { toValue: 0.9, duration: 100, useNativeDriver: true }),
            Animated.spring(centerButtonScale, { toValue: 1, friction: 3, tension: 100, useNativeDriver: true })
        ]).start();
        
        // Pequeno delay para a animação ser vista
        setTimeout(() => navigation.navigate('Transacao'), 150);
    };

    const isActive = (rota: string) => activeRoute === rota;

    // Componente de Ícone
    const RenderTab = ({ name, iconName, size = 24 }: any) => {
        const active = isActive(name);
        const color = active ? COLORS.activeIcon : COLORS.inactiveIcon;

        return (
            <TouchableOpacity 
                style={style.menuItem} 
                onPress={() => navegar(name)} 
                activeOpacity={1}
            >
                <Animated.View style={[style.iconContainer, { transform: [{ scale: scaleAnims[name] }] }]}>
                    <Feather name={iconName} size={size} color={color} />
                    {active && <View style={style.activeDot} />}
                </Animated.View>
            </TouchableOpacity>
        );
    };

    return (
        <>
            <View style={style.container}>
                <View style={style.menuBar}>
                    
                    {/* Esquerda */}
                    <RenderTab name="Home" iconName="home" />
                    <RenderTab name="Extrato" iconName="list" />

                    {/* Botão Central (Saindo da Gaveta) */}
                    <TouchableOpacity style={style.centerButtonContainer} onPress={animateCenterButton} activeOpacity={0.9}>
                        <Animated.View style={{ transform: [{ scale: centerButtonScale }] }}>
                            <LinearGradient
                                colors={[COLORS.primary, '#4C1D95']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={style.centerButton}
                            >
                                <Feather name="plus" size={28} color="#FFF" />
                            </LinearGradient>
                        </Animated.View>
                    </TouchableOpacity>

                    {/* Direita */}
                    <RenderTab name="Metas" iconName="target" />
                    <RenderTab name="Menu" iconName="grid" />

                </View>
            </View>

            {/* Modal de Menu Extra */}
            <Modal visible={modalVisible} transparent={true} animationType="fade" onRequestClose={() => setModalVisible(false)}>
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={style.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={style.modalContent}>
                                <View style={style.modalHeader}>
                                    <Text style={style.modalTitle}>MENU</Text>
                                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                                        <Ionicons name="close" size={24} color={COLORS.inactiveIcon} />
                                    </TouchableOpacity>
                                </View>
                                
                                <View style={style.modalGrid}>
                                    {[
                                        { route: 'Perfil', icon: 'user', color: COLORS.primary, label: 'Perfil' },
                                        { route: 'Desafios', icon: 'shield', color: '#F59E0B', label: 'Quests' },
                                        { route: 'Conquistas', icon: 'award', color: '#3B82F6', label: 'Rank' },
                                        { route: 'Relatorio', icon: 'pie-chart', color: '#EC4899', label: 'Dados' }
                                    ].map((item, index) => (
                                        <TouchableOpacity 
                                            key={index} 
                                            style={style.modalItem} 
                                            onPress={() => { setModalVisible(false); navigation.navigate(item.route); }}
                                            activeOpacity={0.7}
                                        >
                                            <Feather name={item.icon as any} size={24} color={item.color} />
                                            <Text style={style.modalItemText}>{item.label}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
}