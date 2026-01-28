import type React from 'react'
import { type StyleProp, StyleSheet, type TextStyle } from 'react-native'
import { Text } from 'react-native-paper'

import { useTheme } from '../ThemeContext'

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
  const { colors } = useTheme()

  const baseStyle = { color: colors.textPrimary }

  switch (variant) {
    case 'h1':
      return (
        <Text
          style={StyleSheet.flatten([
            baseStyle,
            styles.h1,
            { backgroundColor: colors.background, color: colors.textDisabled },
            styleProp,
          ])}
          variant="displayLarge"
        >
          {children}
        </Text>
      )
    case 'h2':
      return (
        <Text
          style={StyleSheet.flatten([
            baseStyle,
            styles.h2,
            { color: colors.textSecondary },
            styleProp,
          ])}
          variant="displayMedium"
        >
          {children}
        </Text>
      )
    case 'body1':
      return (
        <Text
          style={StyleSheet.flatten([baseStyle, styles.body1, styleProp])}
          variant="bodyLarge"
        >
          {children}
        </Text>
      )
    case 'caption':
      return (
        <Text
          style={StyleSheet.flatten([
            baseStyle,
            styles.caption,
            { color: colors.textDisabled },
            styleProp,
          ])}
          variant="bodyLarge"
        >
          {children}
        </Text>
      )
  }
}

const styles = StyleSheet.create({
  body1: {
    fontSize: 16,
  },
  caption: {
    fontSize: 13,
  },
  h1: {
    fontSize: 24,
    textAlign: 'center',
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 20, // lineHeight of 0 will cause component to dissapear.
  },
})

export default Typography
