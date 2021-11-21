import React from 'react'
import { AppRegistry, Text, View } from 'react-native'

class App extends React.Component {
  render() {
    return (
      <View>
        <Text>Welcome</Text>
      </View>
    )
  }
}

AppRegistry.registerComponent('main', () => App)
