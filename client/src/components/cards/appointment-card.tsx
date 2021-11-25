import { Card } from '@components/cards/card'
import { Divider, RoundedImage, Title } from '@components/general'
import { Container } from '@components/layout/container'
import * as React from 'react'
import { View } from 'react-native'
import { color, spaces } from '@/theme'

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
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Title value={props.day} fontSize={14} fontFamily="Lato-Regular" />
            <Divider small />
            <Title
              value={props.time}
              fontSize={14}
              fontFamily="Lato-Regular"
              color={color.gray}
            />
          </View>
          <View style={{ marginLeft: spaces.xl4 }}>
            <Title
              value={props.course}
              fontSize={14}
              fontFamily="Lato-Regular"
            />
            <Divider small />
            <Title
              value={props.location}
              fontSize={14}
              fontFamily="Lato-Regular"
              color={color.gray}
            />
          </View>
        </View>
        <RoundedImage
          source={require('@assets/images/profile.jpeg')}
          width="40px"
          height="40px"
        />
      </Container>
    </Card>
  )
}
