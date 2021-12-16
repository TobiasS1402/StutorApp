import { Card } from '@components/cards/card'
import { Divider, PlainText, RoundedImage } from '@components/general'
import { Container } from '@components/layout/container'
import * as React from 'react'
import { View } from 'react-native'
import { spaces } from '@/theme'

interface AppointmentCardProps {
  day: string
  time: string
  course: string
  location: string
}

export const AppointmentCard = (props: AppointmentCardProps) => {
  return (
    <Card>
      <Container>
        <Container>
          <View>
            <PlainText black>{props.day}</PlainText>
            <Divider small />
            <PlainText>{props.time}</PlainText>
          </View>
          <View style={{ marginLeft: spaces.xl4 }}>
            <PlainText black>{props.course}</PlainText>
            <Divider small />
            <PlainText>{props.location}</PlainText>
          </View>
        </Container>
        <RoundedImage source={require('@assets/images/profile.jpeg')} width="40px" height="40px" />
      </Container>
    </Card>
  )
}
