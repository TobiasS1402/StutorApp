import { StutorCard } from '@components/cards'
import { Button, SearchBar, Title } from '@components/general'
import { ScreenContainer, ScreenWrapper } from '@components/layout'
import * as React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import SkeletonContent from 'react-native-skeleton-content'
import { color, skeleton, typography } from '@/theme'

// dummy data
const MyLessons = [
  {
    id: 1221,
    user: {
      name: 'Test user',
      avatar: 'https://globemoving.com/wp-content/uploads/2015/08/user.jpg',
    },
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    costs: 20,
    rating: 4,
    duration: 30,
  },
  {
    id: 1222,
    user: {
      name: 'Test user',
      avatar: 'https://globemoving.com/wp-content/uploads/2015/08/user.jpg',
    },
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    costs: 20,
    rating: 4,
    duration: 30,
  },
  {
    id: 1223,
    user: {
      name: 'Test user',
      avatar: 'https://globemoving.com/wp-content/uploads/2015/08/user.jpg',
    },
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    costs: 20,
    rating: 4,
    duration: 30,
  },
  {
    id: 1224,
    user: {
      name: 'Test user',
      avatar: 'https://globemoving.com/wp-content/uploads/2015/08/user.jpg',
    },
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    costs: 20,
    rating: 4,
    duration: 30,
  },
]

export const MyLessonsScreen = ({ navigation }) => {
  return (
    <ScreenContainer>
      <ScreenWrapper>
        <SkeletonContent
          containerStyle={{ flex: 1 }}
          isLoading={false}
          layout={skeleton.CoursesSkeleton}
        >
          <SafeAreaView>
            <Title value="Mijn bijlessen" fontSize={typography.xl5.fontSize} />
            <SearchBar />
          </SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
            {MyLessons.map((item) => (
              <StutorCard
                key={item.id}
                avatar={item.user.avatar}
                name={item.user.name}
                description={item.description}
                costs={item.costs}
                rating={item.rating}
                duration={item.duration}
                hasDetails
              />
            ))}
          </ScrollView>
          <Button floatable onPress={() => navigation.navigate('MyLessonsDetail')}>
            <Title
              value="Maak nieuwe bijles"
              fontFamily="Lato-Bold"
              color={color.white}
              fontSize={typography.md.fontSize}
            />
          </Button>
        </SkeletonContent>
      </ScreenWrapper>
    </ScreenContainer>
  )
}
