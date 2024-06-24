import queries from '@/db/queries'
import { BORDER_RADIUS, COLORS, SPACING } from '@/shared/theme'
import { useCallback, useRef } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { Icon } from 'react-native-paper'

import { navigateWithParams } from '../utilities'
import Typography from './Typography'

type Props = {
  color: string
  icon: string
  text: string
  label: string
  id: string
  onDeleteCallback: () => void
}

const Idea = ({ color, icon, text, label, id, onDeleteCallback }: Props) => {
  const swipeableRef = useRef<Swipeable>(null)

  const handleDelete = useCallback(async () => {
    await queries.delete.idea(id)
    onDeleteCallback()
  }, [id, onDeleteCallback])

  const handleEdit = useCallback(() => {
    navigateWithParams('edit-idea', { ideaId: id })
    swipeableRef.current?.close()
  }, [id])

  const renderLeftActions = useCallback(
    () => (
      <View
        style={{
          backgroundColor: color,
          justifyContent: 'center',
          alignItems: 'center',
          padding: SPACING.md,
          borderRadius: BORDER_RADIUS.md,
          marginRight: SPACING.md,
        }}
      >
        <TouchableOpacity onPress={handleDelete}>
          <Icon source="delete" size={24} color={COLORS.dark.opaque} />
        </TouchableOpacity>
      </View>
    ),
    [color, handleDelete]
  )

  const renderRightActions = useCallback(
    () => (
      <View
        style={{
          backgroundColor: color,
          justifyContent: 'center',
          alignItems: 'center',
          padding: SPACING.md,
          borderRadius: BORDER_RADIUS.md,
          marginLeft: SPACING.md,
        }}
      >
        <TouchableOpacity onPress={handleEdit}>
          <Icon source="pencil" size={24} color={COLORS.dark.opaque} />
        </TouchableOpacity>
      </View>
    ),
    [color, handleEdit]
  )

  return (
    <Swipeable
      ref={swipeableRef}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
    >
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
    </Swipeable>
  )
}

export default Idea
