import { BORDER_RADIUS, BORDER_WIDTH, COLORS, SPACING } from '@/shared/theme'
import { useCallback } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-paper'

import { IdeasByLabel } from '../types'
import { navigateWithParams } from '../utilities'
import Idea from './Idea'
import Typography from './Typography'

type Props = {
  ideasByLabel: IdeasByLabel
  onDeleteCallback: () => void
}

const IdeasbyLabel = ({ ideasByLabel, onDeleteCallback }: Props) => {
  const handleLabelPress = useCallback(() => {
    navigateWithParams('add-idea', { labelId: ideasByLabel.labelId })
  }, [ideasByLabel])

  return (
    <View style={StyleSheet.flatten([styles.container])}>
      <TouchableOpacity onPress={handleLabelPress}>
        <View
          style={StyleSheet.flatten([
            styles.headerContainer,
            { borderRightColor: ideasByLabel.color },
          ])}
        >
          <Icon
            source={ideasByLabel.icon}
            size={24}
            color={ideasByLabel.color}
          />
          <View style={styles.labelTextContainer}>
            <Typography variant="h2">{ideasByLabel.labelText}</Typography>
          </View>
        </View>
      </TouchableOpacity>
      {ideasByLabel.ideas.map(idea => (
        <Idea
          color={ideasByLabel.color}
          key={idea.id}
          idea={idea}
          onDeleteCallback={onDeleteCallback}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS.NONE,
    marginBottom: SPACING.SMALL,
    width: '100%',
  },
  headerContainer: {
    backgroundColor: COLORS.NEUTRAL[900],
    borderRightWidth: BORDER_WIDTH.LARGE,
    flexDirection: 'row',
    paddingLeft: SPACING.MEDIUM,
    paddingVertical: SPACING.MEDIUM,
    width: '100%',
  },
  labelTextContainer: {
    flexDirection: 'column',
    marginLeft: SPACING.MEDIUM,
  },
})

export default IdeasbyLabel
