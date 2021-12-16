import { Divider, Title } from '@components/general'
import { useToggle } from '@utils/useToggle'
import React from 'react'
import { Pressable } from 'react-native'
import styled from 'styled-components/native'
import { color, typography } from '@/theme'

const CardContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.selected ? color.primaryLighter : color.grayLightest)};
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
  const [selected, setSelected] = useToggle()

  return (
    <Pressable onPress={setSelected}>
      <CardContainer selected={selected}>
        <Title
          value={props.dayNumber}
          fontSize={typography.sm.fontSize}
          fontFamily="Lato-Bold"
          color={selected ? color.primary : color.black}
        />
        <Divider small />
        <Title
          value={props.dayName}
          fontSize={typography.md.fontSize}
          fontFamily="Lato-Bold"
          color={selected ? color.primary : color.black}
        />
      </CardContainer>
    </Pressable>
  )
}

DayCard.defaultProps = defaultProps
