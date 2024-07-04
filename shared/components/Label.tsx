import {
  BORDER_RADIUS,
  BORDER_WIDTH,
  COLORS2,
  SPACING,
  SPACING2,
} from '@/shared/theme'
import { useCallback, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler'
import { Icon, Text } from 'react-native-paper'

import { navigateWithParams } from '../utilities'
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

  const handleDelete = useCallback(async () => {
    console.log('unsorted')
  }, [])

  const handleEdit = useCallback(() => {
    navigateWithParams('edit-label', { labelId: id })
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
          flexGrow: 1,
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
          flexGrow: 1,
        }}
      >
        <Icon source="pencil" size={24} color={COLORS2.PRIMARY[300]} />
      </TouchableOpacity>
    ),
    [handleEdit]
  )

  const handlePress = useCallback(() => {
    rest.readonly ? null : rest.handlePress()
  }, [rest])

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
          <Typography variant="h2">{text}</Typography>
          <Text style={styles.text}>
            {lastUsedAt ? `Last ideated on ${lastUsedAt}` : 'No ideation yet'}
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
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

export default Label
