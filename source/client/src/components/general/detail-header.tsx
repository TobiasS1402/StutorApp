import { BackBtn } from '@components/general/back-btn'
import { Title } from '@components/general/title'
import { Container } from '@components/layout/container'
import * as React from 'react'
import { View } from 'react-native'

interface DetailHeaderProps {
  title: string
}

const defaultProps: DetailHeaderProps = {
  title: '',
}

export const DetailHeader = (props: DetailHeaderProps) => {
  return (
    <Container>
      <BackBtn />
      <Title value={props.title} fontFamily="Lato-Regular" />
      <View style={{ width: 50 }} />
    </Container>
  )
}

DetailHeader.defaultProps = defaultProps
