import React, { useState } from 'react';
import { View, Modal, Image, Button } from 'react-native';
import { Camera } from './Camera';

export function ImageHandler() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

    const onImageCaptured = (imageData) => {
        setSelectedImage(imageData);
        setModalVisible(true); // Öffnen Sie das Modal, wenn ein Bild ausgewählt wurde
    };

    const closeModal = () => {
        setModalVisible(false);
    }

    return (
        <View style={{ flex: 1 }}>
            <Camera onCapture={onImageCaptured} />
            
            {selectedImage && (
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={isModalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={{ uri: selectedImage }} style={{ width: 300, height: 300 }} />
                        <Button title="Schließen" onPress={closeModal} />
                    </View>
                </Modal>
            )}
        </View>
    );
}


