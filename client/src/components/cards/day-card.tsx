import { Divider, Title } from '@components/general'
import React from 'react'
import styled from 'styled-components/native'
import { color } from '@/theme'

const CardContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.selected ? color.primaryLighter : color.grayLightest};
  padding: 20px;
  border-radius: 15px;
`

interface DayCardProps {
  dayNumber: string
  dayName: string
  selected: boolean
}

const defaultProps: DayCardProps = {
  dayNumber: '',
  dayName: '',
  selected: false,
}

export const DayCard = (props: DayCardProps) => {
  return (
    <CardContainer selected={props.selected}>
      <Title
        value={props.dayNumber}
        fontSize={14}
        fontFamily="Lato-Bold"
        color={props.selected ? color.primary : color.grayDark}
      />
      <Divider small />
      <Title
        value={props.dayName}
        fontSize={16}
        fontFamily="Lato-Bold"
        color={props.selected ? color.primary : color.grayDark}
      />
    </CardContainer>
  )
}

DayCard.defaultProps = defaultProps
