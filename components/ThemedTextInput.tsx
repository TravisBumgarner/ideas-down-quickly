import { TextInput, StyleSheet, type TextInputProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default';
  value: string;
  onChangeText: (text: string) => void;
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  value,
  onChangeText,
  type = 'default',
  ...rest
}: ThemedTextInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily: '"Montserrat", sans-serif',
    fontSize: 16,
    lineHeight: 24,
  },
});
