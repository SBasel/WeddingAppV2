// TextEditor.js
import React from 'react';
import { View, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontColorDropdown } from './fontHandler/FontColorDropdown.js';
import { FontFamilyDropdown } from './fontHandler/FontFamilyDropdown.js';
import { FontSizeDropdown } from './fontHandler/FontSizeDropdown.js';

export function TextEditor({ 
    isTextModalVisible, 
    setTextModalVisible, 
    text, 
    setText, 
    textColor, 
    setTextColor, 
    fontFamily, 
    setFontFamily, 
    fontSize, 
    setFontSize 
}) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isTextModalVisible}
            onRequestClose={() => {
                setTextModalVisible(!isTextModalVisible);
            }}
        >
            <View style={styles.inputText}>
                <View style={styles.modalInputText}>
                    <View style={styles.dropdownContainer}>
                        <FontSizeDropdown 
                            style={styles.dropdownItem}
                            value={fontSize}
                            onFontSizeChange={value => setFontSize(value)}
                        />
                        <FontColorDropdown 
                            style={styles.dropdownItem}
                            color={textColor}
                            onFontColorChange={color => setTextColor(color)}
                        />
                        <FontFamilyDropdown 
                            style={styles.dropdownItem}
                            fontFamily={fontFamily}
                            onFontFamilyChange={font => setFontFamily(font)}
                        />
                    </View>
                    <TextInput
                        value={text}
                        onChangeText={setText}
                        placeholder="Füge Text hinzu"
                        multiline={true}
                        style={{ 
                            color: textColor, 
                            fontSize: 18, 
                            fontFamily: fontFamily, 
                            width: '100%',
                            borderColor: '#ccc',
                            borderWidth: 1,
                            marginBottom: 20,
                        }}
                    />
                    <TouchableOpacity
                        style={{ marginTop: 10 }}
                        onPress={() => {
                            setTextModalVisible(!isTextModalVisible);
                        }}
                    >
                        <FontAwesome5 name="check" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    inputText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.8)',  // Semi-transparenter Hintergrund
    marginTop: -100,  // Um das Modal nach oben zu verschieben
    },
    modalInputText: {
    width: '100%',
    height: '100%',
    backgroundColor: "white",
    padding: 35,
    justifyContent: "center",
    alignItems: "center",
    },
    dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,  // Abstand zwischen den Dropdowns und dem Input-Feld               
    },
    dropdownItem: {  // Neuer Stil für die einzelnen Dropdowns
        width: '30%',  // Gib jeder Dropdown 30% der Breite
        margin: 5,  // Ein bisschen Abstand zwischen den Dropdowns
    },
});
