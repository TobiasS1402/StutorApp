import { CourseCard } from '@components/cards'
import * as React from 'react'
import { ScrollView } from 'react-native'
import coursesApi from '@/api/coursesApi'
import { useApi } from '@/hooks/useApi'
import { ICourse } from '@/types'

export const HorizontalCourseScroll = () => {
  const service = useApi<ICourse[]>(coursesApi.getCourses)

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {service.status === 'loaded' &&
        service.payload['courses'].map((item: ICourse) => (
          <CourseCard key={item._id} name={item.name} />
        ))}
    </ScrollView>
  )
}
