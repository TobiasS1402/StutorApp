import styled from 'styled-components/native'

export const Container = styled.View((props) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: props.padding,
  marginVertical: props.verticalSpace,
}))
