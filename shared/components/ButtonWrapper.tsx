import React from 'react'
import { StyleSheet, View } from 'react-native'

import { SPACING2 } from '../theme'

type ButtonWrapperProps = {
  left?: React.ReactElement
  right?: React.ReactElement
  full?: React.ReactElement
}

const ButtonWrapper: React.FC<ButtonWrapperProps> = ({ left, right, full }) => {
  if (full) {
    return <View style={styles.full}>{full}</View>
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonLeft}>{left}</View>
      <View style={styles.buttonRight}>{right}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonLeft: {
    flex: 1,
    marginRight: SPACING2.SMALL,
  },
  buttonRight: {
    flex: 1,
    marginLeft: SPACING2.SMALL,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING2.MEDIUM,
    marginTop: SPACING2.MEDIUM,
  },
  full: {
    margin: SPACING2.MEDIUM,
  },
})

export default ButtonWrapper
