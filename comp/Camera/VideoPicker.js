import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Alert, Modal, View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export function VideoPicker() {
    const navigation = useNavigation();
    const [progress, setProgress] = useState(0); // Fortschritt in Prozent
    const [isUploading, setIsUploading] = useState(false); // Zustand des Uploads

    const openVideoLibrary = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permission to access media library is required!');
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos // Hier wählen wir nur Videos aus.
        });
        
        if (pickerResult.canceled) {
            return;
        }

        const videoUri = pickerResult.uri;
        console.log("Video loaded from library!");
        console.log(videoUri);

        uploadVid(videoUri); // Video nach Auswahl hochladen

        // Hier können Sie navigieren oder etwas anderes mit dem Video tun.
        // Zum Beispiel:
        // navigation.navigate('VideoEditor', { videoUri: videoUri });
    };

    const uploadVid = async (uri) => {
        let videoData = `data:video/mp4;base64,${await toBase64(uri)}`; 

        let data = {
            video: videoData
        };

        setIsUploading(true);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://www.sbdci.de/kpw/uploadvid.php', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percentComplete = Math.round((event.loaded / event.total) * 100);
                setProgress(percentComplete);
            }
        };

        xhr.onload = () => {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
            } else {
                console.error("Fehler beim Hochladen des Videos");
            }
            setIsUploading(false);
        };

        xhr.onerror = (e) => {
            console.error("Fehler beim Hochladen des Videos", e);
            setIsUploading(false);
        };

        xhr.send(JSON.stringify(data));
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
                        </View>
                    </View>
                </Modal>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    iconButton: {
        padding: 10
    }
});