import { DayCard, TimeSlotCard } from '@components/cards'
import { Selector, TextInput } from '@components/forms'
import { Button, Divider, Title } from '@components/general'
import { Container, ScreenContainer, ScreenWrapper, Section } from '@components/layout'
import React, { useState } from 'react'
import { Modal, ScrollView } from 'react-native'
import styled from 'styled-components/native'
import { color, spaces, typography } from '@/theme'

interface TimeSlotModalProps {
  show: boolean
  toggle?: () => void
}

const defaultProps: TimeSlotModalProps = {
  show: false,
  toggle: () => null,
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

const Locations = [
  {
    id: 1,
    value: 'Heidelberglaan 15',
  },
  {
    id: 2,
    value: 'Padualaan 101',
  },
  {
    id: 3,
    value: 'Padualaan 99',
  },
  {
    id: 4,
    value: 'Padualaan 97',
  },
]

const TimeSlotContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`
const BtnContainer = styled(Container)`
  padding: ${spaces.xl4}px ${spaces.xl5}px;
`

const Btn = styled(Button)`
  flex: 1;
  background: ${(props) => (props.primary ? `${color.primary}` : `${color.grayLight}`)};
`

export const TimeSlotModal = (props: TimeSlotModalProps) => {
  const [locatie, setLocatie] = useState('Kies een locatie')
  const [remark, setRemark] = useState()

  return (
    <Modal animationType="slide" transparent={true} visible={props.show}>
      <ScreenContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ScreenWrapper>
            <Section>
              <Title
                value="Kies een tijdslot"
                fontSize={typography.xl2.fontSize}
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
              <Title value="Locatie" fontSize={typography.xl2.fontSize} fontFamily="Lato-Bold" />
              <Divider />
              <Selector
                selectedValue={locatie}
                onValueChange={(value) => setLocatie(value)}
                data={Locations}
              />
            </Section>
            <Section>
              <Title
                value="Opmerkingen"
                fontSize={typography.xl2.fontSize}
                fontFamily="Lato-Bold"
              />
              <Divider />
              <TextInput
                multiline
                value={remark}
                placeholder="Welke punten wil je tijdens de les behandelen?"
                onChangeText={(text) => setRemark(text)}
              />
            </Section>
          </ScreenWrapper>
        </ScrollView>
        <BtnContainer>
          <Btn primary>
            <Title
              value="Maak afspraak"
              fontFamily="Lato-Bold"
              fontSize={typography.md.fontSize}
              color={color.white}
            />
          </Btn>
          <Divider small />
          <Btn onPress={props.toggle}>
            <Title
              value="Cancel"
              fontFamily="Lato-Bold"
              fontSize={typography.md.fontSize}
              color={color.gray}
            />
          </Btn>
        </BtnContainer>
      </ScreenContainer>
    </Modal>
  )
}

TimeSlotModal.defaultProps = defaultProps
