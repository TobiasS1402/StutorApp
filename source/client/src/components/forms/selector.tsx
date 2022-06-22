import { Card } from '@components/cards/card'
import { Button, Divider, PlainText, Title } from '@components/general'
import React from 'react'
import { Modal, Pressable, ScrollView, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import styled from 'styled-components/native'
import { color, spaces, typography } from '@/theme'
import { useToggle } from '@/utils'

interface Data {
  id: number
  value: string
}

interface SelectorProps {
  selectedValue?: string
  onValueChange: (value: string) => void
  data: Data[]
}

const defaultProps: SelectorProps = {
  selectedValue: '',
  onValueChange: () => null,
  data: [],
}

const CardContainer = styled(Card)`
  flex-direction: row;
  padding: ${spaces.xl2}px;
  justify-content: space-between;
  align-items: center;
`
const Dialog = styled.View`
  flex: 1;
  background: ${color.blackOpacity50};
  flex-direction: column;
  justify-content: center;
`

const SelectorContainer = styled.View`
  margin: ${spaces.xl5}px;
  max-height: 50%;
`

const SelectorCard = styled(Card)`
  padding: ${spaces.xl2}px;
`

const CancelBtn = styled(Button)`
  background: ${color.white};
`

export const Selector = (props: SelectorProps) => {
  const [show, setShow] = useToggle()

  const onValueChange = (value: string) => {
    if (!value) return

    props.onValueChange(value)
    setShow()
  }

  return (
    <View>
      <Pressable onPress={setShow}>
        <CardContainer>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome name="compass" size={30} color={color.orange} solid />
            <Divider small />
            <PlainText primary black>
              {props.selectedValue}
            </PlainText>
          </View>
          <FontAwesome name="chevron-down" size={20} color={color.grayLight} solid />
        </CardContainer>
      </Pressable>
      <Modal animationType="fade" transparent={true} visible={show}>
        <Dialog>
          <SelectorContainer>
            <SelectorCard>
              <ScrollView>
                {props.data.length ? (
                  props.data.map((item) => (
                    <Pressable key={item.id} onPress={() => onValueChange(item.value)}>
                      <Title
                        value={item.value}
                        fontSize={typography.lg.fontSize}
                        fontFamily="Lato-Regular"
                      />
                      <Divider />
                    </Pressable>
                  ))
                ) : (
                  <Title value="No data found" fontFamily="Lato-Regular" />
                )}
              </ScrollView>
            </SelectorCard>
            <CancelBtn onPress={setShow}>
              <Title value="Cancel" fontSize={typography.md.fontSize} fontFamily="Lato-Bold" />
            </CancelBtn>
          </SelectorContainer>
        </Dialog>
      </Modal>
    </View>
  )
}

Selector.defaultProps = defaultProps
