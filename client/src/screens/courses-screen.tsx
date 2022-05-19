import { CourseDetailedCard } from '@components/cards'
import { SearchBar, Title } from '@components/general'
import { ScreenContainer, ScreenWrapper } from '@components/layout'
import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import SkeletonContent from 'react-native-skeleton-content'
import { GetCoursesForStudy } from '@/api'
import { skeleton, typography } from '@/theme'
import { Course } from '@/types'

export const CoursesScreen = () => {
  const api = GetCoursesForStudy(1)

  return (
    <ScreenContainer>
      <ScreenWrapper>
        <SkeletonContent
          containerStyle={{ flex: 1 }}
          isLoading={api.status === 'loading'}
          layout={skeleton.CoursesSkeleton}
        >
          <SafeAreaView>
            <Title value="Cursus overzicht" fontSize={typography.xl5.fontSize} />
            <SearchBar />
          </SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
            {api.status === 'loaded' &&
              api.payload['courses'].map((item: Course) => (
                <CourseDetailedCard
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  amountOfLessons={0}
                />
              ))}
          </ScrollView>
        </SkeletonContent>
      </ScreenWrapper>
    </ScreenContainer>
  )
}
