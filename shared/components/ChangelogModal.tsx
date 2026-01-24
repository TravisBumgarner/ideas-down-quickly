import type * as React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Modal, Portal, Text } from 'react-native-paper'

import { CHANGELOG, type ChangelogEntry } from '../changelog'
import { COLORS, SPACING } from '../theme'
import Button from './Button'
import ButtonWrapper from './ButtonWrapper'
import Typography from './Typography'

type Props = {
  visible: boolean
  onDismiss: () => void
  showFullChangelog: boolean
}

const VersionEntry: React.FC<{ entry: ChangelogEntry }> = ({ entry }) => (
  <View style={styles.versionContainer}>
    <View style={styles.versionHeader}>
      <Typography variant="h2">{`v${entry.version}`}</Typography>
      <Text style={styles.dateText}>{entry.date}</Text>
    </View>
    <View style={styles.changesList}>
      {entry.changes.map((change, index) => (
        <Text key={index} style={styles.changeItem}>
          {`• ${change}`}
        </Text>
      ))}
    </View>
  </View>
)

const ChangelogModal: React.FC<Props> = ({
  visible,
  onDismiss,
  showFullChangelog,
}) => {
  const entriesToShow = showFullChangelog ? CHANGELOG : CHANGELOG.slice(0, 1)

  return (
    <Portal>
      <Modal
        contentContainerStyle={styles.modalContainer}
        visible={visible}
        onDismiss={onDismiss}
      >
        <GestureHandlerRootView style={styles.gestureRoot}>
          <Typography variant="h1" style={styles.title}>
            {showFullChangelog ? 'Changelog' : "What's New"}
          </Typography>
          <ScrollView style={styles.scrollView}>
            {entriesToShow.map((entry, index) => (
              <VersionEntry key={index} entry={entry} />
            ))}
          </ScrollView>
          <ButtonWrapper
            full={
              <Button variant="filled" color="primary" onPress={onDismiss}>
                {showFullChangelog ? 'Close' : 'Got it!'}
              </Button>
            }
          />
        </GestureHandlerRootView>
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  changeItem: {
    color: COLORS.NEUTRAL[200],
    fontSize: 15,
    lineHeight: 22,
    marginBottom: SPACING.SMALL,
  },
  changesList: {
    marginTop: SPACING.SMALL,
  },
  dateText: {
    color: COLORS.NEUTRAL[400],
    fontSize: 14,
  },
  gestureRoot: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: COLORS.NEUTRAL[700],
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.MEDIUM,
    paddingTop: SPACING.MEDIUM,
    width: '100%',
  },
  scrollView: {
    flex: 1,
  },
  title: {
    marginBottom: SPACING.MEDIUM,
  },
  versionContainer: {
    backgroundColor: COLORS.NEUTRAL[900],
    marginBottom: SPACING.MEDIUM,
    padding: SPACING.MEDIUM,
  },
  versionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default ChangelogModal
