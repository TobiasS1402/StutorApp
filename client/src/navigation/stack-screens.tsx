import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { CoursesScreen, HomeScreen } from '@/screens'

const StackNavigator = createNativeStackNavigator()

const HomeStackScreen = () => {
  return (
    <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <StackNavigator.Screen name="Home" component={HomeScreen} />
    </StackNavigator.Navigator>
  )
}

const CourseStackScreen = () => {
  return (
    <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <StackNavigator.Screen name="Courses" component={CoursesScreen} />
    </StackNavigator.Navigator>
  )
}

export { HomeStackScreen, CourseStackScreen }
