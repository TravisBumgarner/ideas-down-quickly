import { BORDER_RADIUS, BORDER_WIDTH, COLORS2, SPACING2 } from '@/shared/theme'
import { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icon, Text } from 'react-native-paper'

import Typography from './Typography'

type ReadonlyCondition =
  | {
    readonly: false
    handlePress: () => void
  }
  | {
    readonly: true
  }

type Props = {
  color: string
  icon: string
  text: string
  lastUsedAt: string | null
}

const Label2 = ({
  color,
  icon,
  text,
  lastUsedAt,
  ...rest
}: Props & ReadonlyCondition) => {
  const handlePress = useCallback(() => {
    rest.readonly ? null : rest.handlePress()
  }, [rest])

  return (
    <TouchableOpacity
      style={StyleSheet.flatten([
        styles.container,
        {
          borderRightColor: color,
        },
      ])}
      onPress={handlePress}
    >
      <Icon source={icon} size={24} color={color} />
      <View style={styles.textContainer}>
        <Typography variant="h2">{text}</Typography>
        {lastUsedAt && (
          <Text style={styles.text}>Last ideated on {lastUsedAt}</Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: COLORS2.NEUTRAL[900],
    borderRadius: BORDER_RADIUS.NONE,
    borderRightWidth: BORDER_WIDTH.LARGE,
    flexDirection: 'row',
    paddingHorizontal: SPACING2.LARGE,
    paddingVertical: SPACING2.SMALL,
    width: '100%',
  },
  text: {
    color: COLORS2.NEUTRAL[200],
    fontSize: 13,
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: SPACING2.MEDIUM,
  },
})

export default Label2
