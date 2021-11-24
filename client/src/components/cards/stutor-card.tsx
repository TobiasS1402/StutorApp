import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { Card } from '~/components/cards/card'
import { IconDetail, RoundedImage, Title } from '~/components/general'
import { Container } from '~/components/layout/container'
import { color, spaces } from '~/theme'

interface StutorCardProps {
  name: string
  description: string
  hasDetails?: boolean
  costs?: number
  rating?: number
  duration?: string
}

const defaultProps: StutorCardProps = {
  name: '',
  description: '',
  hasDetails: false,
  costs: 0,
  rating: 0,
  duration: '',
}

const Description = styled.Text`
  margin: ${spaces.xl}px 0;
  color: ${color.gray};
  font-size: 12px;
  font-family: 'Lato-Regular';
`

export const StutorCard = (props: StutorCardProps) => {
  return (
    <Card>
      <Container padding={spaces.xl3}>
        <RoundedImage
          source={require('../../../assets/images/profile.jpeg')}
          width="55px"
          height="55px"
          right={spaces.xl3}
        />
        <View style={{ flex: 1 }}>
          <Title value={props.name} fontFamily="Lato-Bold" fontSize={18} />
          <Description>{props.description}</Description>
          {props.hasDetails && (
            <View style={{ flexDirection: 'row' }}>
              <IconDetail
                iconName="bitcoin"
                iconSize={18}
                iconColor={color.yellow}
                detailValue={props.costs}
              />
              <IconDetail
                iconName="star"
                iconSize={16}
                iconColor={color.yellow}
                detailValue={props.rating}
              />
              <IconDetail
                iconName="clock"
                iconSize={16}
                iconColor={color.grayLight}
                detailValue={props.duration}
              />
            </View>
          )}
        </View>
      </Container>
    </Card>
  )
}

StutorCard.defaultProps = defaultProps
