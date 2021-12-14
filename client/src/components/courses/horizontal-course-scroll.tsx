import { CourseCard } from '@components/cards'
import * as React from 'react'
import { ScrollView } from 'react-native'
import { GetCourses } from '@/api/coursesApi'
// import { ICourse } from '@/types'

export const HorizontalCourseScroll = () => {
  // const courses = GetCourses()

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {/* {courses.status === 'loaded' &&
        courses.payload['courses'].map((item: ICourse) => (
          <CourseCard key={item._id} name={item.name} />
        ))} */}
    </ScrollView>
  )
}
