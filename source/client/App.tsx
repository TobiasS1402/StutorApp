import initFonts from '@theme/fonts'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AuthProvider } from '@/contexts/auth'
import Navigation from '@/navigation'

export default class App extends React.Component {
  state = {
    fontsLoaded: false,
  }

  async componentDidMount() {
    await initFonts()
    this.setState({ fontsLoaded: true })
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <AuthProvider>
          <SafeAreaProvider>
            <Navigation />
            <StatusBar />
          </SafeAreaProvider>
        </AuthProvider>
      )
    } else {
      return null
    }
  }
}
