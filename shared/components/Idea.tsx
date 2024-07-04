import queries from '@/db/queries'
import { BORDER_RADIUS, BORDER_WIDTH, COLORS, SPACING } from '@/shared/theme'
import { useCallback, useRef } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { Icon } from 'react-native-paper'

import { Idea as IdeaType } from '../types'
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
        style={StyleSheet.flatten([styles.swipeableBase, styles.swipeableLeft])}
      >
        <Icon source="delete" size={24} color={COLORS.WARNING[300]} />
      </TouchableOpacity>
    ),
    [handleDelete]
  )
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

  return (
    <Swipeable
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      ref={swipeableRef}
      containerStyle={{ width: '100%' }}
    >
      <View style={styles.separator}>
        <View
          style={StyleSheet.flatten([
            styles.textContainer,
            { borderRightColor: color },
          ])}
        >
          <Typography variant="body1">{idea.text}</Typography>
        </View>
      </View>
    </Swipeable>
  )
}

const SHARED_SPACING = BORDER_WIDTH.ML

const styles = StyleSheet.create({
  separator: {
    borderTopColor: COLORS.NEUTRAL[800],
    borderTopWidth: SHARED_SPACING,
  },
  swipeableBase: {
    alignItems: 'center',
    backgroundColor: COLORS.NEUTRAL[900],
    borderRadius: BORDER_RADIUS.NONE,
    borderTopColor: COLORS.NEUTRAL[800],
    borderTopWidth: SHARED_SPACING,
    justifyContent: 'center',
    padding: SPACING.XXSMALL,
  },
  swipeableLeft: {
    marginRight: SHARED_SPACING,
  },
  swipeableRight: {
    marginLeft: SHARED_SPACING,
  },
  textContainer: {
    backgroundColor: COLORS.NEUTRAL[900],
    borderRightWidth: BORDER_WIDTH.LARGE,
    paddingHorizontal: SPACING.MEDIUM,
    paddingVertical: SPACING.SMALL,
  },
})
export default Idea
