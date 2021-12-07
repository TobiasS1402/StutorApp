import { AppointmentCard, StutorCard } from '@components/cards'
import { HorizontalCourseScroll } from '@components/courses'
import { Divider, Title } from '@components/general'
import { AppHeader } from '@components/home'
import { ScreenContainer, ScreenWrapper, Section } from '@components/layout'
import * as React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'

export default function HomeScreen() {
  // dummy data
  const Appointments = [
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
  const TopStutors = [
    {
      id: 0,
      user: {
        name: 'Maurits Arissen',
      },
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 1,
      user: {
        name: 'Daan Franssen',
      },
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 2,
      user: {
        name: 'Bart van Tongeren',
      },
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 3,
      user: {
        name: 'John Doe',
      },
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
  ]

  return (
    <ScreenContainer>
      <SafeAreaView />
      <ScrollView>
        <ScreenWrapper>
          <AppHeader />
          <Section>
            <Title
              value="Mijn afspraken"
              hasOptions
              routeName="CoursesScreen"
            />
            <Divider />
            {Appointments.map((item) => (
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
            <Title value="Cursussen" routeName="CoursesScreen" hasOptions />
            <Divider />
            <HorizontalCourseScroll />
          </Section>
          <Section>
            <Title value="Top Stutors" />
            <Divider />
            {TopStutors.map((item) => (
              <StutorCard
                key={item.id}
                name={item.user.name}
                description={item.description}
              />
            ))}
          </Section>
        </ScreenWrapper>
      </ScrollView>
    </ScreenContainer>
  )
}
