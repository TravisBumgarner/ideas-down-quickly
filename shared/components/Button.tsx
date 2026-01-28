import type React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Button as ButtonRNP } from 'react-native-paper'
import type { IconSource } from 'react-native-paper/lib/typescript/components/Icon'

import { useTheme } from '../ThemeContext'
import { BORDER_RADIUS, COLORS } from '../theme'

const Button = ({
  children,
  color,
  variant,
  onPress,
  disabled,
  icon,
}: {
  children: React.ReactNode
  color: 'primary' | 'warning'
  onPress: () => void
  disabled?: boolean
  icon?: IconSource
  variant: 'filled' | 'link'
}): React.ReactElement => {
  const { colors } = useTheme()

  const SHARED = {
    textColor: colors.textPrimary,
  } as const

  switch (color) {
    case 'primary':
      return (
        <ButtonRNP
          style={StyleSheet.flatten([
            {
              ...buttonStyles.base,
              ...(variant === 'filled'
                ? buttonStyles.primaryFilled
                : buttonStyles.primaryLink),
              ...(disabled ? { backgroundColor: colors.surface } : {}),
            },
          ])}
          onPress={onPress}
          disabled={disabled}
          icon={icon}
          {...SHARED}
        >
          <Text
            style={{
              ...(variant === 'filled'
                ? { color: colors.surfaceVariant, fontWeight: 'bold' as const }
                : { color: colors.primary }),
              ...(disabled ? { color: colors.textDisabled } : {}),
            }}
          >
            {children}
          </Text>
        </ButtonRNP>
      )
    case 'warning':
      return (
        <ButtonRNP
          style={StyleSheet.flatten([
            {
              ...buttonStyles.base,
              ...(variant === 'filled'
                ? buttonStyles.warningFilled
                : buttonStyles.warningLink),
              ...(disabled ? { backgroundColor: colors.surface } : {}),
            },
          ])}
          {...SHARED}
          onPress={onPress}
          disabled={disabled}
          icon={icon}
        >
          <Text
            style={StyleSheet.flatten([
              {
                ...(variant === 'filled'
                  ? { color: colors.surfaceVariant, fontWeight: 'bold' as const }
                  : { color: COLORS.WARNING[300] }),
                ...(disabled ? { color: colors.textDisabled } : {}),
              },
            ])}
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
    backgroundColor: COLORS.PRIMARY[300],
  },
  primaryLink: {
    backgroundColor: COLORS.MISC.TRANSPARENT,
  },
  warningFilled: {
    backgroundColor: COLORS.WARNING[300],
  },
  warningLink: {
    backgroundColor: COLORS.MISC.TRANSPARENT,
  },
})

export default Button
