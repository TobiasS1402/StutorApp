import { CourseCard } from '@components/cards'
import * as React from 'react'
import { ScrollView } from 'react-native'

// dummy data
const courses = [
  {
    id: 0,
    name: 'Software Architecture',
    icon: 'software-architecture',
  },
  {
    id: 1,
    name: 'Advanced Software design',
    icon: 'software-architecture',
  },
  {
    id: 2,
    name: 'Object oriented analysis',
    icon: 'software-architecture',
  },
  {
    id: 3,
    name: 'Patterns & Framework',
    icon: 'software-architecture',
  },
  {
    id: 4,
    name: 'Programming',
    icon: 'software-architecture',
  },
]

export const HorizontalCourseScroll = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {courses.map((item) => (
        <CourseCard key={item.id} name={item.name} />
      ))}
    </ScrollView>
  )
}
