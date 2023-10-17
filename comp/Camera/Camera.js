import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert, Modal, Image, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';

export function Camera({ onCapture = () => {}, onClose }) {
    const [isImageModalVisible, setImageModalVisible] = useState(false);
    const [selectedImageUri, setSelectedImageUri] = useState(null);

    const showImageModal = (imageUri) => {
        setSelectedImageUri(imageUri);
        setImageModalVisible(true);
    }

    const hideImageModal = () => {
        setImageModalVisible(false);
    }

    const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
        Alert.alert('Permission to access camera is required!');
        return;
    }

    const pickerResult = await ImagePicker.launchCameraAsync();
    if (pickerResult.canceled) {
        return;
    }

    const imageUri = pickerResult.assets[0].uri;

    console.log("Image loaded!");
    console.log(imageUri)
    onCapture(imageUri);
    showImageModal(imageUri);
};

const openPhotoLibrary = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
        Alert.alert('Permission to access media library is required!');
        return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.canceled) {
        return;
    }

    const imageUri = pickerResult.assets[0].uri;

    console.log("Image loaded!");
    console.log(imageUri)
    onCapture(imageUri);
    showImageModal(imageUri);
};


    return (
        <View style={styles.cameraContainer}>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.iconButton} onPress={openPhotoLibrary}>
                    <FontAwesome name="upload" size={32} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={openCamera}>
                    <FontAwesome name="camera" size={32} />
                </TouchableOpacity>
            </View>

            {/* Modal to show selected image */}
            {selectedImageUri && (
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={isImageModalVisible}
                    onRequestClose={hideImageModal}
                >
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                }}>
                        {console.log("Rendering modal with image:", selectedImageUri)}
                        <Image 
                        source={{ uri: selectedImageUri }}
                        style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                    />
                    <Button title="Schließen" onPress={hideImageModal} />
                </View>
            </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    cameraContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mirroredVideo: {
        width: '100%',
        height: '100%',
        transform: [{ scaleX: -1 }]
    },
    webcamView: {
        width: '100%',
        height: '100%',
    },
    cameraControls: {
        position: 'absolute',
        bottom: 100,
        right: 10,
        flexDirection: 'column',
        zIndex: 1,
    },
    captureButton: {
        position: 'absolute',
        bottom: 10,
        left: '50%',
        transform: [{ translateX: -0.5 }],
        zIndex: 1,
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#fff',
        borderColor: 'rgba(0, 0, 0, 0.5)',
        borderWidth: 5,
    },
    capturedImage: {
        width: '100%',
        height: '85%',
    },
    iconButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 50,
        padding: 10,
    },
    iconButtonClose: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 50,
        padding: 10,
    },
    textEditorPanel: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(248, 248, 248, 1)',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderWidth: 1,
        borderColor: '#e4e4e4',
        padding: 20,
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 3,
    },
    textInputSection: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    fontControlsSection: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
        justifyContent: 'space-evenly',
        padding: 10,
        borderRadius: 8,
    },
    roundButton: {
        borderRadius: 50,
        width: 30,
        height: 30,
        backgroundColor: 'transparent',
        borderColor: '#dcdcdc',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textareaFixed: {
        width: 300,
        height: 100,
    },
    modalCam: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -0.5 }, { translateY: -0.5 }],
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        zIndex: 1000,
    }
});


