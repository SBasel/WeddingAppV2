import React from 'react';
import { TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export function VideoPicker() {
    const navigation = useNavigation();

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

        try {
            const response = await fetch('https://www.sbdci.de/kpw/uploadvid.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const text = await response.text();
            console.log(text);
        } catch (error) {
            console.error("Fehler beim Hochladen des Videos", error);
        }
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
        <TouchableOpacity style={styles.iconButton} onPress={openVideoLibrary}>
            <FontAwesome name="video-camera" size={32} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    iconButton: {
        padding: 10
    }
});
