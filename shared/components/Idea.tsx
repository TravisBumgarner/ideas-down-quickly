import queries from '@/db/queries'
import { BORDER_RADIUS, COLORS2, SPACING, SPACING2 } from '@/shared/theme'
import { useCallback, useRef } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { Icon } from 'react-native-paper'

import { navigateWithParams } from '../utilities'
import Typography from './Typography'

type Props = {
  color: string
  icon: string
  text: string
  id: string
  onDeleteCallback: () => void
}

const Idea = ({ color, icon, text, id, onDeleteCallback }: Props) => {
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
      <TouchableOpacity
        onPress={handleDelete}
        style={{
          backgroundColor: COLORS2.NEUTRAL[900],
          justifyContent: 'center',
          alignItems: 'center',
          padding: SPACING.md,
          borderRadius: BORDER_RADIUS.NONE,
          marginRight: SPACING.md,
        }}
      >
        <Icon source="delete" size={24} color={COLORS2.WARNING[300]} />
      </TouchableOpacity>
    ),
    [handleDelete]
  )

  const renderRightActions = useCallback(
    () => (
      <TouchableOpacity
        onPress={handleEdit}
        style={{
          backgroundColor: COLORS2.NEUTRAL[900],
          justifyContent: 'center',
          alignItems: 'center',
          padding: SPACING.md,
          borderRadius: BORDER_RADIUS.NONE,
          marginLeft: SPACING.md,
        }}
      >
        <Icon source="pencil" size={24} color={COLORS2.PRIMARY[300]} />
      </TouchableOpacity>
    ),
    [handleEdit]
  )

  return (
    <Swipeable
      ref={swipeableRef}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
    >
      <View
        style={StyleSheet.flatten([
          styles.container,
          {
            borderRightColor: color,
          },
        ])}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Icon source={icon} size={24} color={color} />
          <View style={styles.textContainer}>
            <Typography variant="h2">{text}</Typography>
          </View>
        </View>
        <Typography variant="body1" style={{ marginTop: SPACING.sm }}>
          {text}
        </Typography>
      </View>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS2.NEUTRAL[900],
    borderRadius: BORDER_RADIUS.NONE,
    borderRightWidth: 8,
    padding: SPACING.md,
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: SPACING2.MEDIUM,
  },
})

export default Idea
