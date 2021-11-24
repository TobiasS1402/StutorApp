import * as React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import styled from 'styled-components/native'
import { Container } from '~/components/layout/container'
import color from '~/theme/color'
import spaces from '~/theme/spaces'

interface IconDetailProps {
  iconName: string
  iconColor: string
  iconSize: number
  detailValue: string | number
}

const defaultProps: IconDetailProps = {
  iconName: '',
  iconColor: '',
  iconSize: 0,
  detailValue: '',
}

const Detail = styled.Text`
  margin-left: ${spaces.default}px;
  color: ${color.gray};
  margin-right: ${spaces.xl3}px;
`

export const IconDetail = (props: IconDetailProps) => {
  return (
    <Container>
      <FontAwesome name={props.iconName} size={props.iconSize} color={props.iconColor} solid />
      <Detail>{props.detailValue}</Detail>
    </Container>
  )
}

IconDetail.defaultProps = defaultProps
