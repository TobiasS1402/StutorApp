import {
  CourseStackScreen,
  HomeStackScreen,
  MyLessonsStackScreen,
  ProfileStackScreen,
} from '@navigation/stack-screens'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import color from '@theme/color'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'

const Tab = createBottomTabNavigator()
const IconSize = 25

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

const BottomTabNavigator = (props: NavigationProps) => {
  return (
    <NavigationContainer {...props}>
      <Tab.Navigator
        screenOptions={() => ({
          tabBarActiveTintColor: color.primary,
          tabBarInactiveTintColor: color.grayLight,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarLabelPosition: 'below-icon',
          tabBarStyle: {
            height: 60,
            borderTopWidth: 1,
            borderTopColor: color.grayLightest,
          },
        })}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name={'th-large'} size={IconSize} color={color} solid />
            ),
          }}
        />
        <Tab.Screen
          name="CoursesScreen"
          component={CourseStackScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name={'compass'} size={IconSize} color={color} solid />
            ),
          }}
        />
        <Tab.Screen
          name="MyLessonsScreen"
          component={MyLessonsStackScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name={'star'} size={IconSize} color={color} solid />
            ),
          }}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileStackScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name={'user-circle'} size={IconSize} color={color} solid />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default BottomTabNavigator
