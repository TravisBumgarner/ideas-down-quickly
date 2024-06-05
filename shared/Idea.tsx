import { BORDER_RADIUS, SPACING } from '@/app/theme';
import { View } from 'react-native';
import { Icon, Text } from 'react-native-paper';

type Props = {
  color: string;
  icon: string;
  text: string;
  label: string;
  date: string;
};

const Idea = ({ color, icon, text, label, date }: Props) => {
  return (
    <View
      style={{
        borderRadius: BORDER_RADIUS.md,
        flex: 1,
        backgroundColor: color,
        padding: SPACING.sm,
        flexDirection: 'column',
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <Icon source={icon} size={24} color="#fff" />
        <Text style={{ fontWeight: 900, marginLeft: SPACING.sm }}>{label}</Text>
      </View>
      <Text>{text}</Text>
      <Text>{date}</Text>
    </View>
  );
};

export default Idea;
