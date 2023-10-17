import { useFonts } from 'expo-font';

export const useLoadFonts = () => {
  const [fontsLoaded] = useFonts({
    'Great Vibes': require('../../assets/fonts/GreatVibes.ttf'),
  });

  return fontsLoaded;
};
