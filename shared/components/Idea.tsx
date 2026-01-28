import { useCallback, useRef } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { Icon } from 'react-native-paper'
import queries from '@/db/queries'
import { useTheme } from '@/shared/ThemeContext'
import { BORDER_RADIUS, BORDER_WIDTH, COLORS, SPACING } from '@/shared/theme'

import type { Idea as IdeaType } from '../types'
import { navigateWithParams } from '../utilities'
import Typography from './Typography'

const Idea = ({
  idea,
  color,
  onDeleteCallback,
}: {
  idea: IdeaType
  color: string
  onDeleteCallback: () => void
}) => {
  const { colors } = useTheme()
  const swipeableRef = useRef<Swipeable>(null)

  const handleDelete = useCallback(async () => {
    await queries.delete.idea(idea.id)
    onDeleteCallback()
  }, [idea.id, onDeleteCallback])

  const handleEdit = useCallback(() => {
    navigateWithParams('edit-idea', { ideaId: idea.id })
    swipeableRef.current?.close()
  }, [idea.id])

  const renderLeftActions = useCallback(
    () => (
      <TouchableOpacity
        onPress={handleDelete}
        style={StyleSheet.flatten([styles.swipeableBase, styles.swipeableLeft, { backgroundColor: colors.surfaceVariant, borderTopColor: colors.background }])}
      >
        <Icon source="delete" size={24} color={COLORS.WARNING[300]} />
      </TouchableOpacity>
    ),
    [handleDelete, colors]
  )
  const renderRightActions = useCallback(
    () => (
      <TouchableOpacity
        onPress={handleEdit}
        style={StyleSheet.flatten([
          styles.swipeableBase,
          styles.swipeableRight,
          { backgroundColor: colors.surfaceVariant, borderTopColor: colors.background },
        ])}
      >
        <Icon source="pencil" size={24} color={COLORS.PRIMARY[300]} />
      </TouchableOpacity>
    ),
    [handleEdit, colors]
  )

  return (
    <Swipeable
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      ref={swipeableRef}
      containerStyle={{ width: '100%' }}
    >
      <View style={[styles.separator, { borderTopColor: colors.background }]}>
        <View
          style={StyleSheet.flatten([
            styles.textContainer,
            { borderRightColor: color, backgroundColor: colors.surfaceVariant },
          ])}
        >
          <Typography variant="body1">{idea.text}</Typography>
        </View>
      </View>
    </Swipeable>
  )
}

const SHARED_SPACING = SPACING.SMALL

const styles = StyleSheet.create({
  separator: {
    borderTopWidth: SHARED_SPACING,
  },
  swipeableBase: {
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.NONE,
    borderTopWidth: SHARED_SPACING,
    justifyContent: 'center',
    padding: SPACING.SMALL,
  },
  swipeableLeft: {
    marginRight: SHARED_SPACING,
  },
  swipeableRight: {
    marginLeft: SHARED_SPACING,
  },
  textContainer: {
    borderRightWidth: BORDER_WIDTH.LARGE,
    paddingHorizontal: SPACING.MEDIUM,
    paddingVertical: SPACING.SMALL,
  },
})
export default Idea
