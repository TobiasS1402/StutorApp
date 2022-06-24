import styled from 'styled-components/native'
import { color } from '@/theme'

export const TextInput = styled.TextInput`
  padding: 15px 15px ${(props) => (props.multiline ? '100px' : '15px')} 15px
  font-family: 'Lato-Regular';
  font-size: 15px;
  color: ${color.gray};
  background-color: ${color.white};
  border-radius: 5px;
  flex: 1;
`
