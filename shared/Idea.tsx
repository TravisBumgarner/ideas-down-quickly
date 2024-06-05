import { BORDER_RADIUS } from '@/app/theme';
import { View } from 'react-native';
import { Icon, Text } from 'react-native-paper';

type Props = {
  color: string;
  icon: string;
  text: string;
};

const Idea = ({ color, icon, text }: Props) => {
  return (
    <View
      style={{
        borderRadius: BORDER_RADIUS.md,
        flex: 1,
        backgroundColor: color,
      }}
    >
      <Text>{text}</Text>
      <Icon source={icon} size={24} color="#fff" />
    </View>
  );
};

export default Idea;
