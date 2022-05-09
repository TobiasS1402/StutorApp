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

/**
 * Navigation to the main page of the application
 * @constructor
 */
const HomeStackScreen = () => {
  return (
    <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <StackNavigator.Screen name="Home" component={HomeScreen} />
    </StackNavigator.Navigator>
  )
}

/**
 * Navigation to the Courses page of the application and for the details of the appointments
 * @constructor
 */
const CourseStackScreen = () => {
  return (
    <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <StackNavigator.Screen name="Courses" component={CoursesScreen} />
      <StackNavigator.Screen name="CourseDetail" component={CourseDetailScreen} />
      <StackNavigator.Screen name="Appointment" component={AppointmentScreen} />
    </StackNavigator.Navigator>
  )
}

/**
 * Navigation to the tutoring page of the application and also for the creating of a new tutoring
 * @constructor
 */
const MyLessonsStackScreen = () => {
  return (
    <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <StackNavigator.Screen name="MyLessons" component={MyLessonsScreen} />
      <StackNavigator.Screen name="MyLessonsDetail" component={MyLessonsDetailScreen} />
    </StackNavigator.Navigator>
  )
}

/**
 * Navigation to the profile page of the application
 * @constructor
 */
const ProfileStackScreen = () => {
  return (
    <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <StackNavigator.Screen name="Profile" component={ProfileScreen} />
    </StackNavigator.Navigator>
  )
}

export { HomeStackScreen, CourseStackScreen, MyLessonsStackScreen, ProfileStackScreen }
