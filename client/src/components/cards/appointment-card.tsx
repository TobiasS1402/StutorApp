import * as React from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components/native'
import { Card } from '~/components/cards/card'
import { RoundedImage } from '~/components/general'
import { Container } from '~/components/layout/container'
import { color, spaces } from '~/theme'

interface AppointmentCardProps {
  day: string
  time: string
  course: string
  location: string
}
const AppointmentSubText = styled.Text`
  color: ${color.gray};
`

export const AppointmentCard = (props: AppointmentCardProps) => {
  return (
    <Card>
      <Container>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Text>{props.day}</Text>
            <AppointmentSubText>{props.time}</AppointmentSubText>
          </View>
          <View style={{ marginLeft: spaces.xl4 }}>
            <Text>{props.course}</Text>
            <AppointmentSubText>{props.location}</AppointmentSubText>
          </View>
        </View>
        <RoundedImage source={require('../../../assets/images/profile.jpeg')} width="40px" height="40px" />
      </Container>
    </Card>
  )
}
