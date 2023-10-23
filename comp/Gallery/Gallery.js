import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, FlatList, Modal, TouchableOpacity} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ReactPlayer from 'react-player';

export function Gallery() {
    const [combinedData, setCombinedData] = useState([]);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const slideShowInterval = useRef(null);

    useEffect(() => {
        fetchMedia();
    }, []);

    useEffect(() => {
        if (isPlaying) {
            slideShowInterval.current = setInterval(() => {
                handleNext();
            }, 2000);

            return () => {
                clearInterval(slideShowInterval.current);
            };
        }
    }, [isPlaying, selectedMedia]);

    const fetchMedia = async () => {
        try {
            const imgResponse = await fetch('https://www.sbdci.de/kpw/get_images.php');
            const vidResponse = await fetch('https://www.sbdci.de/kpw/get_vid.php');
            const imgs = await imgResponse.json();
            const vids = await vidResponse.json();

            setCombinedData([...imgs, ...vids]);
        } catch (error) {
            console.error("Error fetching media:", error);
        }
    };

    const handleMediaPress = (media) => {
        setSelectedMedia(media);
        if (media.endsWith('.mp4')) {
            setShowVideoModal(true);
        } else {
            setShowImageModal(true);
        }
    }
    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    }

    const handleNext = () => {
        const currentIndex = combinedData.indexOf(selectedMedia);
        const nextIndex = (currentIndex + 1) % combinedData.length;
        setSelectedMedia(combinedData[nextIndex]);
    }

    const handlePrev = () => {
        const currentIndex = combinedData.indexOf(selectedMedia);
        const prevIndex = (currentIndex - 1 + combinedData.length) % combinedData.length;
        setSelectedMedia(combinedData[prevIndex]);
    }

    const closeModal = () => {
        setShowImageModal(false);
        setShowVideoModal(false);
        setIsPlaying(false);
        clearInterval(slideShowInterval.current);
    }

    const renderMediaItem = ({ item }) => {
    if (item.endsWith('.mp4')) {
        return (
            <TouchableOpacity onPress={() => handleMediaPress(item)}>
                <View style={{ ...styles.image, justifyContent: 'center', alignItems: 'center', backgroundColor: 'grey' }}>
                    <FontAwesome name="play" size={48} color="white" style={{ position: 'absolute' }} />
                </View>
            </TouchableOpacity>
        );
    } else {
        return (
            <TouchableOpacity onPress={() => handleMediaPress(item)}>
                <Image 
                    source={{ uri: `https://www.sbdci.de/kpw/upload/${item}` }} 
                    style={styles.image} 
                />
            </TouchableOpacity>
        );
    }
};


    return (
        <View style={styles.container}>
            <FlatList
                data={combinedData}
                keyExtractor={(item) => item}
                renderItem={renderMediaItem}
                numColumns={3} 
            />

            {showImageModal && (
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={showImageModal}
                >
                    <View style={styles.modalContainer}>
                        <FontAwesome name="times" size={24} color="black" style={styles.closeIcon} onPress={closeModal} />
                        <Image 
                            source={{ uri: `https://www.sbdci.de/kpw/upload/${selectedMedia}` }} 
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

            {showVideoModal && (
    <Modal
        animationType="slide"
        transparent={false}
        visible={showVideoModal}
    >
        <View style={styles.modalContainer}>
            <FontAwesome name="times" size={24} color="black" style={styles.closeIcon} onPress={closeModal} />
            <ReactPlayer 
    url={`https://www.sbdci.de/kpw/upload/${selectedMedia}`} 
    style={styles.modalVideoContainer}
    controls={true}
    width="90%"
    height="70%"
    playing
    preload="auto"
/>
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
    modalVideoContainer: {
        width: '90%',
        height: '70%',
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






