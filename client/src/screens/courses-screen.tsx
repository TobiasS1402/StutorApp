import { CourseDetailedCard } from '@components/cards'
import { SearchBar, Title } from '@components/general'
import { ScreenContainer, ScreenWrapper } from '@components/layout'
import * as React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'

export default function CoursesScreen() {
  // dummy data
  const courses = [
    {
      id: 0,
      name: 'Software Architecture',
      icon: 'software-architecture',
      lessons: 0,
    },
    {
      id: 1,
      name: 'Advanced Software design',
      icon: 'software-architecture',
      lessons: 0,
    },
    {
      id: 2,
      name: 'Object oriented analysis',
      icon: 'software-architecture',
      lessons: 0,
    },
    {
      id: 3,
      name: 'Patterns & Framework',
      icon: 'software-architecture',
      lessons: 0,
    },
    {
      id: 4,
      name: 'Programming',
      icon: 'software-architecture',
      lessons: 0,
    },
    {
      id: 5,
      name: 'Analytical Skills',
      icon: 'software-architecture',
      lessons: 0,
    },
    {
      id: 6,
      name: 'Modeling',
      icon: 'software-architecture',
      lessons: 0,
    },
  ]

  return (
    <ScreenContainer>
      <ScreenWrapper>
        <SafeAreaView>
          <Title
            value="Cursus overzicht"
            fontFamily="Lato-Black"
            fontSize={26}
          />
          <SearchBar />
        </SafeAreaView>
        <ScrollView>
          {courses.map((item) => (
            <CourseDetailedCard
              key={item.id}
              icon={item.icon}
              name={item.name}
              amountOfLessons={item.lessons}
              routeName="CourseDetail"
            />
          ))}
        </ScrollView>
      </ScreenWrapper>
    </ScreenContainer>
  )
}
