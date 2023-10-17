import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './RootNavigator'; 

export default function Main() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}


