import { CourseDetailedCard } from '@components/cards'
import { SearchBar, Title } from '@components/general'
import { ScreenContainer, ScreenWrapper } from '@components/layout'
import React, { useEffect } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import SkeletonContent from 'react-native-skeleton-content'
import coursesApi from '@/api/coursesApi'
import useApi from '@/hooks/useApi'
import { skeleton, typography } from '@/theme'
import { ICourse } from '@/types'

export const CoursesScreen = () => {
  const { result, requestApi } = useApi<ICourse[]>(coursesApi.getCourses)

  useEffect(() => {
    requestApi()
  }, [])

  return (
    <ScreenContainer>
      <ScreenWrapper>
        <SkeletonContent
          containerStyle={{ flex: 1 }}
          isLoading={result.status === 'loading'}
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
            {result.status === 'loaded' &&
              result.payload['courses'].map((item: ICourse) => (
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
