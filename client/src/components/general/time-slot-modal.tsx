import { DayCard, TimeSlotCard } from '@components/cards'
import { Title } from '@components/general'
import {
  Container,
  ScreenContainer,
  ScreenWrapper,
  Section,
} from '@components/layout'
import React from 'react'
import { Modal } from 'react-native'
import { spaces } from '@/theme'

const TimeSlots = [
  {
    id: 1,
    dd: 15,
    day: 'Ma',
    availableTimeSlots: [
      {
        time: '11:00',
        selected: true,
      },
      {
        time: '12:00',
      },
      {
        time: '14:00',
      },
      {
        time: '15:00',
      },
    ],
  },
  {
    id: 2,
    dd: 16,
    day: 'Di',
    availableTimeSlots: [
      {
        time: '11:00',
      },
      {
        time: '12:00',
      },
      {
        time: '14:00',
      },
      {
        time: '15:00',
      },
    ],
  },
  {
    id: 3,
    dd: 17,
    day: 'Wo',
    availableTimeSlots: [
      {
        time: '11:00',
      },
      {
        time: '12:00',
      },
      {
        time: '14:00',
      },
      {
        time: '15:00',
      },
    ],
  },
  {
    id: 4,
    dd: 18,
    day: 'Do',
    availableTimeSlots: [
      {
        time: '11:00',
      },
      {
        time: '12:00',
      },
      {
        time: '14:00',
      },
      {
        time: '15:00',
      },
    ],
  },
  {
    id: 5,
    dd: 19,
    day: 'Vr',
    availableTimeSlots: [
      {
        time: '11:00',
      },
      {
        time: '12:00',
      },
      {
        time: '14:00',
      },
      {
        time: '15:00',
      },
    ],
  },
]

export const TimeSlotModal = () => {
  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <ScreenContainer>
        <ScreenWrapper>
          <Section>
            <Title
              value="Beschikbaarheid"
              fontSize={22}
              fontFamily="Lato-Bold"
            />
            <Container marginVertical={spaces.xl5}>
              {TimeSlots.map((item) => (
                <DayCard
                  key={item.id}
                  dayName={item.day}
                  dayNumber={item.dd.toString()} // todo: remove toString
                />
              ))}
            </Container>
            <Container style={{ flexWrap: 'wrap' }}>
              <TimeSlotCard time="13:00" />
              <TimeSlotCard time="14:00" />
              <TimeSlotCard time="15:00" />
              <TimeSlotCard time="15:00" />
              <TimeSlotCard time="16:00" selected />
            </Container>
          </Section>
          <Section>
            <Title value="Locatie" fontSize={22} fontFamily="Lato-Bold" />
          </Section>
        </ScreenWrapper>
      </ScreenContainer>
    </Modal>
  )
}
