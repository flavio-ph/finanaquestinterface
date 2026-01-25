import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, Modal, Animated, Easing, TouchableWithoutFeedback } from 'react-native';
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

    // Mapeamento das rotas para controlar animações individuais
    const routes = ['Home', 'Extrato', 'Metas', 'Menu'];
    
    // Cria uma referência animada para cada ícone (escala)
    const scaleAnims = useRef(routes.reduce((acc, r) => ({ ...acc, [r]: new Animated.Value(1) }), {} as any)).current;

    const navegar = (rota: string) => {
        // Animação de "Click" (Encolhe e volta, igual Framer Motion)
        const anim = scaleAnims[rota] || new Animated.Value(1);
        
        Animated.sequence([
            Animated.timing(anim, { toValue: 0.8, duration: 100, useNativeDriver: true }),
            Animated.spring(anim, { toValue: 1, friction: 3, tension: 40, useNativeDriver: true })
        ]).start();

        if (rota === 'Menu') {
            setModalVisible(true);
        } else {
            setModalVisible(false);
            setTimeout(() => navigation.navigate(rota), 150);
        }
    };

    const isActive = (rota: string) => activeRoute === rota;

    // Componente auxiliar para renderizar ícone animado
    const RenderTab = ({ name, iconLib: IconLib, iconName, size = 24 }: any) => {
        const active = isActive(name);
        // Se estiver ativo, cor Branca, senão Cinza
        const color = active ? COLORS.activeIcon : COLORS.inactiveIcon;
        // Se estiver ativo, brilha (Glow)
        const textShadow = active ? { textShadowColor: COLORS.primary, textShadowRadius: 10 } : {};

        return (
            <TouchableOpacity 
                style={style.menuItem} 
                onPress={() => navegar(name)}
                activeOpacity={1} // Tiramos a opacidade padrão para controlar via Animated
            >
                <Animated.View style={{ transform: [{ scale: scaleAnims[name] }] }}>
                    {/* Indicador de fundo (Bolinha Roxa) apenas se ativo */}
                    {active && (
                        <View style={{
                            position: 'absolute',
                            width: 40, height: 40,
                            borderRadius: 20,
                            backgroundColor: COLORS.primary,
                            opacity: 0.2, // Brilho suave atrás
                            top: -8, left: -8 // Centraliza manual
                        }} />
                    )}
                    
                    <IconLib 
                        name={iconName} 
                        size={size} 
                        color={color} 
                        style={textShadow}
                    />
                </Animated.View>
            </TouchableOpacity>
        );
    };

    return (
        <>
            <View style={style.container}>
                <View style={style.menuBar}>
                    
                    {/* 1. HOME */}
                    <RenderTab name="Home" iconLib={FontAwesome} iconName="home" />

                    {/* 2. EXTRATO */}
                    <RenderTab name="Extrato" iconLib={FontAwesome} iconName="list-alt" size={22} />

                    {/* 3. CENTRAL (TRANSAÇÃO) */}
                    <TouchableOpacity 
                        style={style.centerButtonContainer} 
                        onPress={() => navigation.navigate('Transacao')} 
                        activeOpacity={0.9}
                    >
                        <View style={style.centerButton}>
                            <View style={style.centerIconCircle}>
                                <FontAwesome name="plus" size={24} color="#FFF" />
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* 4. METAS */}
                    <RenderTab name="Metas" iconLib={FontAwesome} iconName="bullseye" />

                    {/* 5. MENU */}
                    <RenderTab name="Menu" iconLib={MaterialIcons} iconName="grid-view" size={26} />

                </View>
            </View>

            {/* --- MODAL --- */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={style.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={style.modalContent}>
                                <View style={style.modalHeader}>
                                    <Text style={style.modalTitle}>Explorar</Text>
                                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                                        <Ionicons name="close-circle" size={30} color="#555" />
                                    </TouchableOpacity>
                                </View>

                                <View style={style.modalGrid}>
                                    {[
                                        { route: 'Perfil', icon: 'user', color: COLORS.primary, label: 'Perfil' },
                                        { route: 'Desafios', icon: 'shield', color: '#F59E0B', label: 'Quests' },
                                        { route: 'Conquistas', icon: 'trophy', color: '#3B82F6', label: 'Rank' },
                                        { route: 'Relatorio', icon: 'pie-chart', color: '#EC4899', label: 'Dados' }
                                    ].map((item, index) => (
                                        <TouchableOpacity 
                                            key={index}
                                            style={style.modalItem} 
                                            onPress={() => { setModalVisible(false); navigation.navigate(item.route); }}
                                        >
                                            <FontAwesome name={item.icon as any} size={28} color={item.color} />
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