import { BORDER_RADIUS, COLORS, SPACING } from '@/shared/theme'
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
        backgroundColor: color,
        padding: SPACING.md,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Icon source={icon} size={24} color={COLORS.light.opaque} />
        <Typography
          style={{ lineHeight: 0, marginLeft: SPACING.sm }}
          variant="h2"
        >
          {label}
        </Typography>
      </View>
      <Typography variant="body1" style={{ marginTop: SPACING.sm }}>
        {text}
      </Typography>
    </View>
  )
}

export default Idea
