import { Text, type ButtonProps, TouchableOpacity } from 'react-native';

export type ThemedButtonPRops = ButtonProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default';
  label: string;
  onPress: () => void;
};

export function ThemedButton({
  lightColor,
  darkColor,
  type = 'default',
  onPress,
  label,
  ...rest
}: ThemedButtonPRops) {

  return (
    <TouchableOpacity
      {...rest}
      onPress={onPress}
    >
      <Text>{label}</Text>
    </TouchableOpacity>
  );
}

