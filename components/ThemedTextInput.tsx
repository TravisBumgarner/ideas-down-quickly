import { TextInput, StyleSheet, type TextInputProps } from 'react-native';

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default';
  value: string;
  onChangeText: (text: string) => void;
};

export function ThemedTextInput({
  style,
  value,
  onChangeText,
  type = 'default',
  ...rest
}: ThemedTextInputProps) {

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      style={[
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
