import { Container } from '@components/layout/container'
import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import { color, spaces, typography } from '@/theme'

interface TitleProps {
  value?: string
  fontSize?: number
  color?: string
  fontFamily?: string
  aligned?: string
  hide?: boolean
  hasOptions?: boolean
  routeName?: string
}

const defaultProps: TitleProps = {
  value: '',
  aligned: 'left',
  hide: false,
  hasOptions: false,
  routeName: 'Home',
  ...typography.xl,
}

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  option: {
    color: color.primary,
    marginRight: spaces.xl,
    fontFamily: 'Lato-Regular',
  },
})

export const Title = (props: TitleProps) => {
  const navigation = useNavigation()

  if (props.hide) return null

  return (
    <Container>
      <Text
        style={{
          fontSize: props.fontSize,
          color: props.color,
          fontFamily: props.fontFamily,
          textAlign: props.aligned,
        }}
      >
        {props.value}
      </Text>
      {props.hasOptions && (
        <Pressable
          style={styles.optionContainer}
          onPress={() => navigation.navigate(props.routeName as never, {} as never)}
        >
          <Text style={styles.option}>Bekijk alle</Text>
          <FontAwesome name={'chevron-right'} size={16} color={color.primary} solid />
        </Pressable>
      )}
    </Container>
  )
}

Title.defaultProps = defaultProps
