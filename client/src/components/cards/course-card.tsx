import { Card } from '@components/cards/card'
import { Divider, RoundedImage, Title } from '@components/general'
import { useNavigation } from '@react-navigation/native'
import spaces from '@theme/spaces'
import React from 'react'
import { Pressable } from 'react-native'
import styled from 'styled-components/native'
import { typography } from '@/theme'

interface CourseCardProps {
  name?: string
  routeName?: string
}

const defaultProps: CourseCardProps = {
  name: '',
  routeName: 'Courses',
}

const CourseColumnContainer = styled(Card)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 200px;
  margin-right: ${spaces.xl}px;
`

export const CourseCard = (props: CourseCardProps) => {
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
        <Divider />
        <Title
          value={props.name}
          aligned="center"
          fontSize={typography.md.fontSize}
          fontFamily="Lato-Bold"
        />
      </CourseColumnContainer>
    </Pressable>
  )
}

CourseCard.defaultProps = defaultProps
