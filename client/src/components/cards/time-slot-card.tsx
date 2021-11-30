import { Divider, Title } from '@components/general'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import styled from 'styled-components/native'
import { color, spaces } from '@/theme'

const CardContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.selected ? color.primaryLighter : color.grayLightest};
  padding: 10px 15px;
  border-radius: 5px;
  margin-bottom: ${spaces.md}px;
`

interface TimeSlotProps {
  time: string
  selected: boolean
}

const defaultProps: TimeSlotProps = {
  time: '',
  selected: false,
}

export const TimeSlotCard = (props: TimeSlotProps) => {
  return (
    <CardContainer selected={props.selected}>
      <FontAwesome
        name="clock"
        size={16}
        color={props.selected ? color.primary : color.grayLight}
        solid
      />
      <Divider small />
      <Title
        value={props.time}
        fontSize={14}
        fontFamily="Lato-Bold"
        color={props.selected ? color.primary : color.grayDark}
      />
    </CardContainer>
  )
}

TimeSlotCard.defaultProps = defaultProps
