import { Card } from '@components/cards/card'
import { Divider, RoundedImage, Title } from '@components/general'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Pressable, View } from 'react-native'
import styled from 'styled-components/native'
import { color, spaces, typography } from '@/theme'

interface CourseDetailedCardProps {
  id: number
  name: string
  icon?: string
  amountOfLessons?: number
}

const CourseColumnContainer = styled(Card)`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${spaces.xl}px;
  padding: ${spaces.xl4}px;
`

export const CourseDetailedCard = (props: CourseDetailedCardProps) => {
  const navigation = useNavigation()

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('CourseDetail', { courseId: props.id, courseName: props.name })
      }
    >
      <CourseColumnContainer>
        <RoundedImage
          source={require('@assets/images/software-architecture.png')}
          width="45px"
          height="45px"
        />
        <View style={{ marginLeft: spaces.xl4 }}>
          <Title value={props.name} fontSize={typography.lg.fontSize} fontFamily="Lato-Bold" />
          <Divider small />
          <Title
            value={`${props.amountOfLessons} bijlessen`}
            fontSize={typography.md.fontSize}
            fontFamily="Lato-Regular"
            color={color.gray}
          />
        </View>
      </CourseColumnContainer>
    </Pressable>
  )
}
