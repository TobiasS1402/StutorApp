import { DayCard, TimeSlotCard } from '@components/cards'
import { Selector, TextInput } from '@components/forms'
import { Button, DetailHeader, Divider, PlainText, Title } from '@components/general'
import { Container, ScreenContainer, ScreenWrapper, Section } from '@components/layout'
import React, { useState } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import styled from 'styled-components/native'
import { color, spaces, typography } from '@/theme'

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

const Duration = [
  {
    id: 1,
    value: '15 minuten',
  },
  {
    id: 2,
    value: '30 minuten',
  },
  {
    id: 3,
    value: '45 minuten',
  },
  {
    id: 4,
    value: '60 minuten',
  },
]

const TimeSlotContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin: ${spaces.xl}px 0;
`

export const MyLessonsDetailScreen = () => {
  const [duration, setDuration] = useState('Bijles duur')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenWrapper>
          <SafeAreaView>
            <DetailHeader title="Bijles aanmaken" />
          </SafeAreaView>
          <Divider />
          <Section>
            <Selector
              selectedValue={duration}
              onValueChange={(value: string) => setDuration(value)}
              data={Duration}
            />
            <Divider small />
            <TextInput
              value={price}
              placeholder="Bijles prijs"
              onChangeText={(value: string) => setPrice(value)}
              keyboardType="numeric"
            />
            <Divider />
            <TextInput
              multiline
              value={description}
              placeholder="Geef een omschrijving van de bijles..."
              onChangeText={(text: string) => setDescription(text)}
            />
          </Section>
          <Section>
            <PlainText primary>Beschikbare dag(en)</PlainText>
            <Container marginVertical={spaces.xl}>
              {Days.map((item) => (
                <DayCard
                  key={item.id}
                  dayName={item.day}
                  dayNumber={item.dd.toString()} // todo: remove toString
                />
              ))}
            </Container>
          </Section>
          <Section>
            <PlainText primary>Beschikbare tijden(en)</PlainText>
            <TimeSlotContainer>
              {TimeSlots.map((item) => (
                <TimeSlotCard key={item.id} time={item.time} />
              ))}
            </TimeSlotContainer>
          </Section>
          <Section>
            <Button>
              <Title
                value="Aanmaken"
                fontSize={typography.md.fontSize}
                fontFamily="Lato-Bold"
                color={color.white}
              />
            </Button>
          </Section>
        </ScreenWrapper>
      </ScrollView>
    </ScreenContainer>
  )
}
