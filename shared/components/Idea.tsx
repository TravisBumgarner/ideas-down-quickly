import { BORDER_RADIUS, BORDER_WIDTH, COLORS, SPACING } from '@/shared/theme'
import { useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { Icon } from 'react-native-paper'

import { IdeasByLabel } from '../types'
import Typography from './Typography'

type Props = {
  ideasByLabel: IdeasByLabel
  onDeleteCallback: () => void
}

const Idea = ({
  ideasByLabel,
  // onDeleteCallback,
}: Props) => {
  const swipeableRef = useRef<Swipeable>(null)

  // const handleDelete = useCallback(async () => {
  //   await queries.delete.idea(id)
  //   onDeleteCallback()
  // }, [id, onDeleteCallback])

  // const handleEdit = useCallback(() => {
  //   navigateWithParams('edit-idea', { ideaId: id })
  //   swipeableRef.current?.close()
  // }, [id])

  // const renderLeftActions = useCallback(
  //   () => (
  //     <TouchableOpacity
  //       onPress={handleDelete}
  //       style={{
  //         backgroundColor: COLORS.NEUTRAL[900],
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         padding: SPACING.MEDIUM,
  //         borderRadius: BORDER_RADIUS.NONE,
  //         marginRight: SPACING.MEDIUM,
  //       }}
  //     >
  //       <Icon source="delete" size={24} color={COLORS.WARNING[300]} />
  //     </TouchableOpacity>
  //   ),
  //   [handleDelete]
  // )

  // const renderRightActions = useCallback(
  //   () => (
  //     <TouchableOpacity
  //       onPress={handleEdit}
  //       style={{
  //         backgroundColor: COLORS.NEUTRAL[900],
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         padding: SPACING.MEDIUM,
  //         borderRadius: BORDER_RADIUS.NONE,
  //         marginLeft: SPACING.MEDIUM,
  //       }}
  //     >
  //       <Icon source="pencil" size={24} color={COLORS.PRIMARY[300]} />
  //     </TouchableOpacity>
  //   ),
  //   [handleEdit]
  // )

  return (
    <Swipeable ref={swipeableRef} containerStyle={{ width: '100%' }}>
      <View
        style={StyleSheet.flatten([
          styles.container,
          {
            borderRightColor: ideasByLabel.color,
          },
        ])}
      >
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
          }}
        >
          <Icon
            source={ideasByLabel.icon}
            size={24}
            color={ideasByLabel.color}
          />
          <View style={styles.textContainer}>
            <Typography variant="h2">{ideasByLabel.labelText}</Typography>
          </View>
        </View>
        {ideasByLabel.ideas.map((idea, index) => (
          <Typography
            key={index}
            variant="body1"
            style={{ marginTop: SPACING.SMALL }}
          >
            {idea.text}
          </Typography>
        ))}
      </View>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.NEUTRAL[900],
    borderRadius: BORDER_RADIUS.NONE,
    borderRightWidth: BORDER_WIDTH.LARGE,
    marginVertical: SPACING.SMALL,
    padding: SPACING.MEDIUM,
    width: '100%',
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: SPACING.MEDIUM,
  },
})

export default Idea
