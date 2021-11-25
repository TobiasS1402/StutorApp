import { ScreenContainer, ScreenWrapper } from '@components/layout'
import * as React from 'react'
import { SafeAreaView, ScrollView, Text } from 'react-native'

export default function MyLessonsScreen() {
  return (
    <ScreenContainer>
      <SafeAreaView />
      <ScrollView>
        <ScreenWrapper>
          <Text>My Lessons</Text>
        </ScreenWrapper>
      </ScrollView>
    </ScreenContainer>
  )
}
