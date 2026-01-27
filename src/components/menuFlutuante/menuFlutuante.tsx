import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, Modal, Animated, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { style, COLORS } from './style';

interface Props {
    currentRoute?: string;
}

export default function FloatingMenu({ currentRoute }: Props) {
    const navigation = useNavigation<any>();
    const route = useRoute();
    const activeRoute = currentRoute || route.name;
    const [modalVisible, setModalVisible] = useState(false);

    const routes = ['Home', 'Extrato', 'Metas', 'Menu'];
    const scaleAnims = useRef(routes.reduce((acc, r) => ({ ...acc, [r]: new Animated.Value(1) }), {} as any)).current;
    const centerButtonScale = useRef(new Animated.Value(1)).current;

    const navegar = (rota: string) => {
        const anim = scaleAnims[rota] || new Animated.Value(1);
        
        Animated.sequence([
            Animated.timing(anim, { toValue: 1.3, duration: 150, useNativeDriver: true }),
            Animated.spring(anim, { toValue: 1, friction: 4, tension: 80, useNativeDriver: true })
        ]).start();

        if (rota === 'Menu') {
            setTimeout(() => setModalVisible(true), 100);
        } else {
            setModalVisible(false);
            setTimeout(() => navigation.navigate(rota), 200);
        }
    };

    const animateCenterButton = () => {
        Animated.sequence([
            Animated.timing(centerButtonScale, { toValue: 1.2, duration: 100, useNativeDriver: true }),
            Animated.spring(centerButtonScale, { toValue: 1, friction: 3, tension: 100, useNativeDriver: true })
        ]).start();
        setTimeout(() => navigation.navigate('Transacao'), 150);
    };

    const isActive = (rota: string) => activeRoute === rota;

    const RenderTab = ({ name, iconLib: IconLib, iconName, size = 20 }: any) => {
        const active = isActive(name);
        const color = active ? COLORS.activeIcon : COLORS.inactiveIcon;

        const containerStyles = [
            style.iconContainer,
            active && style.activeIconContainer,
            { transform: [{ scale: scaleAnims[name] }] }
        ];

        return (
            <TouchableOpacity style={style.menuItem} onPress={() => navegar(name)} activeOpacity={1}>
                <Animated.View style={containerStyles}>
                    <IconLib name={iconName} size={size} color={color} />
                </Animated.View>
            </TouchableOpacity>
        );
    };

    return (
        <>
            <View style={style.container}>
                <View style={style.menuBar}>
                    
                    {/* Ordem Vertical: Cima para Baixo */}
                    <RenderTab name="Home" iconLib={FontAwesome} iconName="home" size={22} />
                    <RenderTab name="Extrato" iconLib={FontAwesome} iconName="list-alt" size={20} />

                    {/* Botão Central (Agora deslocado para a esquerda) */}
                    <TouchableOpacity style={style.centerButtonContainer} onPress={animateCenterButton} activeOpacity={1}>
                        <Animated.View style={[style.centerButton, { transform: [{ scale: centerButtonScale }] }]}>
                            <View style={style.centerIconCircle}>
                                <FontAwesome name="plus" size={24} color="#FFF" />
                            </View>
                        </Animated.View>
                    </TouchableOpacity>

                    <RenderTab name="Metas" iconLib={FontAwesome} iconName="bullseye" size={22} />
                    <RenderTab name="Menu" iconLib={MaterialIcons} iconName="grid-view" size={24} />

                </View>
            </View>

            {/* Modal permanece igual */}
            <Modal visible={modalVisible} transparent={true} animationType="fade" onRequestClose={() => setModalVisible(false)}>
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={style.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={style.modalContent}>
                                <View style={style.modalHeader}>
                                    <Text style={style.modalTitle}>MENU RÁPIDO</Text>
                                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                                        <Ionicons name="close-circle" size={32} color={COLORS.primary} />
                                    </TouchableOpacity>
                                </View>
                                <View style={style.modalGrid}>
                                    {[
                                        { route: 'Perfil', icon: 'user', color: COLORS.primary, label: 'Perfil' },
                                        { route: 'Desafios', icon: 'shield', color: '#F59E0B', label: 'Desafios' },
                                        { route: 'Conquistas', icon: 'trophy', color: '#3B82F6', label: 'Rank' },
                                        { route: 'Relatorio', icon: 'pie-chart', color: '#EC4899', label: 'Dados' }
                                    ].map((item, index) => (
                                        <TouchableOpacity key={index} style={style.modalItem} onPress={() => { setModalVisible(false); navigation.navigate(item.route); }}>
                                            <FontAwesome name={item.icon as any} size={30} color={item.color} />
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