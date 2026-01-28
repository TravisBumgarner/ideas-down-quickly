import type * as React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Modal, Portal, Text } from 'react-native-paper'

import { COLORS, SPACING } from '../theme'
import Button from './Button'
import ButtonWrapper from './ButtonWrapper'
import Typography from './Typography'

type Backup = {
  filename: string
  backupDate: string
}

type Props = {
  visible: boolean
  onDismiss: () => void
  onRestore: (filename: string) => void
  backups: Backup[]
}

const ICloudRestoreModal: React.FC<Props> = ({
  visible,
  onDismiss,
  onRestore,
  backups,
}) => {
  return (
    <Portal>
      <Modal
        contentContainerStyle={styles.modalContainer}
        visible={visible}
        onDismiss={onDismiss}
      >
        <GestureHandlerRootView>
          <Typography variant="h2" style={{ marginBottom: SPACING.MEDIUM }}>
            Select Backup to Restore
          </Typography>
          <ScrollView>
            {backups.length === 0 ? (
              <Text style={{ color: COLORS.NEUTRAL[300], marginBottom: SPACING.MEDIUM }}>
                No backups available.
              </Text>
            ) : (
              backups.map((backup, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => onRestore(backup.filename)}
                  style={styles.backupRow}
                >
                  <Text style={styles.backupDate}>
                    {new Date(backup.backupDate).toLocaleString()}
                  </Text>
                  <Text style={styles.backupFilename}>{backup.filename}</Text>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
          <ButtonWrapper
            full={
              <Button variant="filled" color="warning" onPress={onDismiss}>
                Close
              </Button>
            }
          />
        </GestureHandlerRootView>
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.NEUTRAL[700],
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.MEDIUM,
    paddingTop: SPACING.MEDIUM,
    width: '100%',
  },
  backupRow: {
    backgroundColor: COLORS.NEUTRAL[800],
    borderRadius: 8,
    paddingHorizontal: SPACING.MEDIUM,
    paddingVertical: SPACING.SMALL,
    marginBottom: SPACING.SMALL,
  },
  backupDate: {
    color: COLORS.NEUTRAL[100],
    fontSize: 16,
  },
  backupFilename: {
    color: COLORS.NEUTRAL[400],
    fontSize: 12,
    marginTop: 2,
  },
})

export default ICloudRestoreModal
