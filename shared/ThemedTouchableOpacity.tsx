import { SelectLabel, SelectIdea } from '@/db/schema';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

export type ThemedTextInputProps = TouchableOpacityProps & {
  data: SelectLabel | SelectIdea; // TODO - this bad.
  onPressCallback: (data: SelectLabel | SelectIdea) => void;
};

export function ThemedTouchableOpacity({
  onPressCallback,
  data,
  ...rest
}: ThemedTextInputProps) {
  const handleOnPress = () => {
    onPressCallback(data);
  };

  return (
    <TouchableOpacity onPress={handleOnPress} {...rest}>
      <Text>{data.text}</Text>
    </TouchableOpacity>
  );
}
