import { Container } from '@components/layout/container'
import * as React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import styled from 'styled-components/native'
import { color, spaces } from '@/theme'

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
  margin-right: ${spaces.xl3}px;
  color: ${color.gray};
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
