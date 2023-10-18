import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export function FontSizeDropdown({ fontSize, onFontSizeChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 56, 64];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <View style={styles.dropdownContainer}>
            <TouchableOpacity style={styles.iconDropdown} onPress={toggleDropdown}>
                <FontAwesome5 name="text-height" size={24} color="black" />
            </TouchableOpacity>

            {isOpen && (
                <View style={styles.dropdownMenu}>
                    <FlatList
                        data={fontSizes}
                        renderItem={({ item: size }) => (
                            <TouchableOpacity
                                style={styles.dropdownList}
                                onPress={() => {
                                    onFontSizeChange(size);
                                    setIsOpen(false);
                                }}
                            >
                                <Text>{size}px</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(size) => size.toString()}
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
        padding: 10,
    },
});
