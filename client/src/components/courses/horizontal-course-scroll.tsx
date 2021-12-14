import { CourseCard } from '@components/cards'
import * as React from 'react'
import { ScrollView } from 'react-native'
import { GetCoursesForStudy } from '@/api/coursesApi'
import { Course } from '@/types'

export const HorizontalCourseScroll = () => {
  const api = GetCoursesForStudy(1)

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {api.status === 'loaded' &&
        api.payload['courses'].map((item: Course) => (
          <CourseCard key={item._id} name={item.name} />
        ))}
    </ScrollView>
  )
}
