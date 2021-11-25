import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '@screens/home'
import React from 'react'

const HomeStack = createNativeStackNavigator()

export const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  )
}
