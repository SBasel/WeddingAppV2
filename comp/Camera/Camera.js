import React from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import ImagePicker from 'react-native-image-picker';

export function Camera({ onCapture = () => {}, onClose }) {

    const openCamera = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*;capture=camera';
    input.onchange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            onCapture(e.target.result);
        };
        reader.readAsDataURL(file);
    };
    input.click();
};


    const openPhotoLibrary = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            onCapture(e.target.result);
        };
        reader.readAsDataURL(file);
    };
    input.click();
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


