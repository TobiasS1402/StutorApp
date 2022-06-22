import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import {
  AppointmentScreen,
  CourseDetailScreen,
  CoursesScreen,
  HomeScreen,
  MyLessonsDetailScreen,
  MyLessonsScreen,
  ProfileScreen,
} from '@/screens'

export type NavigatorParamList = {
  Home: undefined
  Courses: undefined
  CourseDetail: { courseId: number; courseName: string }
  Appointment: { lessonId: number }
  MyLessons: undefined
  MyLessonsDetail: undefined
  Profile: undefined
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends NavigatorParamList {}
  }
}

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
      <StackNavigator.Screen name="CourseDetail" component={CourseDetailScreen} />
      <StackNavigator.Screen name="Appointment" component={AppointmentScreen} />
    </StackNavigator.Navigator>
  )
}

const MyLessonsStackScreen = () => {
  return (
    <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <StackNavigator.Screen name="MyLessons" component={MyLessonsScreen} />
      <StackNavigator.Screen name="MyLessonsDetail" component={MyLessonsDetailScreen} />
    </StackNavigator.Navigator>
  )
}

const ProfileStackScreen = () => {
  return (
    <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <StackNavigator.Screen name="Profile" component={ProfileScreen} />
    </StackNavigator.Navigator>
  )
}

export { HomeStackScreen, CourseStackScreen, MyLessonsStackScreen, ProfileStackScreen }
