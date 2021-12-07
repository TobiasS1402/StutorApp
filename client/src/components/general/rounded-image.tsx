import styled from 'styled-components/native'

export const RoundedImage = styled.Image((props) => ({
  borderRadius: '100px',
  width: props.width,
  height: props.height,
  marginLeft: props.right,
}))
