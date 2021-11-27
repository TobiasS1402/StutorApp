import { Card } from '@components/cards/card'
import { Divider, Title } from '@components/general'
import React from 'react'
import { View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import styled from 'styled-components/native'
import { color } from '@/theme'

interface InfoCardProps {
  value?: string
  infoName?: string
  icon?: string
}

const defaultProps: InfoCardProps = {
  value: '',
  infoName: '',
  icon: 'question-circle',
}

const CardContainer = styled(Card)`
  flex-direction: row;
  width: 180px;
  align-items: center;
`

export const InfoCard = (props: InfoCardProps) => {
  return (
    <CardContainer>
      <FontAwesome name={props.icon} size={30} color={color.yellow} solid />
      <Divider small />
      <View>
        <Title value={props.value} fontSize={18} fontFamily="Lato-Bold" />
        <Title
          value={props.infoName}
          fontSize={16}
          fontFamily="Lato-Regular"
          color={color.gray}
        />
      </View>
    </CardContainer>
  )
}

InfoCard.defaultProps = defaultProps
