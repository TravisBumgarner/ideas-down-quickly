import queries from '@/db/queries'
import { BORDER_RADIUS, BORDER_WIDTH, COLORS, SPACING } from '@/shared/theme'
import { useCallback, useRef } from 'react'
import { TouchableOpacity, View } from 'react-native'
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
        style={{
          backgroundColor: COLORS.NEUTRAL[900],
          justifyContent: 'center',
          alignItems: 'center',
          padding: SPACING.XSMALL,
          borderRadius: BORDER_RADIUS.NONE,
          marginRight: SPACING.MEDIUM,
        }}
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
        style={{
          backgroundColor: COLORS.NEUTRAL[900],
          justifyContent: 'center',
          alignItems: 'center',
          padding: SPACING.XXSMALL,
          borderRadius: BORDER_RADIUS.NONE,
          marginLeft: SPACING.MEDIUM,
        }}
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
      <View
        style={{
          backgroundColor: COLORS.NEUTRAL[900],
          borderRightWidth: BORDER_WIDTH.LARGE,
          borderColor: color,
          paddingVertical: SPACING.SMALL,
          paddingHorizontal: SPACING.MEDIUM,
        }}
      >
        <Typography variant="body1" style={{ marginTop: SPACING.SMALL }}>
          {idea.text}
        </Typography>
      </View>
    </Swipeable>
  )
}

export default Idea
