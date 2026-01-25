import { useCallback, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler'
import { Icon, Text } from 'react-native-paper'
import { BORDER_RADIUS, BORDER_WIDTH, COLORS, SPACING } from '@/shared/theme'

import { navigateWithParams, timeAgo } from '../utilities'
import Typography from './Typography'

type Props = {
  color: string
  icon: string
  text: string
  lastUsedAt: string | null
  id: string
  handlePress?: () => void
  disableSideSwipe?: boolean
  onArchive?: () => void
  isArchived?: boolean
}

const Label = ({
  color,
  icon,
  text,
  lastUsedAt,
  id,
  handlePress,
  disableSideSwipe,
  onArchive,
  isArchived,
}: Props) => {
  const swipeableRef = useRef<Swipeable>(null)

  const handleEdit = useCallback(() => {
    swipeableRef.current?.close()
    navigateWithParams('edit-label', { labelId: id })
  }, [id])

  const handleArchive = useCallback(() => {
    swipeableRef.current?.close()
    onArchive?.()
  }, [onArchive])

  const renderLeftActions = useCallback(() => {
    if (disableSideSwipe) return null

    return (
      <TouchableOpacity
        onPress={handleArchive}
        style={StyleSheet.flatten([styles.swipeableBase, styles.swipeableLeft])}
      >
        <Icon
          source={isArchived ? 'archive-arrow-up' : 'archive'}
          size={24}
          color={isArchived ? COLORS.PRIMARY[300] : COLORS.WARNING[300]}
        />
      </TouchableOpacity>
    )
  }, [handleArchive, disableSideSwipe, isArchived])

  const renderRightActions = useCallback(() => {
    if (disableSideSwipe) return null

    return (
      <TouchableOpacity
        onPress={handleEdit}
        style={StyleSheet.flatten([
          styles.swipeableBase,
          styles.swipeableRight,
        ])}
      >
        <Icon source="pencil" size={24} color={COLORS.PRIMARY[300]} />
      </TouchableOpacity>
    )
  }, [handleEdit, disableSideSwipe])

  return (
    <Swipeable
      ref={swipeableRef}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
    >
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
          <View style={styles.titleRow}>
            <Typography variant="h2">{text.length > 0 ? text : ' '}</Typography>
            {isArchived && (
              <Icon source="archive" size={16} color={COLORS.WARNING[300]} />
            )}
          </View>
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
  swipeableLeft: {
    marginRight: SPACING.MEDIUM,
  },
  swipeableRight: {
    marginLeft: SPACING.MEDIUM,
  },
  textContainer: {
    flexDirection: 'column',
    marginHorizontal: SPACING.MEDIUM,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.SMALL,
  },
})

export default Label
