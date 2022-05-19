import { StutorCard } from '@components/cards'
import { SearchBar } from '@components/general'
import { ScreenContainer, ScreenWrapper } from '@components/layout'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { observer } from 'mobx-react-lite'
import React, { FC } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import SkeletonContent from 'react-native-skeleton-content'
import { GetLessonsForCourse } from '@/api'
import { DetailHeader } from '@/components/general'
import { NavigatorParamList } from '@/navigation/stack-screens'
import { skeleton } from '@/theme'
import { Lesson } from '@/types'

export const CourseDetailScreen: FC<NativeStackScreenProps<NavigatorParamList, 'CourseDetail'>> =
  observer(({ route, navigation }) => {
    const { courseId, courseName } = route.params
    const api = GetLessonsForCourse(courseId)

    return (
      <ScreenContainer>
        <ScreenWrapper>
          <SkeletonContent
            containerStyle={{ flex: 1 }}
            isLoading={api.status === 'loading'}
            layout={skeleton.CourseDetailSkeleton}
          >
            <SafeAreaView>
              <DetailHeader title={courseName} />
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
                    duration={item.timeframe}
                    onPress={() => navigation.navigate('Appointment', { lessonId: item._id })}
                    hasDetails
                  />
                ))}
            </ScrollView>
          </SkeletonContent>
        </ScreenWrapper>
      </ScreenContainer>
    )
  })
