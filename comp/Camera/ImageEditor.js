import React, { useState, useRef } from 'react';
import { View, Image, TextInput, StyleSheet, TouchableOpacity, Text, Dimensions, PanResponder } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export function ImageEditor({ route, navigation }) {
    const { imageUri } = route.params;
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState('');
    const [fontSize, setFontSize] = useState(20);
    const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gestureState) => {
                setTextPosition({
                    x: textPosition.x + gestureState.dx,
                    y: textPosition.y + gestureState.dy
                });
            },
            onPanResponderRelease: () => {
                // Optional: Hier können Sie zusätzlichen Code hinzufügen, um die Endposition zu speichern.
            }
        })
    ).current;

    const onClose = () => {
        navigation.goBack();
    }

    const onSave = () => {
        setIsEditing(false);
    }

    return (
        <View style={styles.editorContainer}>
            <Image source={{ uri: imageUri }} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height - 100 }} />
            
            {isEditing && (
                <TextInput
                    style={{...styles.textInput, fontSize: fontSize, top: textPosition.y, left: textPosition.x}}
                    value={text}
                    onChangeText={setText}
                    placeholder="Füge Text hinzu"
                />
            )}
            
            {!isEditing && (
                <Text
                    style={{...styles.overlayText, fontSize: fontSize, top: textPosition.y, left: textPosition.x}}
                    {...panResponder.panHandlers}
                >
                    {text}
                </Text>
            )}
            
            <View style={styles.buttonContainer}>
                {isEditing ? (
                    <TouchableOpacity onPress={onSave}>
                        <FontAwesome5 name="check" size={24} color="green" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => setIsEditing(true)}>
                        <FontAwesome5 name="pen" size={24} color="blue" />
                    </TouchableOpacity>
                )}
            </View>

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <FontAwesome5 name="times" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    editorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        position: 'absolute',
        color: 'black',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 4,
        zIndex: 5, 
    },
    overlayText: {
        position: 'absolute',
        color: 'black',
        zIndex: 5, 
    },
    buttonContainer: {
        position: 'absolute',
        right: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 20, 
        right: 20,
    },
});






