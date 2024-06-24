import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Button as ButtonRNP } from 'react-native-paper'
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon'

import { BORDER_RADIUS, COLORS } from '../theme'

const Button = ({
  children,
  variant,
  onPress,
  disabled,
  icon,
}: {
  children: React.ReactNode
  variant: 'primary' | 'secondary' | 'warning' | 'error'
  onPress: () => void
  disabled?: boolean
  icon?: IconSource
}): React.ReactElement => {
  switch (variant) {
    case 'primary':
      return (
        <ButtonRNP
          icon={icon}
          style={{ ...styles.base, ...styles.primary }}
          mode="contained"
          onPress={onPress}
          disabled={disabled}
        >
          <Text>{children}</Text>
        </ButtonRNP>
      )
    case 'secondary':
      return (
        <ButtonRNP
          icon={icon}
          style={{ ...styles.base, ...styles.secondary }}
          mode="contained"
          onPress={onPress}
          disabled={disabled}
        >
          <Text>{children}</Text>
        </ButtonRNP>
      )
    case 'warning':
      return (
        <ButtonRNP
          icon={icon}
          style={{ ...styles.base, ...styles.warning }}
          mode="contained"
          onPress={onPress}
          disabled={disabled}
        >
          <Text>{children}</Text>
        </ButtonRNP>
      )
    case 'error':
      return (
        <ButtonRNP
          icon={icon}
          style={{ ...styles.base, ...styles.error }}
          mode="contained"
          onPress={onPress}
          disabled={disabled}
        >
          <Text>{children}</Text>
        </ButtonRNP>
      )
  }
}

const styles = StyleSheet.create({
  base: {
    borderRadius: BORDER_RADIUS.md,
    width: '100%',
  },
  error: {
    backgroundColor: COLORS.error.opaque,
  },
  primary: {
    backgroundColor: COLORS.primary.opaque,
  },
  secondary: {
    backgroundColor: COLORS.secondary.opaque,
  },
  warning: {
    backgroundColor: COLORS.warning.opaque,
  },
})

export default Button
