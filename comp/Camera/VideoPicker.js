import React, { useState, useRef } from 'react';
import { TouchableOpacity, StyleSheet, Alert, Modal, View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';


export function VideoPicker() {
    const navigation = useNavigation();
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    
    const xhr = useRef(null);

    const abortUpload = () => {
        console.log("Attempting to abort upload");
        if (xhr.current) {
            console.log("XHR exists. Trying to abort...");
            xhr.current.abort();
        } else {
            console.log("XHR does not exist or is not initialized.");
        }
    };

    const openVideoLibrary = async () => {
    setIsLoading(true); 

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
        Alert.alert('Permission to access media library is required!');
        setIsLoading(false);  // Setzen Sie es auf false, wenn die Berechtigung nicht erteilt wird
        return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos
    });
    
    setIsLoading(false);  // Setzen Sie es auf false, sobald die Auswahl abgeschlossen ist (unabhängig vom Ergebnis)

    if (!pickerResult.canceled) {
        const videoUri = pickerResult.uri;
        uploadVid(videoUri);
    }
};


    const uploadVid = async (uri) => {
        setIsUploading(true);
        
        
        let videoData = `data:video/mp4;base64,${await toBase64(uri)}`;
        
        let data = {
            video: videoData
        };

        xhr.current = new XMLHttpRequest();
        xhr.current.open('POST', 'https://www.sbdci.de/kpw/uploadvid.php', true);
        xhr.current.setRequestHeader('Content-Type', 'application/json');
        
        xhr.current.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percentComplete = Math.round((event.loaded / event.total) * 100);
                setProgress(percentComplete);
            }
        };

        xhr.current.onload = () => {
            setIsUploading(false);
            if (xhr.current.status === 200) {
                console.log(xhr.current.responseText);
                setModalVisible(true); // Zeige das erfolgreiche Upload-Modal an
            } else {
                console.error("Fehler beim Hochladen des Videos");
            }
        };

        xhr.current.onerror = () => {
            console.error("Fehler beim Hochladen des Videos");
            setIsUploading(false);
        };

        xhr.current.onabort = () => {
            console.log("Upload was aborted");
            setIsUploading(false);
            setIsLoading(false);
        };

        xhr.current.send(JSON.stringify(data));
    };

    const toBase64 = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    return (
        <>
            <TouchableOpacity style={styles.iconButton} onPress={openVideoLibrary}>
                <FontAwesome name="video-camera" size={32} />
            </TouchableOpacity>
            {isLoading && (
            <View style={{...styles.centered, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
            )}
            {isUploading && (
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={isUploading}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10, alignItems: 'center'}}>
                            <Text>Uploading Video...</Text>
                            <Text>{progress}%</Text>
                            <TouchableOpacity style={styles.cancelButton} onPress={abortUpload}>
                                <Text style={{ color: 'white' }}>Abbrechen</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
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
                        <Text>Video erfolgreich gespeichert!</Text>
                        <TouchableOpacity
                            style={{ marginTop: 10 }}
                            onPress={() => {
                                setModalVisible(!isModalVisible);
                                navigation.navigate('Camera');
                            }}
                        >
                            <Text>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    iconButton: {
        padding: 10
    },
    cancelButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 5
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center'
    }
});




