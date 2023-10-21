import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { VideoPicker } from './VideoPicker';


export function Camera() {
    const navigation = useNavigation();

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
        console.log("Image loaded from camera!");
        console.log(imageUri);

        navigation.navigate('ImageEditor', { imageUri: imageUri });
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
        console.log("Image loaded from library!");
        console.log(imageUri);

        // Navigieren Sie zur ImageEditor-Komponente und übergeben Sie den Bild-URI
        navigation.navigate('ImageEditor', { imageUri: imageUri });
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
                <VideoPicker/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        padding: 20
    },
    iconButton: {
        padding: 10
    }
});


