import * as React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { AppointmentCard } from '~/components/cards'
import { HorizontalCourseScroll } from '~/components/courses'
import { Divider, Title } from '~/components/general'
import { AppHeader } from '~/components/home'
import { ScreenContainer, ScreenWrapper, Section } from '~/components/layout'

export default function HomeScreen() {
  // dummy data
  const appointments = [
    {
      id: 0,
      timeStamp: {
        day: 'Okt, 28',
        time: '16:00',
      },
      course: 'Software Architecture',
      location: 'HL15 - 1.045',
    },
    {
      id: 1,
      timeStamp: {
        day: 'Okt, 29',
        time: '15:00',
      },
      course: 'Analytical Skills',
      location: 'HL15 - 1.065',
    },
  ]

  // dummy data
  // const topStutors = [
  //   {
  //     id: 0,
  //     user: {
  //       name: 'Maurits Arissen',
  //     },
  //     description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  //   },
  //   {
  //     id: 1,
  //     user: {
  //       name: 'Daan Franssen',
  //     },
  //     description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  //   },
  //   {
  //     id: 2,
  //     user: {
  //       name: 'Bart van Tongeren',
  //     },
  //     description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  //   },
  //   {
  //     id: 3,
  //     user: {
  //       name: 'John Doe',
  //     },
  //     description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  //   },
  // ]

  return (
    <ScreenContainer>
      <SafeAreaView />
      <ScrollView>
        <ScreenWrapper>
          <AppHeader />
          <Section>
            <Title value="Mijn afspraken" hasOptions />
            <Divider />
            {appointments.map((item) => (
              <AppointmentCard
                key={item.id}
                day={item.timeStamp.day}
                time={item.timeStamp.time}
                course={item.course}
                location={item.location}
              />
            ))}
          </Section>
          <Section>
            <Title value="Cursussen" hasOptions />
            <Divider />
            <HorizontalCourseScroll />
          </Section>
          <Section>
            <Title value="Top Stutors" />
            <Divider />
          </Section>
        </ScreenWrapper>
      </ScrollView>
    </ScreenContainer>
  )
}
