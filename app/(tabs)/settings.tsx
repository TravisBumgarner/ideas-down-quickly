import queries from '@/db/queries'
import { IdeaRunType, LabelRunType } from '@/db/schema'
import Button from '@/shared/components/Button'
import ButtonWrapper from '@/shared/components/ButtonWrapper'
import ChangelogModal from '@/shared/components/ChangelogModal'
import ICloudRestoreModal from '@/shared/components/ICloudRestoreModal'
import PageWrapper from '@/shared/components/PageWrapper'
import Typography from '@/shared/components/Typography'
import { context } from '@/shared/context'
import {
  backupToICloud,
  getAvailableICloudBackups,
  getICloudBackupEnabled,
  getICloudBackupInfo,
  type ICloudBackupEntry,
  isIOS,
  restoreFromICloud,
  setICloudBackupEnabled,
} from '@/shared/icloud'
import { SPACING } from '@/shared/theme'
import { useTheme } from '@/shared/ThemeContext'
import * as Sentry from '@sentry/react-native'
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system'
import { router } from 'expo-router'
import * as Sharing from 'expo-sharing'
import * as React from 'react'
import { Alert, Linking, ScrollView, View } from 'react-native'
import { Switch, Text } from 'react-native-paper'

const Settings = () => {
  const { colors, mode, setMode } = useTheme()
  const { dispatch } = React.useContext(context)
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [isChangelogVisible, setIsChangelogVisible] = React.useState(false)
  const [iCloudEnabled, setICloudEnabled] = React.useState(false)
  const [iCloudBackupDate, setICloudBackupDate] = React.useState<string | null>(
    null
  )
  const [iCloudBackups, setICloudBackups] = React.useState<ICloudBackupEntry[]>(
    []
  )
  const [isRestoreModalVisible, setIsRestoreModalVisible] =
    React.useState(false)
  const [hasData, setHasData] = React.useState(false)

  const fetchICloudBackups = React.useCallback(async () => {
    const backups = await getAvailableICloudBackups()
    setICloudBackups(backups)
  }, [])

  React.useEffect(() => {
    const checkData = async () => {
      const labels = await queries.select.labels()
      const ideas = await queries.select.ideas()
      setHasData(labels.length > 0 || ideas.length > 0)
    }
    checkData()
  }, [])

  React.useEffect(() => {
    if (isIOS) {
      getICloudBackupEnabled().then(setICloudEnabled)
      getICloudBackupInfo().then(info => {
        if (info.exists && info.backupDate) {
          setICloudBackupDate(info.backupDate)
        }
      })
      fetchICloudBackups()
    }
  }, [fetchICloudBackups])

  const handleBackup = async () => {
    setIsProcessing(true)
    try {
      const labels = await queries.select.labels()
      const ideas = await queries.select.ideas()
      const dbContent = JSON.stringify({ labels, ideas })
      const backupPath = `${FileSystem.documentDirectory}backup_${new Date().toISOString()}.json`
      await FileSystem.writeAsStringAsync(backupPath, dbContent)
      await Sharing.shareAsync(backupPath)
      dispatch({
        type: 'TOAST',
        payload: {
          message: `Backup created`,
          variant: 'SUCCESS',
        },
      })
    } catch (error) {
      Sentry.captureException(error)
      dispatch({
        type: 'TOAST',
        payload: { message: 'Something went wrong', variant: 'ERROR' },
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleRestore = () => {
    Alert.alert(
      'Restore from Backup',
      'This will replace all current data with the backup file. This action cannot be undone. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Restore',
          style: 'destructive',
          onPress: performRestore,
        },
      ]
    )
  }

  const performRestore = async () => {
    setIsProcessing(true)
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      })

      if (!result.assets) {
        dispatch({
          type: 'TOAST',
          payload: { message: 'Restore Cancelled', variant: 'WARNING' },
        })
        return
      }

      if (result.assets.length !== 1) {
        dispatch({
          type: 'TOAST',
          payload: {
            message: 'Select only one file to restore',
            variant: 'WARNING',
          },
        })
        return
      }

      const dbContent = await FileSystem.readAsStringAsync(result.assets[0].uri)
      const { labels: rawLabels, ideas: rawIdeas } = JSON.parse(dbContent)

      if (!Array.isArray(rawLabels) || !Array.isArray(rawIdeas)) {
        dispatch({
          type: 'TOAST',
          payload: { message: 'Invalid backup file', variant: 'ERROR' },
        })
        return
      }

      try {
        const ideas = rawIdeas.map(idea => IdeaRunType.check(idea))
        const labels = rawLabels.map(label =>
          LabelRunType.check({
            ...label,
            isArchived: label.isArchived ?? 0,
          })
        )

        await queries.delete.everything()

        await queries.insert.everything({ labels, ideas })
      } catch (error) {
        Sentry.captureException(error)
        dispatch({
          type: 'TOAST',
          payload: { message: 'Restore failed', variant: 'ERROR' },
        })
        return
      }

      dispatch({
        type: 'TOAST',
        payload: { message: 'Restore successful', variant: 'SUCCESS' },
      })
    } catch (error) {
      Sentry.captureException(error)
      dispatch({
        type: 'TOAST',
        payload: { message: 'Restore failed', variant: 'ERROR' },
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleFeedbackAndSupport = React.useCallback(() => {
    Linking.openURL('https://ideas.sillysideprojects.com/contact')
  }, [])

  const handleDeleteConfirm = React.useCallback(() => {
    router.navigate('/delete-database')
  }, [])

  const handleICloudToggle = async (value: boolean) => {
    setICloudEnabled(value)
    await setICloudBackupEnabled(value)
    if (value) {
      setIsProcessing(true)
      const result = await backupToICloud()
      setIsProcessing(false)
      if (result.success) {
        setICloudBackupDate(new Date().toISOString())
        fetchICloudBackups()
        dispatch({
          type: 'TOAST',
          payload: { message: 'iCloud backup enabled', variant: 'SUCCESS' },
        })
      } else {
        setICloudEnabled(false)
        await setICloudBackupEnabled(false)
        dispatch({
          type: 'TOAST',
          payload: {
            message: result.error || 'iCloud backup failed',
            variant: 'ERROR',
          },
        })
      }
    }
  }

  const handleICloudRestore = (filename: string) => {
    setIsRestoreModalVisible(false)
    Alert.alert(
      'Restore from iCloud',
      'This will replace all current local data with the iCloud backup. This action cannot be undone. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Restore',
          style: 'destructive',
          onPress: async () => {
            setIsProcessing(true)
            try {
              const result = await restoreFromICloud(filename)
              if (result.success) {
                dispatch({
                  type: 'TOAST',
                  payload: {
                    message: 'Restore from iCloud successful',
                    variant: 'SUCCESS',
                  },
                })
              } else {
                dispatch({
                  type: 'TOAST',
                  payload: {
                    message: result.error || 'Restore failed',
                    variant: 'ERROR',
                  },
                })
              }
            } catch (error) {
              Sentry.captureException(error)
              dispatch({
                type: 'TOAST',
                payload: { message: 'Restore failed', variant: 'ERROR' },
              })
            } finally {
              setIsProcessing(false)
            }
          },
        },
      ]
    )
  }

  const handleICloudBackup = async () => {
    setIsProcessing(true)
    try {
      const result = await backupToICloud()
      if (result.success) {
        setICloudBackupDate(new Date().toISOString())
        fetchICloudBackups()
        dispatch({
          type: 'TOAST',
          payload: {
            message: 'Backup to iCloud successful',
            variant: 'SUCCESS',
          },
        })
      } else {
        dispatch({
          type: 'TOAST',
          payload: {
            message: result.error || 'Backup failed',
            variant: 'ERROR',
          },
        })
      }
    } catch (error) {
      Sentry.captureException(error)
      dispatch({
        type: 'TOAST',
        payload: { message: 'Backup failed', variant: 'ERROR' },
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <PageWrapper>
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <Typography variant="h1" style={{ marginBottom: SPACING.MEDIUM }}>
          Settings
        </Typography>

        <View
          style={{
            backgroundColor: colors.surface,
            padding: SPACING.MEDIUM,
            marginBottom: SPACING.MEDIUM,
          }}
        >
          <Typography variant="h2">Appearance</Typography>
          <View
            style={{
              flexDirection: 'row',
              gap: SPACING.SMALL,
              marginTop: SPACING.SMALL,
            }}
          >
            {(['system', 'light', 'dark'] as const).map(option => (
              <View key={option} style={{ flex: 1 }}>
                <Button
                  variant={mode === option ? 'filled' : 'outlined'}
                  color="primary"
                  onPress={() => setMode(option)}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Button>
              </View>
            ))}
          </View>
        </View>

        <View
          style={{
            backgroundColor: colors.surface,
            padding: SPACING.MEDIUM,
            marginBottom: SPACING.MEDIUM,
          }}
        >
          <Typography variant="h2">Database</Typography>
          <ButtonWrapper
            left={
              <Button
                variant="filled"
                color="primary"
                onPress={handleBackup}
                disabled={isProcessing || !hasData}
              >
                Backup
              </Button>
            }
            right={
              <Button
                variant="filled"
                color="primary"
                onPress={handleRestore}
                disabled={isProcessing}
              >
                Restore
              </Button>
            }
          />
          <ButtonWrapper
            full={
              <Button
                variant="outlined"
                color="warning"
                onPress={handleDeleteConfirm}
              >
                Delete All Data
              </Button>
            }
          />
        </View>

        {isIOS && (
          <View
            style={{
              backgroundColor: colors.surface,
              padding: SPACING.MEDIUM,
              marginBottom: SPACING.MEDIUM,
            }}
          >
            <Typography variant="h2">iCloud Backup</Typography>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: SPACING.SMALL,
                marginBottom: SPACING.SMALL,
              }}
            >
              <Text style={{ color: colors.textPrimary }}>
                Auto-backup weekly
              </Text>
              <Switch
                value={iCloudEnabled}
                onValueChange={handleICloudToggle}
                disabled={isProcessing}
                color={colors.switchActive}
              />
            </View>
            {iCloudBackupDate && (
              <Text
                style={{
                  color: colors.textSecondary,
                  marginBottom: SPACING.SMALL,
                }}
              >
                Last backup: {new Date(iCloudBackupDate).toLocaleString()}
              </Text>
            )}
            <ButtonWrapper
              left={
                <Button
                  variant="filled"
                  color="primary"
                  onPress={handleICloudBackup}
                  disabled={isProcessing || !hasData}
                >
                  Backup
                </Button>
              }
              right={
                <Button
                  variant="filled"
                  color="primary"
                  onPress={() => setIsRestoreModalVisible(true)}
                  disabled={isProcessing}
                >
                  Restore
                </Button>
              }
            />
          </View>
        )}

        <View
          style={{
            backgroundColor: colors.surface,
            padding: SPACING.MEDIUM,
            marginBottom: SPACING.MEDIUM,
          }}
        >
          <Typography variant="h2">About</Typography>
          <ButtonWrapper
            left={
              <Button
                variant="filled"
                color="primary"
                onPress={() => setIsChangelogVisible(true)}
              >
                Changelog
              </Button>
            }
            right={
              <Button
                variant="filled"
                color="primary"
                onPress={handleFeedbackAndSupport}
                disabled={isProcessing}
              >
                Feedback
              </Button>
            }
          />
        </View>
      </ScrollView>

      <ChangelogModal
        visible={isChangelogVisible}
        onDismiss={() => setIsChangelogVisible(false)}
        showFullChangelog={true}
      />

      <ICloudRestoreModal
        visible={isRestoreModalVisible}
        onDismiss={() => setIsRestoreModalVisible(false)}
        onRestore={handleICloudRestore}
        backups={iCloudBackups}
      />
    </PageWrapper>
  )
}

export default Settings
