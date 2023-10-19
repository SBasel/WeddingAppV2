import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export function Help() {
    return (
        <View style={styles.imageContainer}>
            <Image source={require('../../assets/help.png')} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: '85%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 600,
        resizeMode: 'contain', 
    },
});
