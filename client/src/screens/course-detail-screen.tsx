import { StutorCard } from '@components/cards'
import { SearchBar } from '@components/general'
import { ScreenContainer, ScreenWrapper } from '@components/layout'
import * as React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { DetailHeader } from '@/components/general/detail-header'

// dummy data
const lessons = [
  {
    id: 0,
    user: {
      name: 'Maurits Arissen',
    },
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    costs: 20,
    rating: 4,
    duration: '30 min',
  },
  {
    id: 1,
    user: {
      name: 'Daan Franssen',
    },
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    costs: 20,
    rating: 4,
    duration: '30 min',
  },
  {
    id: 2,
    user: {
      name: 'Bart van Tongeren',
    },
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    costs: 20,
    rating: 4,
    duration: '30 min',
  },
  {
    id: 3,
    user: {
      name: 'John Doe',
    },
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    costs: 20,
    rating: 4,
    duration: '30 min',
  },
  {
    id: 4,
    user: {
      name: 'Bart van Tongeren',
    },
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    costs: 20,
    rating: 4,
    duration: '30 min',
  },
  {
    id: 5,
    user: {
      name: 'John Doe',
    },
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    costs: 20,
    rating: 4,
    duration: '30 min',
  },
]

export default function CourseDetailScreen() {
  return (
    <ScreenContainer>
      <ScreenWrapper>
        <SafeAreaView>
          <DetailHeader />
          <SearchBar showFilter />
        </SafeAreaView>
        <ScrollView showsHorizontalScrollIndicator={false}>
          {lessons.map((item) => (
            <StutorCard
              key={item.id}
              name={item.user.name}
              description={item.description}
              costs={item.costs}
              rating={item.rating}
              duration={item.duration}
              hasDetails
            />
          ))}
        </ScrollView>
      </ScreenWrapper>
    </ScreenContainer>
  )
}
