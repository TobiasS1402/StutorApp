import { PlainText, RoundedImage, SearchBar, Title } from '@components/general'
import { Divider } from '@components/general/divider'
import { Container } from '@components/layout/container'
import React from 'react'
import { Pressable, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import { color, spaces, typography } from '@/theme'

export const AppHeader = () => {
  return (
    <View>
      <Container>
        <Container>
          <RoundedImage
            source={require('@assets/images/profile.jpeg')}
            width="60px"
            height="60px"
            right={spaces.xl2}
          />
          <View>
            <Title value="Hallo Bart" fontSize={typography.xl5.fontSize} />
            <Divider small />
            <PlainText>Welkom terug</PlainText>
          </View>
        </Container>
        <Pressable>
          <FontAwesome name="qrcode" size={30} color={color.primary} solid />
        </Pressable>
      </Container>
      <SearchBar />
    </View>
  )
}
