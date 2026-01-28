// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
// Can currently only load Ionicons icons.

import type { IconProps } from '@expo/vector-icons/build/createIconSet'
import Ionicons from '@expo/vector-icons/Ionicons'
import type { ComponentProps } from 'react'

import { useTheme } from '../ThemeContext'

export function TabBarIcon({
  style,
  isFocused,
  ...rest
}: IconProps<ComponentProps<typeof Ionicons>['name']> & {
  isFocused: boolean
}) {
  const { colors } = useTheme()
  return (
    <Ionicons
      color={isFocused ? colors.tabBarActive : colors.tabBarLabel}
      size={28}
      style={[{ marginBottom: -3 }, style]}
      {...rest}
    />
  )
}
