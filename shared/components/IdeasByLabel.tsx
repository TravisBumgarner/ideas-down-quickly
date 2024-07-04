import { BORDER_RADIUS, BORDER_WIDTH, COLORS, SPACING } from '@/shared/theme'
import { StyleSheet, View } from 'react-native'
import { Icon } from 'react-native-paper'

import { IdeasByLabel } from '../types'
import Idea from './Idea'
import Typography from './Typography'

type Props = {
  ideasByLabel: IdeasByLabel
  onDeleteCallback: () => void
}

const IdeasbyLabel = ({ ideasByLabel, onDeleteCallback }: Props) => {
  return (
    <View style={StyleSheet.flatten([styles.container])}>
      <View
        style={StyleSheet.flatten([
          styles.headerContainer,
          { borderRightColor: ideasByLabel.color },
        ])}
      >
        <Icon source={ideasByLabel.icon} size={24} color={ideasByLabel.color} />
        <View style={styles.labelTextContainer}>
          <Typography variant="h2">{ideasByLabel.labelText}</Typography>
        </View>
      </View>
      {ideasByLabel.ideas.map((idea, index) => (
        <Idea
          color={ideasByLabel.color}
          key={index}
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
    marginVertical: SPACING.SMALL,
    width: '100%',
  },
  headerContainer: {
    backgroundColor: COLORS.NEUTRAL[900],
    borderRightWidth: BORDER_WIDTH.LARGE,
    flexDirection: 'row',
    paddingLeft: SPACING.MEDIUM,
    paddingTop: SPACING.MEDIUM,
    width: '100%',
  },
  labelTextContainer: {
    flexDirection: 'column',
    marginLeft: SPACING.MEDIUM,
  },
})

export default IdeasbyLabel
