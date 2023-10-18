import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 

export function FontColorDropdown({ fontColor, onFontColorChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const fontColors = [
    '#000000', // Schwarz
    '#FF0000', // Rot
    '#00FF00', // Grün
    '#0000FF', // Blau
    '#FFFF00', // Gelb
    '#FF00FF', // Magenta
    '#00FFFF', // Cyan
    '#D4AF37', // Gold
    '#C0C0C0', // Silber
    '#800000', // Dunkelrot
    '#008000', // Dunkelgrün
    '#000080', // Dunkelblau
    '#808000', // Oliv
    '#800080', // Lila
    '#008080', // Blaugrün
    '#FFFFFF', // Weiß
    '#808080', // Grau
    '#FFA500', // Orange
    '#A52A2A', // Braun
    '#FFC0CB', // Pink
    '#F5DEB3', // Weizenfarben
    '#32CD32', // Limonengrün
    '#FA8072', // Lachs
    '#E6E6FA'  // Lavendel
    ];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <View style={styles.dropdownContainer}>
            <TouchableOpacity style={styles.iconDropdown} onPress={toggleDropdown}>
                <FontAwesome5 name="palette" size={24} color="black" />
            </TouchableOpacity>

            {isOpen && (
                <View style={styles.dropdownMenu}>
                    <FlatList
                        data={fontColors}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={{
                                    ...styles.dropdownList,
                                    backgroundColor: item,
                                }}
                                onPress={() => {
                                    onFontColorChange(item);
                                    setIsOpen(false);
                                }}
                            />
                        )}
                        numColumns={5} // Wie viele Farben pro Zeile angezeigt werden sollen
                        keyExtractor={(item) => item}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    dropdownContainer: {

        flexDirection: 'row',
    },
    iconDropdown: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f5f5f5',
    },
    dropdownMenu: {

        maxHeight: 150,
        overflow: 'scroll',
        borderRadius: 8,
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        backgroundColor: '#fff',
        padding: 10,
    },
    dropdownList: {
        width: 24,
        height: 24,
        borderRadius: 12,
        margin: 5,
    },
});
