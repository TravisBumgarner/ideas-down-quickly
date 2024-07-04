// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
// Can currently only load Ionicons icons.

import Ionicons from '@expo/vector-icons/Ionicons'
import { type IconProps } from '@expo/vector-icons/build/createIconSet'
import { type ComponentProps } from 'react'

import { COLORS } from '../theme'

export function TabBarIcon({
  style,
  isFocused,
  ...rest
}: IconProps<ComponentProps<typeof Ionicons>['name']> & {
  isFocused: boolean
}) {
  return (
    <Ionicons
      color={isFocused ? COLORS.PRIMARY[300] : COLORS.NEUTRAL[300]}
      size={28}
      style={[{ marginBottom: -3 }, style]}
      {...rest}
    />
  )
}
