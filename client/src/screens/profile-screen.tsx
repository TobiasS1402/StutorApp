import { ScreenContainer, ScreenWrapper } from '@components/layout'
import * as React from 'react'
import { SafeAreaView, ScrollView, Text } from 'react-native'

export default function ProfileScreen() {
  return (
    <ScreenContainer>
      <SafeAreaView />
      <ScrollView>
        <ScreenWrapper>
          <Text>My Profile</Text>
        </ScreenWrapper>
      </ScrollView>
    </ScreenContainer>
  )
}
