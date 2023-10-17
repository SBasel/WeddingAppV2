import React, { useState } from 'react';
import { View, Modal } from 'react-native';
import { Camera } from './Camera';
import { ImageEditor } from './ImageEditor';  // Angenommen, dies ist der richtige Import

export function ImageHandler() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

    const onImageCaptured = (imageData) => {
        setSelectedImage(imageData);
        setModalVisible(true); // Modal öffnen, wenn ein Bild ausgewählt wurde
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
                    <ImageEditor stickerSource={selectedImage} onClose={closeModal} />
                </Modal>
            )}
        </View>
    );
}

