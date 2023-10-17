import * as Font from 'expo-font';

// ...

async function loadFonts() {
  await Font.loadAsync({
    'Great-Vibes': require('./assets/fonts/GreatVibes-Regular.ttf'), // replace with your font's path
  });
}

// Call this function before rendering your app, such as in an AppLoading component or before your root component mounts.
