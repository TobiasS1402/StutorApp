import { Card } from '@components/cards/card'
import { Divider, PlainText, Title } from '@components/general'
import React from 'react'
import { View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import styled from 'styled-components/native'
import { color, typography } from '@/theme'

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

/**
 * Styling code
 */
const CardContainer = styled(Card)`
  flex-direction: row;
  width: 160px;
  align-items: center;
`

/**
 * Create a static info card that changes values from the input out the parameters given
 * @param props
 * @constructor
 */
export const InfoCard = (props: InfoCardProps) => {
  return (
    <CardContainer>
      <FontAwesome name={props.icon} size={30} color={color.yellow} solid />
      <Divider small />
      <View>
        <Title value={props.value} fontSize={typography.lg.fontSize} fontFamily="Lato-Bold" />
        <PlainText primary>{props.infoName}</PlainText>
      </View>
    </CardContainer>
  )
}

InfoCard.defaultProps = defaultProps
