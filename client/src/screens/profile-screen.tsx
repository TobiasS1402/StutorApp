import { Card } from '@components/cards/'
import { Divider, RoundedImage, Title } from '@components/general'
import { Container, ScreenContainer, ScreenWrapper } from '@components/layout'
import * as React from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import styled from 'styled-components/native'
import { color, spaces } from '@/theme'

const Btn = styled.Pressable`
  background: ${color.primaryLighter};
  align-items: center;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 15px;
  width: 100%;
`

const CoinBalance = styled(Card)`
  padding: ${spaces.xl5}px 0 0 0;
  align-items: center;
  margin-top: ${spaces.xl6}px;
`

export const ProfileScreen = () => {
  return (
    <ScreenContainer>
      <SafeAreaView />
      <ScrollView>
        <ScreenWrapper>
          <SafeAreaView>
            <Title value="Mijn profiel" fontSize={26} />
            <Divider />
            <Container style={{ justifyContent: 'flex-start' }}>
              <RoundedImage
                source={require('@assets/images/profile.jpeg')}
                width="90px"
                height="90px"
              />
              <View style={{ marginLeft: spaces.xl4 }}>
                <Title value="John Doe" fontFamily="Lato-Regular" />
                <Divider small />
                <Title
                  value="HBO-ICT"
                  fontFamily="Lato-Regular"
                  fontSize={15}
                  color={color.gray}
                />
              </View>
            </Container>
          </SafeAreaView>
          <CoinBalance>
            <Title
              value="Stutor Coin Balance"
              fontSize={16}
              fontFamily="Lato-Regular"
              color={color.gray}
            />
            <Divider />
            <Title
              value="145"
              fontSize={40}
              fontFamily="Lato-Black"
              color={color.black}
            />
            <Divider />
            <Btn>
              <Title
                value="Stutor Coins toevoegen"
                fontSize={16}
                fontFamily="Lato-Bold"
                color={color.primary}
              />
            </Btn>
          </CoinBalance>
        </ScreenWrapper>
      </ScrollView>
    </ScreenContainer>
  )
}
