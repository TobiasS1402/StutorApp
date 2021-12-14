import { StutorCard } from '@components/cards'
import { SearchBar } from '@components/general'
import { ScreenContainer, ScreenWrapper } from '@components/layout'
import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import SkeletonContent from 'react-native-skeleton-content'
import { GetLessonsForCourse } from '@/api'
import { DetailHeader } from '@/components/general'
import { skeleton } from '@/theme'
import { Lesson } from '@/types'

export const CourseDetailScreen = ({ navigation }) => {
  const api = GetLessonsForCourse(1)

  return (
    <ScreenContainer>
      <ScreenWrapper>
        <SkeletonContent
          containerStyle={{ flex: 1 }}
          isLoading={api.status === 'loading'}
          layout={skeleton.CoursesSkeleton}
        >
          <SafeAreaView>
            <DetailHeader title="Software Architecture" />
            <SearchBar showFilter />
          </SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
            {api.status === 'loaded' &&
              api.payload['lessons'].map((item: Lesson) => (
                <StutorCard
                  key={item._id}
                  avatar={item.user?.avatar}
                  name={item.user?.username}
                  description={item.description}
                  costs={item.price}
                  rating={item.avgRating ?? 0}
                  duration={'30 min'}
                  onPress={() => navigation.navigate('Appointment')}
                  hasDetails
                />
              ))}
          </ScrollView>
        </SkeletonContent>
      </ScreenWrapper>
    </ScreenContainer>
  )
}
