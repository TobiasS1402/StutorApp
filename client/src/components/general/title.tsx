import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import { color, spaces } from '@/theme'

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
  fontSize: 20,
  color: color.black,
  fontFamily: 'Lato-Black',
  aligned: 'left',
  hide: false,
  hasOptions: false,
  routeName: 'Home',
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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
    <View style={styles.container}>
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
          onPress={() =>
            navigation.navigate(props.routeName as never, {} as never)
          }
        >
          <Text style={styles.option}>Bekijk alle</Text>
          <FontAwesome
            name={'chevron-right'}
            size={16}
            color={color.primary}
            solid
          />
        </Pressable>
      )}
    </View>
  )
}

Title.defaultProps = defaultProps
