import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { LayoutChangeEvent, ScrollView, StyleSheet, View } from 'react-native'
import { Menu, TextInput, TouchableRipple } from 'react-native-paper'

import { BORDER_RADIUS, BORDER_WIDTH, COLORS } from '../theme'

export interface DropDownPropsInterface<T extends string | number> {
  isVisible: boolean
  setIsVisible: (value: boolean) => void
  value: T
  setValue: (_value: T) => void
  label?: string | undefined
  placeholder?: string | undefined
  list: Array<{
    label: string
    value: string
    custom?: ReactNode
  }>
}

const DropDown = (props: DropDownPropsInterface<string>) => {
  const { isVisible, setIsVisible, value, setValue, label, placeholder, list } =
    props
  const [displayValue, setDisplayValue] = useState('')

  useEffect(() => {
    const _label = list.find(_ => _.value === value)?.label
    if (_label) {
      setDisplayValue(_label)
    }
  }, [list, value])

  const [inputLayout, setInputLayout] = useState({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  })

  const onLayout = (event: LayoutChangeEvent) => {
    setInputLayout(event.nativeEvent.layout)
  }

  const isActive = useCallback(
    (currentValue: string) => {
      return value === currentValue
    },
    [value]
  )

  const onDismiss = useCallback(() => {
    setIsVisible(false)
  }, [setIsVisible])

  const onOpen = useCallback(() => {
    setIsVisible(true)
  }, [setIsVisible])

  const setActive = useCallback(
    (currentValue: string) => {
      setValue(currentValue)
    },
    [setValue]
  )

  return (
    <View style={styles.container}>
      <Menu
        visible={isVisible}
        onDismiss={onDismiss}
        anchor={
          <TouchableRipple onPress={onOpen} onLayout={onLayout}>
            <View pointerEvents={'none'}>
              <TextInput
                value={displayValue}
                label={label}
                placeholder={placeholder}
                pointerEvents={'none'}
                right={
                  <TextInput.Icon icon={isVisible ? 'menu-up' : 'menu-down'} />
                }
                underlineColor="transparent"
                style={{
                  borderRadius: 0,
                  // For some reason, something is overriding the border radius so the next two lines are needed.
                  borderTopEndRadius: 0,
                  borderTopLeftRadius: 0,
                  backgroundColor: COLORS.NEUTRAL[900],
                  borderWidth: BORDER_WIDTH.XSMALL,
                  borderColor: COLORS.PRIMARY[400],
                  fontSize: 16,
                }}
              />
            </View>
          </TouchableRipple>
        }
        contentStyle={{
          backgroundColor: COLORS.NEUTRAL[900],
          borderRadius: BORDER_RADIUS.NONE,
        }}
        style={{
          width: inputLayout?.width,
          marginTop: inputLayout?.height,
          borderColor: COLORS.PRIMARY[400],
          borderLeftWidth: BORDER_WIDTH.XSMALL,
          borderRightWidth: BORDER_WIDTH.XSMALL,
          borderBottomWidth: BORDER_WIDTH.XSMALL,
        }}
      >
        <ScrollView
          bounces={false}
          style={{
            maxHeight: 300,
          }}
        >
          {list.map((_item, _index) => (
            <TouchableRipple
              key={_item.value}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomColor: COLORS.NEUTRAL[700],
                borderBottomWidth:
                  _index === list.length - 1
                    ? BORDER_WIDTH.NONE
                    : BORDER_WIDTH.XSMALL,
              }}
              onPress={() => {
                setActive(_item.value)
                onDismiss()
              }}
            >
              <Menu.Item
                title={_item.custom || _item.label}
                titleStyle={{
                  color: isActive(_item.value)
                    ? COLORS.PRIMARY[300]
                    : COLORS.NEUTRAL[200],
                }}
              />
            </TouchableRipple>
          ))}
        </ScrollView>
      </Menu>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default DropDown
