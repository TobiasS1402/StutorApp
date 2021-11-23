import * as Font from 'expo-font'

const initFonts = async () => {
  await Font.loadAsync({
    Lato: require('../../../assets/fonts/Lato-Regular.ttf'),

    // font weights
    'Lato-Thin': {
      uri: require('../../../assets/fonts/Lato-Thin.ttf'),
      display: Font.FontDisplay.FALLBACK,
    },
    'Lato-Light': {
      uri: require('../../../assets/fonts/Lato-Light.ttf'),
      display: Font.FontDisplay.FALLBACK,
    },
    'Lato-Regular': {
      uri: require('../../../assets/fonts/Lato-Regular.ttf'),
      display: Font.FontDisplay.FALLBACK,
    },
    'Lato-Bold': {
      uri: require('../../../assets/fonts/Lato-Bold.ttf'),
      display: Font.FontDisplay.FALLBACK,
    },
    'Lato-Black': {
      uri: require('../../../assets/fonts/Lato-Black.ttf'),
      display: Font.FontDisplay.FALLBACK,
    },
  })
}

export default initFonts
