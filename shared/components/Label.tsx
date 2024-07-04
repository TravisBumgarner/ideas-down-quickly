import { BORDER_RADIUS, BORDER_WIDTH, COLORS, SPACING } from '@/shared/theme'
import { useCallback, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler'
import { Icon, Text } from 'react-native-paper'

import { navigateWithParams, timeAgo } from '../utilities'
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
  id: string
}

const Label = ({
  color,
  icon,
  text,
  lastUsedAt,
  id,
  ...rest
}: Props & ReadonlyCondition) => {
  const swipeableRef = useRef<Swipeable>(null)

  const handleEdit = useCallback(() => {
    swipeableRef.current?.close()
    navigateWithParams('edit-label', { labelId: id })
  }, [id])

  const renderRightActions = useCallback(
    () => (
      <TouchableOpacity
        onPress={handleEdit}
        style={StyleSheet.flatten([
          styles.swipeableBase,
          styles.swipeableRight,
        ])}
      >
        <Icon source="pencil" size={24} color={COLORS.PRIMARY[300]} />
      </TouchableOpacity>
    ),
    [handleEdit]
  )

  const handlePress = useCallback(() => {
    rest.readonly ? null : rest.handlePress()
  }, [rest])

  return (
    <Swipeable ref={swipeableRef} renderRightActions={renderRightActions}>
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
          {/* For some reason no text adjusts the height of the Typography element */}
          <Typography variant="h2">{text.length > 0 ? text : ' '}</Typography>
          <Text style={styles.dateText}>
            {lastUsedAt
              ? `Last ideated ${timeAgo(lastUsedAt)}`
              : 'No ideation yet'}
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.NEUTRAL[900],
    borderRadius: BORDER_RADIUS.NONE,
    borderRightWidth: BORDER_WIDTH.LARGE,
    flexDirection: 'row',
    paddingHorizontal: SPACING.MEDIUM,
    paddingVertical: SPACING.SMALL,
    width: '100%',
  },
  dateText: {
    color: COLORS.NEUTRAL[200],
    fontSize: 13,
  },
  swipeableBase: {
    alignItems: 'center',
    backgroundColor: COLORS.NEUTRAL[900],
    borderRadius: BORDER_RADIUS.NONE,
    flexGrow: 1,
    justifyContent: 'center',
    padding: SPACING.MEDIUM,
  },
  swipeableRight: {
    marginLeft: SPACING.MEDIUM,
  },
  textContainer: {
    flexDirection: 'column',
    marginHorizontal: SPACING.MEDIUM,
  },
})

export default Label
