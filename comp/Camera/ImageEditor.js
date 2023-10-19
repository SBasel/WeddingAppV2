import React, { useState, useRef } from 'react';
import { View, Image, TextInput, StyleSheet, TouchableOpacity, Text, Dimensions, PanResponder, KeyboardAvoidingView, Platform, Modal, ActivityIndicator, Slider, Picker } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { uploadImage } from './UploadImage.js';
import ViewShot from "react-native-view-shot";
import { FontColorDropdown } from './fontHandler/FontColorDropdown.js';
import { FontFamilyDropdown } from './fontHandler/FontFamilyDropdown.js';
import { FontSizeDropdown } from './fontHandler/FontSizeDropdown.js';


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
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isTextModalVisible, setTextModalVisible] = useState(false);
    const [textColor, setTextColor] = useState('black'); 
    const [fontFamily, setFontFamily] = useState('Arial'); 



    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,  // Hinzu
        onStartShouldSetPanResponderCapture: () => true,  // Hinzu
        onMoveShouldSetPanResponderCapture: () => true,  // Hinzu
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
    } 

    const onDiskSave = async (imageData) => {
        setIsLoading(true);

        if (!imageData) {
            setIsLoading(false);
            return;
        }

        try {
            await uploadImage(imageData);
            console.log("Erfolgreich gespeichert!");
            setModalVisible(true);
        } catch (error) {
            console.log("Fehler beim Speichern des Bildes.");
        }

        setIsLoading(false);
    }



    const captureImageWithText = async () => {
        try {
            const dataUri = await viewShotRef.current.capture({ format: 'base64' });
            console.log("Bild erfolgreich erfasst!");
            console.log("Test", dataUri)
            onDiskSave(dataUri);
        } catch (error) {
            console.log("Fehler beim Erfassen des Bildes: ", error);
        }
    };






    return (
        <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
        <View style={styles.editorContainer}>
            <ViewShot ref={viewShotRef} options={{ format: "png", quality: 1.0, result: "data-uri" }}>
            <Image source={{ uri: imageUri }} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height - 100 }} />
            
            {isEditing && (
                <TextInput
                    style={{...styles.textInput, fontSize: fontSize, left: textPosition.x, top: textPosition.y}}
                    value={text}
                    onChangeText={setText}
                    placeholder="Füge Text hinzu"
                    multiline={true}
                />
            )}
            
            {!isEditing && (
                <Text {...panResponder.panHandlers} style={{...styles.overlayText, fontSize: fontSize, color: textColor, fontFamily: fontFamily, left: textPosition.x, top: textPosition.y}}>{text}</Text>
            )}
            </ViewShot>
            <View style={styles.buttonContainer}>
                {isEditing ? (
                    <TouchableOpacity onPress={onSave}>
                        <FontAwesome5 name="check" size={24} color="green" />
                    </TouchableOpacity>
                ) : (
                    <>
                    <View style={styles.editcon}>
                        <TouchableOpacity onPress={() => setTextModalVisible(true)} style={styles.editb} >
                            <FontAwesome5 name="pen" size={24} />
                        </TouchableOpacity>
                        </View>  
                    <View style={styles.editcon}>    
                        <TouchableOpacity onPress={captureImageWithText } style={styles.editb}>
                            <FontAwesome5 name="save" size={24}   />
                        </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <FontAwesome5 name="times" size={24} color="black" />
            </TouchableOpacity>
            {capturedImage && (
            <Image source={{ uri: capturedImage }} style={{ width: 100, height: 100, position: 'absolute', bottom: 10, right: 10, zIndex: -999}} />
        )}
        {isLoading && (
            <View style={{...styles.centered, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )}
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
                    {/* Dropdown-Container */}
                    <View style={styles.dropdownContainer}>
                        {/* Schriftgröße ändern */}
                        <FontSizeDropdown style={styles.dropdownItem}
                            value={fontSize}
                            onFontSizeChange={value => setFontSize(value)}
                        />

                        {/* Textfarbe ändern */}
                        <FontColorDropdown style={styles.dropdownItem}
                            color={textColor}
                            onFontColorChange={color => setTextColor(color)}
                        />

                        {/* Schriftart ändern */}
                        <FontFamilyDropdown style={styles.dropdownItem}
                            fontFamily={fontFamily}
                            onFontFamilyChange={font => setFontFamily(font)}
                        />
                    </View>

                    {/* TextInput */}
                    <TextInput
                        value={text}
                        onChangeText={setText}
                        placeholder="Füge Text hinzu"
                        multiline={true}
                        style={{ 
                            color: textColor, 
                            fontSize: 18, 
                            fontFamily: fontFamily, 
                            width: '100%', // Damit es die volle Breite ausfüllt
                            borderColor: '#ccc',
                            borderWidth: 1,
                            marginBottom: 20, // Abstand zwischen Input-Feld und Button
                        }}
                    />
                    
                    {/* Bestätigen Button */}
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


        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => {
                setModalVisible(!isModalVisible);
            }}
        >
            <View style={styles.centered}>
                <View style={styles.modalView}>
                    <Text>Bild erfolgreich gespeichert!</Text>
                    <TouchableOpacity
                        style={{ marginTop: 10 }}
                        onPress={() => {
                            setModalVisible(!isModalVisible);
                            navigation.navigate('Camera'); // Navigiere zurück zur Camera
                        }}
                    >
                        <Text>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        </View>
        </KeyboardAvoidingView>
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
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    zIndex: 9999,
    paddingHorizontal: 5, 
    minWidth: 150, 
    maxWidth: Dimensions.get('window').width - 40,
},
    overlayText: {
        position: 'absolute',
        zIndex: 9999, 
    },
    buttonContainer: {
        position: 'absolute',
        right: 10,
        bottom: 100,
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 20, 
        right: 20,
    },
    editcon:{
        width: "50",
        height: "50",
        backgroundColor: "white",
        borderRadius: 50,
        marginBottom: 20,
    },
    editb: {
        color: "black",
        padding: 10,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        elevation: 5
    },
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






