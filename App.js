import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './RootNavigator'; 
import  { useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

async function loadFonts() {
  await Font.loadAsync({
    'Great Vibes': require('./assets/fonts/GreatVibes-Regular.ttf'),
  });
}

export default function Main() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}


