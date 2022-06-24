import { Card } from '@components/cards/'
import { Divider, PlainText, RoundedImage, Title } from '@components/general'
import { Container, ScreenContainer, ScreenWrapper } from '@components/layout'
import * as React from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import SkeletonContent from 'react-native-skeleton-content'
import styled from 'styled-components/native'
import { GetMe } from '@/api/userApi'
import { useAuth } from '@/contexts/auth'
import { color, skeleton, spaces, typography } from '@/theme'

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
  const api = GetMe()
  const auth = useAuth()

  const signOut = () => {
    auth.signOut()
  }

  return (
    <ScreenContainer>
      <SafeAreaView />
      <ScrollView>
        <ScreenWrapper>
          <SkeletonContent
            containerStyle={{ flex: 1 }}
            isLoading={api.status === 'loading'}
            layout={skeleton.ProfileSkeleton}
          >
            {api.status === 'loaded' && (
              <SafeAreaView>
                <Title value="Mijn profiel" fontSize={typography.xl5.fontSize} />
                <Divider />
                <Container style={{ justifyContent: 'flex-start' }}>
                  <RoundedImage
                    source={{ uri: api.payload['user'].avatar }}
                    width="90px"
                    height="90px"
                  />
                  <View style={{ marginLeft: spaces.xl4 }}>
                    <Title value={api.payload['user'].username} fontFamily="Lato-Regular" />
                    <Divider small />
                    <PlainText primary>
                      {api.payload['user'].study ?? 'Studie niet bekend'}
                    </PlainText>
                  </View>
                </Container>
                <CoinBalance>
                  <PlainText primary>Stutor Coin Balance</PlainText>
                  <Divider />
                  <Title value="145" fontSize={40} color={color.black} />
                  <Divider />
                  <Btn>
                    <Title
                      value="Stutor Coins toevoegen"
                      fontSize={typography.md.fontSize}
                      fontFamily="Lato-Bold"
                      color={color.primary}
                    />
                  </Btn>
                </CoinBalance>
                <Btn onPress={() => signOut()}>
                  <Title
                    value="Uitloggen"
                    fontSize={typography.md.fontSize}
                    fontFamily="Lato-Bold"
                    color={color.primary}
                  />
                </Btn>
              </SafeAreaView>
            )}
          </SkeletonContent>
        </ScreenWrapper>
      </ScrollView>
    </ScreenContainer>
  )
}
