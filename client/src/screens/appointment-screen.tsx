import { InfoCard } from '@components/cards'
import {
  Container,
  ScreenContainer,
  ScreenWrapper,
  Section,
} from '@components/layout'
import React from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import SkeletonContent from 'react-native-skeleton-content'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import styled from 'styled-components/native'
import { GetLesson } from '@/api'
import {
  Button,
  DetailHeader,
  Divider,
  PlainText,
  Title,
} from '@/components/general'
import { TimeSlotModal } from '@/components/modals/time-slot-modal'
import { color, skeleton, spaces, typography } from '@/theme'
import { useToggle } from '@/utils'

const RatingBadge = styled(Container)`
  background-color: ${color.white};
  padding: ${spaces.xl}px ${spaces.xl2}px;
  border-radius: 50px;
`

const StutorInfo = styled.View`
  flex-direction: row;
`

// Dummy data
const LessonsData = {
  lesson: {
    course: 'Software Architecture',
    rating: '4.8',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, industry’s standard dummy.',
    price: 20,
  },
  user: {
    name: 'Maurits Arissen',
    about:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.',
    jaar: 3,
    school: 'HBO-ICT Hogeschool Utrecht',
  },
}

export const AppointmentScreen = () => {
  const [showModal, setShowModal] = useToggle()
  const api = GetLesson(1)

  return (
    <ScreenContainer>
      <ScreenWrapper>
        <SkeletonContent
          containerStyle={{ flex: 1 }}
          isLoading={api.status === 'loading'}
          layout={skeleton.CoursesSkeleton}
        >
          <SafeAreaView>
            <DetailHeader title="Bijles Maurits Arissen" />
          </SafeAreaView>
          <Divider />
          {api.status === 'loaded' && (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Container marginVertical={spaces.xl2}>
                <View>
                  <Title
                    value={api.payload['lesson'].user?.username}
                    fontSize={typography.xl2.fontSize}
                    fontFamily="Lato-Bold"
                  />
                  <Divider small />
                  <PlainText primary>
                    {api.payload['lesson'].course.name}
                  </PlainText>
                </View>
                <RatingBadge>
                  <Title
                    value={api.payload['lesson'].rating ?? 0}
                    fontFamily="Lato-Bold"
                    fontSize={typography.md.fontSize}
                    color={color.grayDark}
                  />
                  <Divider small />
                  <FontAwesome
                    name={'star'}
                    size={16}
                    color={color.yellow}
                    solid
                  />
                </RatingBadge>
              </Container>
              <Section>
                <InfoCard
                  icon="bitcoin"
                  value={api.payload['lesson'].price}
                  infoName="Stutor Coins"
                />
              </Section>
              <Section>
                <Title
                  value="Beschrijving"
                  fontFamily="Lato-Bold"
                  fontSize={typography.lg.fontSize}
                />
                <Divider small />
                <PlainText multi primary>
                  {api.payload['lesson'].description}
                </PlainText>
              </Section>
              <Section>
                <Title
                  value="Over de Stutor"
                  fontFamily="Lato-Bold"
                  fontSize={typography.lg.fontSize}
                />
                <Divider small />
                <PlainText multi primary>
                  {api.payload['lesson'].user?.description}
                </PlainText>
              </Section>
              <Section style={{ marginBottom: spaces.xl7 }}>
                <StutorInfo>
                  <FontAwesome
                    name={'graduation-cap'}
                    size={24}
                    color={color.primary}
                    solid
                  />
                  <Divider small />
                  <PlainText primary>
                    {`${api.payload['lesson'].user?.year}e jaars student`}
                  </PlainText>
                </StutorInfo>
                <Divider small />
                <StutorInfo>
                  <FontAwesome
                    name={'compass'}
                    size={24}
                    color={color.primary}
                    solid
                  />
                  <Divider small />
                  <PlainText primary>{LessonsData?.user?.school}</PlainText>
                </StutorInfo>
              </Section>
            </ScrollView>
          )}
          <Button floatable onPress={setShowModal}>
            <Title
              value="Maak afspraak"
              fontFamily="Lato-Bold"
              color={color.white}
              fontSize={typography.md.fontSize}
            />
          </Button>
        </SkeletonContent>
      </ScreenWrapper>
      <TimeSlotModal show={showModal} toggle={setShowModal} />
    </ScreenContainer>
  )
}
