import { useFonts } from 'expo-font';

export const fontMap = {
  'GreatVibes': require('../../assets/fonts/GreatVibes.ttf'),
  'Caveat-VariableFont_wght': require('../../assets/fonts/Caveat/Caveat-VariableFont_wght.ttf'),
  'Courgette-Regular': require('../../assets/fonts/Courgette/Courgette-Regular.ttf'),
  'DancingScript-VariableFont_wght': require('../../assets/fonts/Dancing_Script/DancingScript-VariableFont_wght.ttf'),
  'GloriaHallelujah-Regular': require('../../assets/fonts/Gloria_Hallelujah/GloriaHallelujah-Regular.ttf'),
  'HomemadeApple-Regular': require('../../assets/fonts/Homemade_Apple/HomemadeApple-Regular.ttf'),
  'IndieFlower-Regular': require('../../assets/fonts/Indie_Flower/IndieFlower-Regular.ttf'),
  'LuckiestGuy-Regular': require('../../assets/fonts/Luckiest_Guy/LuckiestGuy-Regular.ttf'),
  'Pacifico-Regular': require('../../assets/fonts/Pacifico/Pacifico-Regular.ttf'),
  'PatrickHand-Regular': require('../../assets/fonts/Patrick_Hand/PatrickHand-Regular.ttf'),
  'PermanentMarker-Regular': require('../../assets/fonts/Permanent_Marker/PermanentMarker-Regular.ttf'),
  'Sacramento-Regular': require('../../assets/fonts/Sacramento/Sacramento-Regular.ttf'),
  'Satisfy-Regular': require('../../assets/fonts/Satisfy/Satisfy-Regular.ttf'),
  'ShadowsIntoLight-Regular': require('../../assets/fonts/Shadows_Into_Light/ShadowsIntoLight-Regular.ttf'),
  'YujiHentaiganaAkari-Regular': require('../../assets/fonts/Yuji_Hentaigana_Akari/YujiHentaiganaAkari-Regular.ttf'),
  'Zeyada-Regular': require('../../assets/fonts/Zeyada/Zeyada-Regular.ttf'),
};

export const useLoadFonts = () => {
  const [fontsLoaded] = useFonts(fontMap);
  return fontsLoaded;
};

