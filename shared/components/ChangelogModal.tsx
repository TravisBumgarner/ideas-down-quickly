import type * as React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Modal, Portal, Text } from 'react-native-paper'

import { CHANGELOG, type ChangelogEntry } from '../changelog'
import { useTheme } from '../ThemeContext'
import type { SemanticColors } from '../theme'
import { SPACING } from '../theme'
import Button from './Button'
import ButtonWrapper from './ButtonWrapper'
import Typography from './Typography'

type Props = {
  visible: boolean
  onDismiss: () => void
  showFullChangelog: boolean
}

const VersionEntry: React.FC<{ entry: ChangelogEntry; colors: SemanticColors }> = ({
  entry,
  colors,
}) => (
  <View style={[styles.versionContainer, { backgroundColor: colors.surfaceVariant }]}>
    <View style={styles.versionHeader}>
      <Typography variant="h2">{`v${entry.version}`}</Typography>
      <Text style={[styles.dateText, { color: colors.textDisabled }]}>{entry.date}</Text>
    </View>
    <View style={styles.changesList}>
      {entry.changes.map((change, index) => (
        <Text key={index} style={[styles.changeItem, { color: colors.textSecondary }]}>
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
  const { colors } = useTheme()
  const entriesToShow = showFullChangelog ? CHANGELOG : CHANGELOG.slice(0, 1)

  return (
    <Portal>
      <Modal
        contentContainerStyle={[styles.modalContainer, { backgroundColor: colors.surface }]}
        visible={visible}
        onDismiss={onDismiss}
      >
        <GestureHandlerRootView style={styles.gestureRoot}>
          <Typography variant="h1" style={styles.title}>
            {showFullChangelog ? 'Changelog' : "What's New"}
          </Typography>
          <ScrollView style={styles.scrollView}>
            {entriesToShow.map((entry, index) => (
              <VersionEntry key={index} entry={entry} colors={colors} />
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
    fontSize: 15,
    lineHeight: 22,
    marginBottom: SPACING.SMALL,
  },
  changesList: {
    marginTop: SPACING.SMALL,
  },
  dateText: {
    fontSize: 14,
  },
  gestureRoot: {
    flex: 1,
  },
  modalContainer: {
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
