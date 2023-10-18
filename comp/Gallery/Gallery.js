import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, FlatList } from 'react-native';

export function Gallery() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await fetch('https://www.sbdci.de/kpw/get_images.php'); 
            const data = await response.json();
            setImages(data);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={images}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <Image 
                        source={{ uri: `https://www.sbdci.de/kpw/upload/${item}` }} 
                        style={styles.image} 
                    />
                )}
                numColumns={3} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        margin: 5,
    },
});


