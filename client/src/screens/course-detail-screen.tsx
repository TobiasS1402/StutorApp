import { StutorCard } from '@components/cards'
import { AppointmentModal, SearchBar } from '@components/general'
import { ScreenContainer, ScreenWrapper } from '@components/layout'
import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { DetailHeader } from '@/components/general/detail-header'

// dummy data
const lessons = [
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

interface MyState {
  currentStutor: number
}

export default class CourseDetailScreen extends React.Component<
  { any },
  MyState
> {
  constructor(props) {
    super(props)
    this.state = { currentStutor: 0 }
  }

  render() {
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
                onPress={() => this.setState({ currentStutor: item.id })}
                hasDetails
              />
            ))}
          </ScrollView>
        </ScreenWrapper>
        <AppointmentModal currentStutor={this.state.currentStutor} />
      </ScreenContainer>
    )
  }
}
