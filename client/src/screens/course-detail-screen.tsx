import { StutorCard } from '@components/cards'
import { SearchBar } from '@components/general'
import { ScreenContainer, ScreenWrapper } from '@components/layout'
import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { DetailHeader } from '@/components/general'

// dummy data
const Lessons = [
  {
    id: 1221,
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
    id: 1222,
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
    id: 1223,
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
    id: 1224,
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
    id: 1225,
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
    id: 1226,
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

export const CourseDetailScreen = ({ navigation }) => {
  return (
    <ScreenContainer>
      <ScreenWrapper>
        <SafeAreaView>
          <DetailHeader />
          <SearchBar showFilter />
        </SafeAreaView>
        <ScrollView showsHorizontalScrollIndicator={false}>
          {Lessons.map((item) => (
            <StutorCard
              key={item.id}
              name={item.user.name}
              description={item.description}
              costs={item.costs}
              rating={item.rating}
              duration={item.duration}
              onPress={() => navigation.navigate('Appointment')}
              hasDetails
            />
          ))}
        </ScrollView>
      </ScreenWrapper>
    </ScreenContainer>
  )
}
