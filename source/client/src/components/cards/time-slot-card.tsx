import { Divider, Title } from '@components/general'
import { useToggle } from '@utils/useToggle'
import React from 'react'
import { Pressable } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import styled from 'styled-components/native'
import { color, spaces } from '@/theme'

const CardContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.selected ? color.primaryLighter : color.grayLightest)};
  padding: 10px 15px;
  border-radius: 5px;
  margin: 0 ${spaces.lg}px ${spaces.lg}px 0;
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
  const [selected, setSelected] = useToggle()

  return (
    <Pressable onPress={setSelected}>
      <CardContainer selected={selected}>
        <FontAwesome
          name="clock"
          size={16}
          color={selected ? color.primary : color.grayLight}
          solid
        />
        <Divider small />
        <Title
          value={props.time}
          fontSize={14}
          fontFamily="Lato-Bold"
          color={selected ? color.primary : color.black}
        />
      </CardContainer>
    </Pressable>
  )
}

TimeSlotCard.defaultProps = defaultProps
