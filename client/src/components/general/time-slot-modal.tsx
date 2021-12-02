import { DayCard, TimeSlotCard } from '@components/cards'
import { Title } from '@components/general'
import {
  Container,
  ScreenContainer,
  ScreenWrapper,
  Section,
} from '@components/layout'
import React, { useState } from 'react'
import { Modal } from 'react-native'
import styled from 'styled-components'
import { color, spaces } from '@/theme'

interface TimeSlotModalProps {
  show: boolean
}

const defaultProps: TimeSlotModalProps = {
  show: false,
}

const Days = [
  {
    id: 1,
    dd: 15,
    day: 'Ma',
  },
  {
    id: 2,
    dd: 16,
    day: 'Di',
  },
  {
    id: 3,
    dd: 17,
    day: 'Wo',
  },
  {
    id: 4,
    dd: 18,
    day: 'Do',
  },
  {
    id: 5,
    dd: 19,
    day: 'Vr',
  },
]

const TimeSlots = [
  {
    id: 1,
    time: '13:00',
  },
  {
    id: 2,
    time: '14:00',
  },
  {
    id: 3,
    time: '15:00',
  },
  {
    id: 4,
    time: '16:00',
  },
  {
    id: 5,
    time: '17:00',
  },
]

const TimeSlotContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`

export const TimeSlotModal = (props: TimeSlotModalProps) => {
  return (
    <Modal animationType="slide" transparent={true} visible={props.show}>
      <ScreenContainer>
        <ScreenWrapper>
          <Section>
            <Title
              value="Beschikbaarheid"
              fontSize={22}
              fontFamily="Lato-Bold"
            />
            <Container marginVertical={spaces.xl5}>
              {Days.map((item) => (
                <DayCard
                  key={item.id}
                  dayName={item.day}
                  dayNumber={item.dd.toString()} // todo: remove toString
                />
              ))}
            </Container>
            <TimeSlotContainer>
              {TimeSlots.map((item) => (
                <TimeSlotCard key={item.id} time={item.time} />
              ))}
            </TimeSlotContainer>
          </Section>
          <Section>
            <Title value="Locatie" fontSize={22} fontFamily="Lato-Bold" />
          </Section>
        </ScreenWrapper>
      </ScreenContainer>
    </Modal>
  )
}

TimeSlotModal.defaultProps = defaultProps
