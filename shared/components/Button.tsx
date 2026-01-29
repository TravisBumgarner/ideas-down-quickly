import type React from 'react'
import { StyleSheet } from 'react-native'
import { Button as ButtonRNP } from 'react-native-paper'
import type { IconSource } from 'react-native-paper/lib/typescript/components/Icon'

import { useTheme } from '../ThemeContext'
import { BORDER_RADIUS } from '../theme'

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
  variant: 'filled' | 'outlined' | 'link'
}): React.ReactElement => {
  const { colors } = useTheme()

  const accentColor = color === 'primary' ? colors.primary : colors.warning

  if (variant === 'filled') {
    return (
      <ButtonRNP
        mode="contained"
        style={buttonStyles.base}
        buttonColor={disabled ? colors.surface : accentColor}
        textColor={disabled ? colors.textDisabled : colors.surfaceVariant}
        onPress={onPress}
        disabled={disabled}
        icon={icon}
        labelStyle={buttonStyles.filledLabel}
      >
        {children}
      </ButtonRNP>
    )
  }

  if (variant === 'outlined') {
    return (
      <ButtonRNP
        mode="outlined"
        style={[buttonStyles.base, { borderColor: disabled ? colors.textDisabled : accentColor }]}
        textColor={disabled ? colors.textDisabled : accentColor}
        onPress={onPress}
        disabled={disabled}
        icon={icon}
      >
        {children}
      </ButtonRNP>
    )
  }

  return (
    <ButtonRNP
      mode="text"
      style={buttonStyles.base}
      textColor={disabled ? colors.textDisabled : accentColor}
      onPress={onPress}
      disabled={disabled}
      icon={icon}
    >
      {children}
    </ButtonRNP>
  )
}

const buttonStyles = StyleSheet.create({
  base: {
    borderRadius: BORDER_RADIUS.NONE,
    width: '100%',
  },
  filledLabel: {
    fontWeight: 'bold',
  },
})

export default Button
