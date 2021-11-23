import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Home } from '~/screens'

const HomeStack = createNativeStackNavigator()

export const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  )
}
