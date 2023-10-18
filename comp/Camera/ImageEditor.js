import React, { useState, useRef } from 'react';
import { View, Image, TextInput, StyleSheet, TouchableOpacity, Text, Dimensions, PanResponder } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { uploadImage } from './UploadImage.js';
import ViewShot from "react-native-view-shot";


export function ImageEditor({ route, navigation }) {
    const { imageUri } = route.params;
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState('');
    const [fontSize, setFontSize] = useState(20);
    const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const viewShotRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);


    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt, gestureState) => {
            setOffsetX(textPosition.x - gestureState.x0);
            setOffsetY(textPosition.y - gestureState.y0);
        },
        onPanResponderMove: (evt, gestureState) => {
            setTextPosition({
                x: gestureState.moveX + offsetX,
                y: gestureState.moveY + offsetY
            });
        },
    });

    const onClose = () => {
        navigation.goBack();
    }

    const onSave = () => {
        setIsEditing(false);
        captureImageWithText()
    }

    const onDiskSave = async () => {
    if(!capturedImage) return; // Nur speichern, wenn ein erfasstes Bild vorhanden ist

    try {
        await uploadImage(capturedImage); // Speichern Sie das erfasste Bild und nicht das Originalbild
        console.log("Erfolgreich gespeichert!");
    } catch (error) {
        console.log("Fehler beim Speichern des Bildes.");
    }
}


const captureImageWithText = async () => {
    try {
        const dataUri = await viewShotRef.current.capture();
        setCapturedImage(dataUri);
        console.log("Bild erfolgreich erfasst!");
    } catch (error) {
        console.log("Fehler beim Erfassen des Bildes: ", error);
    }
};





    return (
        <View style={styles.editorContainer}>
            <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 1.0, result: "data-uri" }}>
            <Image source={{ uri: imageUri }} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height - 100 }} />
            
            {isEditing && (
                <TextInput
                    {...panResponder.panHandlers}
                    style={{...styles.textInput, fontSize: fontSize, left: textPosition.x, top: textPosition.y}}
                    value={text}
                    onChangeText={setText}
                    placeholder="Füge Text hinzu"
                    multiline={true}
                />
            )}
            
            {!isEditing && (
                <Text {...panResponder.panHandlers} style={{...styles.overlayText, fontSize: fontSize, left: textPosition.x, top: textPosition.y}}>{text}</Text>
            )}
            </ViewShot>
            <View style={styles.buttonContainer}>
                {isEditing ? (
                    <TouchableOpacity onPress={onSave}>
                        <FontAwesome5 name="check" size={24} color="green" />
                    </TouchableOpacity>
                ) : (
                    <>
                        <TouchableOpacity onPress={() => setIsEditing(true)}>
                            <FontAwesome5 name="pen" size={24} color="blue" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onDiskSave} style={{ marginTop: 10 }}>
                            <FontAwesome5 name="save" size={24} color="blue" />
                        </TouchableOpacity>
                    </>
                )}
            </View>

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <FontAwesome5 name="times" size={24} color="black" />
            </TouchableOpacity>
            {capturedImage && (
            <Image source={{ uri: capturedImage }} style={{ width: 100, height: 100, position: 'absolute', bottom: 10, right: 10 }} />
        )}
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
    paddingHorizontal: 5, 
    minWidth: 150, 
    maxWidth: Dimensions.get('window').width - 40,
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






