import React, { useCallback, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Dropdown as DropdownRNED } from 'react-native-element-dropdown'
import { Icon } from 'react-native-paper'

import { COLORS, SPACING } from '../theme'

const Dropdown: React.FC<{
  data: { label: string; value: string }[]
  onChangeCallback: (value: string) => void
  value: string
  dropdownPosition: 'top' | 'bottom'
}> = ({ data, onChangeCallback, value, dropdownPosition }) => {
  const [isFocus, setIsFocus] = useState(false)

  const renderRightIcon = useCallback(() => {
    let source: string

    if (dropdownPosition === 'top') {
      source = isFocus ? 'chevron-down' : 'chevron-up'
    } else {
      source = isFocus ? 'chevron-up' : 'chevron-down'
    }

    return <Icon source={source} size={20} color={COLORS.PRIMARY[400]} />
  }, [isFocus, dropdownPosition])

  const onChange = useCallback(
    (item: { label: string; value: string }) => {
      onChangeCallback(item.value)
      setIsFocus(false)
    },
    [onChangeCallback]
  )

  return (
    <View style={styles.container}>
      <DropdownRNED
        style={[
          styles.dropdown,
          isFocus && { borderColor: COLORS.PRIMARY[300] },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        itemTextStyle={styles.itemTextStyle}
        dropdownPosition={dropdownPosition}
        maxHeight={300}
        labelField="label"
        valueField="value"
        containerStyle={styles.containerStyle}
        itemContainerStyle={styles.itemContainerStyle}
        placeholder={!isFocus ? 'Select item' : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={onChange}
        activeColor={COLORS.PRIMARY[400]}
        renderRightIcon={renderRightIcon}
      />
    </View>
  )
}

export default Dropdown

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.MEDIUM,
  },
  containerStyle: {
    backgroundColor: COLORS.NEUTRAL[900],
    borderColor: COLORS.PRIMARY[300],
    borderWidth: 0,
  },
  dropdown: {
    backgroundColor: COLORS.NEUTRAL[900],
    borderColor: COLORS.PRIMARY[300],
    borderWidth: 1,
    height: 50,
    paddingHorizontal: SPACING.MEDIUM,
  },
  iconStyle: {
    height: 20,
    width: 20,
  },
  itemContainerStyle: {
    backgroundColor: COLORS.NEUTRAL[900],
  },
  itemTextStyle: {
    color: COLORS.NEUTRAL[200],
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    color: COLORS.PRIMARY[200],
    fontSize: 16,
  },
})
