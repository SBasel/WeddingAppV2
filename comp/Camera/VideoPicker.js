import React, { useState, useRef } from 'react';
import { TouchableOpacity, StyleSheet, Alert, Modal, View, Text, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export function VideoPicker() {
    const navigation = useNavigation();
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const xhr = useRef(null);

    const abortUpload = () => {
        if (xhr.current) {
            xhr.current.abort();
        }
    };

    const openVideoLibrary = async () => {
        setIsLoading(true); 
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permission to access media library is required!');
            setIsLoading(false);
            return;
        }
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos
        });
        setIsLoading(false);
        if (!pickerResult.canceled) {
            uploadVid(pickerResult.uri);
        }
    };

    const uploadVid = async (uri) => {
        setIsUploading(true);
        const CHUNK_SIZE = 10 * 1024 * 1024; // 10 MB
        const fileBlob = await fetch(uri).then(r => r.blob());
        const totalChunks = Math.ceil(fileBlob.size / CHUNK_SIZE);
        const uniqueId = Math.random().toString(36).substr(2, 9); // Generate a unique ID for this upload

        for (let i = 0; i < totalChunks; i++) {
            const startByte = i * CHUNK_SIZE;
            const endByte = Math.min(fileBlob.size, startByte + CHUNK_SIZE);
            const chunkBlob = fileBlob.slice(startByte, endByte);
            const formData = new FormData();
            formData.append('video', chunkBlob, `chunk_${i}.mp4`);
            formData.append('index', i.toString());
            formData.append('total', totalChunks.toString());
            formData.append('uniqueId', uniqueId);

            xhr.current = new XMLHttpRequest();
            xhr.current.open('POST', 'https://www.sbdci.de/kpw/uploadvid.php', true);
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
                    setModalVisible(true);
                } else {
                    console.error("Upload error");
                }
            };
            xhr.current.onerror = () => {
                console.error("Upload error");
                setIsUploading(false);
            };
            xhr.current.onabort = () => {
                console.log("Upload aborted");
                setIsUploading(false);
                setIsLoading(false);
            };
            xhr.current.send(formData);
        }
    };


    return (
        <>
            <TouchableOpacity style={styles.iconButton} onPress={openVideoLibrary}>
                <FontAwesome name="video-camera" size={32} />
                <Text>Upload a Video</Text>
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
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
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




