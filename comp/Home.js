import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useLoadFonts } from './fonts/useLoadFonts';


export function Home({ navigation }) {
  const fontsLoaded = useLoadFonts();

  if (!fontsLoaded) {
    return null;
  }

    return (
        <View style={styles.titleMobile}>
            <Text style={styles.headerText}>Katharina</Text>
            <Text style={styles.headerText}>& Patrick</Text>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/placholder.jpeg')} style={styles.mainImage} />
                <Image source={require('../assets/framegold.png')} style={styles.frameImage} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    titleMobile: {
        width: "100%",
        height: "98%",
        alignItems: 'center',
        justifyContent: 'center',

    },
    headerText: {
        fontFamily: 'GreatVibes',
        fontSize: 50,
        textAlign: 'center',
    },
    imageContainer: {
        width: 300,
        height: 400,
    },
    mainImage: {
        position: 'absolute',
        top: 35,
        left: 53,
        width: '70%',
        height: '85%',
        resizeMode: 'cover',
    },
    frameImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 20,
        zIndex: 1,
    },
});
