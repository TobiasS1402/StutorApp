import { CourseDetailedCard } from '@components/cards'
import { SearchBar, Title } from '@components/general'
import { ScreenContainer, ScreenWrapper } from '@components/layout'
import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import SkeletonContent from 'react-native-skeleton-content'
import { GetCourses } from '../services/coursesService'
import { skeleton, typography } from '@/theme'
import { Course } from '@/types'

export const CoursesScreen = () => {
  const service = GetCourses()

  return (
    <ScreenContainer>
      <ScreenWrapper>
        <SkeletonContent
          containerStyle={{ flex: 1 }}
          isLoading={service.status === 'loading'}
          layout={skeleton.CoursesSkeleton}
        >
          <SafeAreaView>
            <Title
              value="Cursus overzicht"
              fontSize={typography.xl5.fontSize}
            />
            <SearchBar />
          </SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
            {service.status === 'loaded' &&
              service.payload['courses'].map((item: Course) => (
                <CourseDetailedCard
                  key={item._id}
                  name={item.name}
                  amountOfLessons={0}
                  routeName="CourseDetail"
                />
              ))}
          </ScrollView>
        </SkeletonContent>
      </ScreenWrapper>
    </ScreenContainer>
  )
}
