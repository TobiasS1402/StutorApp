import { InfoCard } from '@components/cards'
import { Button, Divider, Title } from '@components/general'
import { Container, ScreenWrapper, Section } from '@components/layout'
import React, { useEffect, useRef } from 'react'
import { ScrollView, View } from 'react-native'
import BottomSheet from 'react-native-gesture-bottom-sheet'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import styled from 'styled-components/native'
import { color, spaces } from '@/theme'

interface AppointmentModalProps {
  currentStutor: number
}

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

export function AppointmentModal(props: AppointmentModalProps) {
  const bottomSheet = useRef<BottomSheet>()

  useEffect(() => {
    if (props.currentStutor !== 0) {
      bottomSheet?.current.show()
    }
  }, [props.currentStutor])

  return (
    <BottomSheet
      hasDraggableIcon
      draggable={false}
      ref={bottomSheet}
      height={550}
      radius={40}
      sheetBackgroundColor={color.primaryLightest}
    >
      <ScrollView>
        <ScreenWrapper>
          <Container marginVertical={spaces.xl}>
            <View>
              <Title
                value={LessonsData?.user?.name}
                fontSize={22}
                fontFamily="Lato-Bold"
              />
              <Divider small />
              <Title
                value={LessonsData?.lesson?.course}
                fontSize={16}
                fontFamily="Lato-Regular"
                color={color.gray}
              />
            </View>
            <RatingBadge>
              <Title
                value={LessonsData?.lesson?.rating}
                fontFamily="Lato-Bold"
                fontSize={16}
                color={color.grayDark}
              />
              <Divider small />
              <FontAwesome name={'star'} size={16} color={color.yellow} solid />
            </RatingBadge>
          </Container>
          <Section>
            <Container>
              <InfoCard
                icon="bitcoin"
                value={LessonsData?.lesson?.price.toString()}
                infoName="Stutor Coins"
              />
            </Container>
          </Section>
          <Section>
            <Title
              value={LessonsData?.lesson?.description}
              fontSize={15}
              fontFamily="Lato-Regular"
              color={color.gray}
            />
          </Section>
          <Section>
            <Title
              value="Over de Stutor"
              fontFamily="Lato-Bold"
              fontSize={18}
            />
            <Divider />
            <Title
              value={LessonsData?.user?.about}
              fontSize={15}
              fontFamily="Lato-Regular"
              color={color.gray}
            />
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
              <Title
                value={`${LessonsData?.user?.jaar}e jaars student`}
                fontSize={16}
                fontFamily="Lato-Regular"
                color={color.gray}
              />
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
              <Title
                value={LessonsData?.user?.school}
                fontSize={16}
                fontFamily="Lato-Regular"
                color={color.gray}
              />
            </StutorInfo>
          </Section>
        </ScreenWrapper>
      </ScrollView>
      <Button floatable>
        <Title
          value="Maak afspraak"
          fontFamily="Lato-Bold"
          color={color.white}
          fontSize={17}
        />
      </Button>
    </BottomSheet>
  )
}
