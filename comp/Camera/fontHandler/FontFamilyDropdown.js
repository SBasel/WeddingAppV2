import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions, StyleSheet } from 'react-native';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';
import { useLoadFonts, fontMap } from '../../fonts/useLoadFonts.js'


export function FontFamilyDropdown({ onFontFamilyChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [googleFonts, setGoogleFonts] = useState([]);
    const fontsLoaded = useLoadFonts();


    useEffect(() => {
  if (fontsLoaded) {
    const localFonts = Object.keys(fontMap); // Holt die Namen der Schriftarten aus fontMap
    setGoogleFonts(localFonts);
  }
}, [fontsLoaded]);

const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    return (
        <View style={styles.dropdownContainer}>
            <TouchableOpacity style={styles.iconDropdown} onPress={toggleDropdown}>
                <FontAwesome5 name="font" size={24} color="black" />
            </TouchableOpacity>

            {isOpen && (
                <View style={styles.dropdownMenu}>
                    <FlatList
                        data={googleFonts}
                        renderItem={({ item: font }) => (
                            <TouchableOpacity
                                style={styles.dropdownList}
                                onPress={() => {
                                    onFontFamilyChange(font);
                                    setIsOpen(false);
                                }}
                            >
                                <Text style={{ fontFamily: font }}>{font}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(font) => font}
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
