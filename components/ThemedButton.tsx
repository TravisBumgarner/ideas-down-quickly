import { Text, type ButtonProps, TouchableOpacity } from 'react-native';

export type ThemedButtonPRops = ButtonProps & {
  label: string;
  onPress: () => void;
};

export function ThemedButton({
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

