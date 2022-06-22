import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { Pressable } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import styled from 'styled-components/native'
import { Container } from '../layout'
import { color, spaces } from '@/theme'

const BtnContainer = styled(Container)`
  width: 50px;
  height: 50px;
  justify-content: center;
  padding: ${spaces.xl}px;
  border-radius: 5px;
  background-color: ${color.white};
`

export const BackBtn = () => {
  const navigation = useNavigation()
  return (
    <Pressable onPress={() => navigation.goBack()}>
      <BtnContainer>
        <FontAwesome name={'chevron-left'} size={22} color={color.primary} solid />
      </BtnContainer>
    </Pressable>
  )
}
