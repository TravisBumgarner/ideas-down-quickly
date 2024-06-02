import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

export type ThemedTextInputProps = TouchableOpacityProps & {
  label: string
};

export function ThemedTouchableOpacity({
  onPress,
  label,
  ...rest
}: ThemedTextInputProps) {

  return (
    <TouchableOpacity
      onPress={onPress}
      {...rest}
    >
      <Text>{label}</Text>
    </TouchableOpacity>
  );
}
