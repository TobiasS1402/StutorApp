import styled from 'styled-components/native'

/**
 * Styling code to create roundedImages
 */
export const RoundedImage = styled.Image((props) => ({
  borderRadius: '100px',
  width: props.width,
  height: props.height,
  marginLeft: props.right,
}))
