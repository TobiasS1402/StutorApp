import { StatusBar } from 'expo-status-bar'
import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Navigation from '~/navigation'
import initFonts from '~/theme/fonts'

export default class App extends React.Component {
  state = {
    fontsLoaded: false,
  }

  async componentDidMount() {
    await initFonts()
    this.setState({ fontsLoaded: true })
    EStyleSheet.build()
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <SafeAreaProvider>
          <Navigation />
          <StatusBar />
        </SafeAreaProvider>
      )
    } else {
      return null
    }
  }
}
