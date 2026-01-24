import { useCallback, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler'
import { Icon, Modal, Portal, Text } from 'react-native-paper'
import { BORDER_RADIUS, BORDER_WIDTH, COLORS, SPACING } from '@/shared/theme'

import { navigateWithParams, timeAgo } from '../utilities'
import Button from './Button'
import ButtonWrapper from './ButtonWrapper'
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
}: Props) => {
  const swipeableRef = useRef<Swipeable>(null)
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false)

  const handleEdit = useCallback(() => {
    swipeableRef.current?.close()
    navigateWithParams('edit-label', { labelId: id })
  }, [id])

  const handleArchivePress = useCallback(() => {
    swipeableRef.current?.close()
    setIsConfirmModalVisible(true)
  }, [])

  const handleArchiveConfirm = useCallback(() => {
    setIsConfirmModalVisible(false)
    onArchive?.()
  }, [onArchive])

  const handleArchiveCancel = useCallback(() => {
    setIsConfirmModalVisible(false)
  }, [])

  const renderLeftActions = useCallback(() => {
    if (disableSideSwipe) return null

    return (
      <TouchableOpacity
        onPress={handleArchivePress}
        style={StyleSheet.flatten([
          styles.swipeableBase,
          styles.swipeableLeft,
        ])}
      >
        <Icon source="archive" size={24} color={COLORS.WARNING[300]} />
      </TouchableOpacity>
    )
  }, [handleArchivePress, disableSideSwipe])

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
    <>
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

      <Portal>
        <Modal
          visible={isConfirmModalVisible}
          onDismiss={handleArchiveCancel}
          contentContainerStyle={styles.modalContainer}
        >
          <Typography variant="h2">Archive "{text}"?</Typography>
          <Text style={styles.modalText}>
            This label and its ideas will be hidden. You can view archived items
            from the Reflect tab.
          </Text>
          <ButtonWrapper
            left={
              <Button variant="link" color="primary" onPress={handleArchiveCancel}>
                Cancel
              </Button>
            }
            right={
              <Button variant="filled" color="warning" onPress={handleArchiveConfirm}>
                Archive
              </Button>
            }
          />
        </Modal>
      </Portal>
    </>
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
  modalContainer: {
    backgroundColor: COLORS.NEUTRAL[700],
    borderRadius: BORDER_RADIUS.MEDIUM,
    margin: SPACING.LARGE,
    padding: SPACING.MEDIUM,
  },
  modalText: {
    color: COLORS.NEUTRAL[200],
    marginBottom: SPACING.MEDIUM,
    marginTop: SPACING.SMALL,
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
})

export default Label
