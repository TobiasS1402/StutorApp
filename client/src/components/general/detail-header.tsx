import { BackBtn } from '@components/general/back-btn'
import { Title } from '@components/general/title'
import { Container } from '@components/layout/container'
import * as React from 'react'
import { View } from 'react-native'

export const DetailHeader = () => {
  return (
    <Container>
      <BackBtn />
      <Title
        value="Software Architecture"
        fontFamily="Lato-Regular"
        fontSize={20}
        aligned="right"
      />
      <View style={{ width: 50 }} />
    </Container>
  )
}
