import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import { color } from '~/theme'
import { HomeStackScreen } from './home-stack-screen'

const Tab = createBottomTabNavigator()
const IconSize = 25

const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
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
            tabBarIcon: ({ color }) => <FontAwesome name={'th-large'} size={IconSize} color={color} solid />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default BottomTabNavigator
