import { Card } from '@components/cards/card'
import { Divider, RoundedImage, Title } from '@components/general'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Pressable, View } from 'react-native'
import styled from 'styled-components/native'
import { color, spaces } from '@/theme'

interface CourseDetailedCardProps {
  icon?: string
  name?: string
  amountOfLessons?: number
  routeName?: string
}

const defaultProps: CourseDetailedCardProps = {
  icon: '',
  name: '',
  amountOfLessons: 0,
  routeName: 'Courses',
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
      onPress={() => navigation.navigate(props.routeName as never, {} as never)}
    >
      <CourseColumnContainer>
        <RoundedImage
          source={require('@assets/images/software-architecture.png')}
          width="45px"
          height="45px"
        />
        <View style={{ marginLeft: spaces.xl4 }}>
          <Title value={props.name} fontSize={17} fontFamily="Lato-Bold" />
          <Divider small />
          <Title
            value={`${props.amountOfLessons} bijlessen`}
            fontSize={15}
            fontFamily="Lato-Regular"
            color={color.gray}
          />
        </View>
      </CourseColumnContainer>
    </Pressable>
  )
}

CourseDetailedCard.defaultProps = defaultProps
