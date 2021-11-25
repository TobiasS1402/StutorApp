import { RoundedImage, SearchBar, Title } from '@components/general'
import { Divider } from '@components/general/divider'
import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { color, spaces } from '@/theme'

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

export const AppHeader = () => {
  return (
    <View>
      <HeaderContainer>
        <RoundedImage
          source={require('@assets/images/profile.jpeg')}
          width="60px"
          height="60px"
          right={spaces.xl2}
        />
        <View>
          <Title value="Hallo Bart" fontSize={26} />
          <Divider small />
          <Title
            value="Welkom terug"
            color={color.gray}
            fontSize={16}
            fontFamily="Lato-Regular"
          />
        </View>
      </HeaderContainer>
      <SearchBar />
    </View>
  )
}
