import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { style, COLORS } from './style';

interface Props {
    currentRoute?: string;
}

export default function FloatingMenu({ currentRoute }: Props) {
    const navigation = useNavigation<any>();
    const route = useRoute();
    const activeRoute = currentRoute || route.name;
    
    // Estado para controlar o Modal de "Mais Opções"
    const [modalVisible, setModalVisible] = useState(false);

    const navegar = (rota: string) => {
        setModalVisible(false); // Fecha o menu se estiver aberto
        navigation.navigate(rota);
    };

    const isActive = (rota: string) => activeRoute === rota;

    return (
        <>
            <View style={style.container}>
                <View style={style.menuBar}>
                    
                    {/* 1. HOME */}
                    <TouchableOpacity style={style.menuItem} onPress={() => navegar('Home')}>
                        <FontAwesome name="home" size={24} color={isActive('Home') ? COLORS.active : COLORS.inactive} />
                        {isActive('Home') && <Text style={style.activeLabel}>Home</Text>}
                    </TouchableOpacity>

                    {/* 2. EXTRATO */}
                    <TouchableOpacity style={style.menuItem} onPress={() => navegar('Extrato')}>
                        <FontAwesome name="list-alt" size={22} color={isActive('Extrato') ? COLORS.active : COLORS.inactive} />
                        {isActive('Extrato') && <Text style={style.activeLabel}>Extrato</Text>}
                    </TouchableOpacity>

                    {/* 3. CENTRAL (NOVA TRANSAÇÃO) */}
                    <TouchableOpacity style={style.centerButtonContainer} onPress={() => navegar('Transacao')} activeOpacity={0.9}>
                        <LinearGradient colors={[COLORS.gradientStart, COLORS.gradientEnd]} style={style.centerButton}>
                            <FontAwesome name="plus" size={24} color={COLORS.white} />
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* 4. METAS */}
                    <TouchableOpacity style={style.menuItem} onPress={() => navegar('Metas')}>
                        <FontAwesome name="bullseye" size={24} color={isActive('Metas') ? COLORS.active : COLORS.inactive} />
                        {isActive('Metas') && <Text style={style.activeLabel}>Metas</Text>}
                    </TouchableOpacity>

                    {/* 5. MENU (CORRIGIDO: Texto só aparece se modalVisible for true) */}
                    <TouchableOpacity style={style.menuItem} onPress={() => setModalVisible(true)}>
                        <MaterialIcons 
                            name="grid-view" 
                            size={26} 
                            color={modalVisible ? COLORS.active : COLORS.inactive} 
                        />
                        {/* AQUI ESTÁ A CORREÇÃO: Condicional adicionada */}
                        {modalVisible && <Text style={style.activeLabel}>Menu</Text>}
                    </TouchableOpacity>

                </View>
            </View>

            {/* --- MODAL DE MAIS OPÇÕES --- */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={style.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={style.modalContent}>
                                <View style={style.modalHeader}>
                                    <Text style={style.modalTitle}>Navegação Completa</Text>
                                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                                        <FontAwesome name="close" size={20} color="#888" />
                                    </TouchableOpacity>
                                </View>

                                <View style={style.modalGrid}>
                                    {/* Perfil */}
                                    <TouchableOpacity style={style.modalItem} onPress={() => navegar('Perfil')}>
                                        <FontAwesome name="user" size={20} color={COLORS.active} />
                                        <Text style={style.modalItemText}>Meu Perfil</Text>
                                    </TouchableOpacity>

                                    {/* Desafios */}
                                    <TouchableOpacity style={style.modalItem} onPress={() => navegar('Desafios')}>
                                        <FontAwesome name="shield" size={20} color="#FFAB00" />
                                        <Text style={style.modalItemText}>Desafios</Text>
                                    </TouchableOpacity>

                                    {/* Conquistas */}
                                    <TouchableOpacity style={style.modalItem} onPress={() => navegar('Conquistas')}>
                                        <FontAwesome name="trophy" size={20} color="#29B6F6" />
                                        <Text style={style.modalItemText}>Conquistas</Text>
                                    </TouchableOpacity>

                                    {/* Relatórios */}
                                    <TouchableOpacity style={style.modalItem} onPress={() => navegar('Relatorio')}>
                                        <FontAwesome name="pie-chart" size={20} color="#E040FB" />
                                        <Text style={style.modalItemText}>Relatórios</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
}