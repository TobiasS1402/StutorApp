import styled from 'styled-components/native'
import { color, spaces } from '@/theme'

export const Button = styled.Pressable`
  background: ${color.primary};
  color: ${color.white};
  border-radius: 5px;
  padding: 20px 0;
  align-items: center;
  margin: ${(props) => (props.floatable ? `${spaces.xl2}px 0` : '0')};
  ${(props) => props.floatable && 'position: absolute; bottom: 0; left: 0; right: 0;'}
`
