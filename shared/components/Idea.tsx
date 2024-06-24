import { BORDER_RADIUS, SPACING } from '@/shared/theme'
import { View } from 'react-native'
import { Icon } from 'react-native-paper'

import Typography from './Typography'

type Props = {
  color: string
  icon: string
  text: string
  label: string
}

const Idea = ({ color, icon, text, label }: Props) => {
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
        <Typography variant="h2">{label}</Typography>
      </View>
      <Typography variant="body1">{text}</Typography>
    </View>
  )
}

export default Idea
