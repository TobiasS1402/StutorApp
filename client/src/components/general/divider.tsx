import spaces from '@theme/spaces'
import styled from 'styled-components/native'

export const Divider = styled.Image`
  height: ${(props) => (props.small ? `${spaces.lg}px` : `${spaces.xl3}px`)};
  width: ${(props) => (props.small ? `${spaces.lg}px` : `${spaces.none}`)};
`
