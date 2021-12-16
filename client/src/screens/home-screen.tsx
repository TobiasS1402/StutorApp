import { AppointmentCard, CourseCard } from '@components/cards'
import { Divider, Title } from '@components/general'
import { AppHeader } from '@components/home'
import { ScreenContainer, ScreenWrapper, Section } from '@components/layout'
import * as React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import SkeletonContent from 'react-native-skeleton-content'
import { GetCoursesForStudy } from '@/api/coursesApi'
import { skeleton } from '@/theme'
import { Course } from '@/types'

export const HomeScreen = () => {
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

  const api = GetCoursesForStudy(1)

  return (
    <ScreenContainer>
      <SafeAreaView />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenWrapper>
          <SkeletonContent
            containerStyle={{ flex: 1 }}
            isLoading={api.status === 'loading'}
            layout={skeleton.HomeSkeleton}
          >
            <AppHeader />
            <Section>
              <Title value="Mijn afspraken" routeName="CoursesScreen" hasOptions />
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
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {api.status === 'loaded' &&
                  api.payload['courses'].map((item: Course) => (
                    <CourseCard key={item._id} id={item._id} name={item.name} />
                  ))}
              </ScrollView>
            </Section>
          </SkeletonContent>
        </ScreenWrapper>
      </ScrollView>
    </ScreenContainer>
  )
}
