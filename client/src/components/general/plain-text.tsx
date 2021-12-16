import styled from 'styled-components/native'
import { color, typography } from '@/theme/'

export const PlainText = styled.Text`
  font-family: ${(props) => (props.bold ? 'Lato-Bold' : 'Lato-Regular')};
  font-size: ${(props) => (props.primary ? typography.md.fontSize : typography.sm.fontSize)}px;
  color: ${(props) => (props.black ? color.black : color.gray)};
  line-height: ${(props) => (props.multi ? '22px;' : '18px;')};
`
