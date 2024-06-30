import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Button as ButtonRNP } from 'react-native-paper'
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon'

import { BORDER_RADIUS, COLORS, COLORS2 } from '../theme'

const SHARED = {
  textColor: COLORS.light.opaque,
} as const

const Button = ({
  children,
  color,
  variant,
  ...shared
}: {
  children: React.ReactNode
  color: 'primary' | 'warning'
  onPress: () => void
  disabled?: boolean
  icon?: IconSource
  variant: 'filled' | 'link'
}): React.ReactElement => {
  switch (color) {
    case 'primary':
      return (
        <ButtonRNP
          style={{
            ...buttonStyles.base,
            ...(variant === 'filled'
              ? buttonStyles.primaryFilled
              : buttonStyles.primaryLink),
          }}
          {...SHARED}
          {...shared}
        >
          <Text
            style={{
              ...textStyles.base,
              ...(variant === 'filled'
                ? textStyles.primaryFilled
                : textStyles.primaryLink),
            }}
          >
            {children}
          </Text>
        </ButtonRNP>
      )
    case 'warning':
      return (
        <ButtonRNP
          style={{
            ...buttonStyles.base,
            ...(variant === 'filled'
              ? buttonStyles.warningFilled
              : buttonStyles.warningLink),
          }}
          {...SHARED}
          {...shared}
        >
          <Text
            style={{
              ...textStyles.base,
              ...(variant === 'filled'
                ? textStyles.warningFilled
                : textStyles.warningLink),
            }}
          >
            {children}
          </Text>
        </ButtonRNP>
      )
  }
}

const buttonStyles = StyleSheet.create({
  base: {
    borderRadius: BORDER_RADIUS.NONE,
    width: '100%',
  },
  primaryFilled: {
    backgroundColor: COLORS2.PRIMARY[300],
  },
  primaryLink: {
    backgroundColor: COLORS2.MISC.TRANSPARENT,
  },
  warningFilled: {
    backgroundColor: COLORS2.PRIMARY[300],
  },
  warningLink: {
    backgroundColor: COLORS2.MISC.TRANSPARENT,
  },
})

const textStyles = StyleSheet.create({
  base: {
    fontWeight: 'bold',
  },
  primaryFilled: {
    color: COLORS2.NEUTRAL[900],
  },
  primaryLink: {
    color: COLORS2.PRIMARY[300],
  },
  warningFilled: {
    color: COLORS2.NEUTRAL[900],
  },
  warningLink: {
    color: COLORS2.WARNING[300],
  },
})

export default Button
