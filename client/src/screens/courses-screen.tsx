import { CourseDetailedCard } from '@components/cards'
import { SearchBar, Title } from '@components/general'
import { ScreenContainer, ScreenWrapper } from '@components/layout'
import * as React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { useCoursesService } from '@/service'
import { typography } from '@/theme'

export const CoursesScreen = () => {
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
  const service = useCoursesService()

  return (
    <ScreenContainer>
      <ScreenWrapper>
        <SafeAreaView>
          <Title value="Cursus overzicht" fontSize={typography.xl5.fontSize} />
          <SearchBar />
        </SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          {service.status === 'loaded' &&
            service.payload.courses.map((item) => (
              <CourseDetailedCard
                key={item._id}
                name={item.name}
                amountOfLessons={0}
                routeName="CourseDetail"
              />
            ))}
        </ScrollView>
      </ScreenWrapper>
    </ScreenContainer>
  )
}
