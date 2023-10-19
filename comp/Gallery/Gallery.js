import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, FlatList, Modal, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export function Gallery() {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const slideShowInterval = useRef(null);

    useEffect(() => {
        fetchImages();
    }, []);

    useEffect(() => {
        if (isPlaying) {
            slideShowInterval.current = setInterval(() => {
                handleNext();
            }, 3000);

            return () => {
                clearInterval(slideShowInterval.current);
            };
        }
    }, [isPlaying, selectedImage]);

    const fetchImages = async () => {
        try {
            const response = await fetch('https://www.sbdci.de/kpw/get_images.php'); 
            const data = await response.json();
            setImages(data);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    const handleImagePress = (image) => {
        setSelectedImage(image);
        setShowModal(true);
    }

    const handleNext = () => {
        const currentIndex = images.indexOf(selectedImage);
        const nextIndex = (currentIndex + 1) % images.length;
        setSelectedImage(images[nextIndex]);
    }

    const handlePrev = () => {
        const currentIndex = images.indexOf(selectedImage);
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setSelectedImage(images[prevIndex]);
    }

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    }

    const closeModal = () => {
        setShowModal(false);
        setIsPlaying(false);
        clearInterval(slideShowInterval.current);
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={images}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleImagePress(item)}>
                        <Image 
                            source={{ uri: `https://www.sbdci.de/kpw/upload/${item}` }} 
                            style={styles.image} 
                        />
                    </TouchableOpacity>
                )}
                numColumns={3} 
            />
            
            {showModal && (
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={showModal}
                >
                    <View style={styles.modalContainer}>
                        <FontAwesome name="times" size={24} color="black" style={styles.closeIcon} onPress={closeModal} />

                        <Image 
                            source={{ uri: `https://www.sbdci.de/kpw/upload/${selectedImage}` }} 
                            style={styles.modalImage} 
                        />

                        <View style={styles.controls}>
                            <FontAwesome name="arrow-left" size={24} color="black" onPress={handlePrev} />
                            <FontAwesome name={isPlaying ? "pause" : "play"} size={24} color="black" onPress={togglePlay} />
                            <FontAwesome name="arrow-right" size={24} color="black" onPress={handleNext} />
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: "hidden",
        marginBottom: 65,
    },
    image: {
        width: 100,
        height: 150,
        margin: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalImage: {
        width: '90%',
        height: '70%',
        resizeMode: 'contain',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
        marginTop: 20,
    },
    closeIcon: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
});



