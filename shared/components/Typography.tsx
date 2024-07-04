import React from 'react'
import { StyleProp, StyleSheet, TextStyle } from 'react-native'
import { Text } from 'react-native-paper'

import { COLORS2, SPACING } from '../theme'

type TypographyProps = {
  children: React.ReactNode
  variant: 'h1' | 'h2' | 'body1' | 'caption'
  style?: StyleProp<TextStyle>
}

const Typography: React.FC<TypographyProps> = ({
  children,
  variant,
  style: styleProp,
}): React.ReactElement => {
  switch (variant) {
    case 'h1':
      return (
        <Text
          style={StyleSheet.flatten([styles.base, styles.h1, styleProp])}
          variant="displayLarge"
        >
          {children}
        </Text>
      )
    case 'h2':
      return (
        <Text
          style={StyleSheet.flatten([styles.base, styles.h2, styleProp])}
          variant="displayMedium"
        >
          {children}
        </Text>
      )
    case 'body1':
      return (
        <Text
          style={StyleSheet.flatten([styles.base, styles.body1, styleProp])}
          variant="bodyLarge"
        >
          {children}
        </Text>
      )
    case 'caption':
      return (
        <Text
          style={StyleSheet.flatten([styles.base, styles.caption, styleProp])}
          variant="bodyLarge"
        >
          {children}
        </Text>
      )
  }
}

const styles = StyleSheet.create({
  base: {
    color: COLORS2.NEUTRAL[100],
  },
  body1: {
    fontSize: 16,
  },
  caption: {
    color: COLORS2.NEUTRAL[500],
    fontSize: 13,
  },
  h1: {
    backgroundColor: COLORS2.NEUTRAL[800],
    color: COLORS2.NEUTRAL[400],
    fontSize: 24,
    marginVertical: SPACING.SMALL,
    textAlign: 'center',
  },
  h2: {
    color: COLORS2.NEUTRAL[200],
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 0, // TODO - ugh.
  },
})

export default Typography
