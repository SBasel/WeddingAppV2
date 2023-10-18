import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faCamera, faImage, faBars, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { Home } from './comp/Home'
import { Camera } from './comp/Camera/Camera';
import { ImageEditor } from './comp/Camera/ImageEditor';

const Stack = createStackNavigator();

function CustomFooter({}) {
  const navigation = useNavigation();
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Home')}>
        <FontAwesomeIcon icon={faHouse} size={32} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Camera')}>
        <FontAwesomeIcon icon={faCamera} size={32} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Help')}>
        <FontAwesomeIcon icon={faQuestion} size={32} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Gallery')}>
        <FontAwesomeIcon icon={faImage} size={32} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Option')}>
        <FontAwesomeIcon icon={faBars} size={32} />
      </TouchableOpacity>
      
    </View>
  );
}

export function RootNavigator() {
  return (
    <>
      <Stack.Navigator
  screenOptions={{
    headerShown: false
  }}
  initialRouteName="Home"
>
        <Stack.Screen name="Home" component={Home} />
         <Stack.Screen name="Camera" component={Camera} />
         <Stack.Screen name="ImageEditor" component={ImageEditor} />
      </Stack.Navigator>
      <CustomFooter />
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(239, 239, 240, 0.884)',
    padding: 10,
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
  },
  icon: {
    padding: 10,
  },
});

