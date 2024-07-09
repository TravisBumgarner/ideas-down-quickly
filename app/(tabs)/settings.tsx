import queries from '@/db/queries'
import { IdeaRunType, LabelRunType } from '@/db/schema'
import Button from '@/shared/components/Button'
import ButtonWrapper from '@/shared/components/ButtonWrapper'
import PageWrapper from '@/shared/components/PageWrapper'
import Typography from '@/shared/components/Typography'
import { context } from '@/shared/context'
import { SPACING } from '@/shared/theme'
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system'
import * as React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

const Settings = () => {
  const { dispatch } = React.useContext(context)
  const [isProcessing, setIsProcessing] = React.useState(false)

  const handleBackup = async () => {
    setIsProcessing(true)
    try {
      const labels = await queries.select.labels()
      const ideas = await queries.select.ideas()
      const dbContent = JSON.stringify({ labels, ideas })
      const backupPath = `${FileSystem.documentDirectory}backup_${new Date().toISOString()}.json`
      await FileSystem.writeAsStringAsync(backupPath, dbContent)
      dispatch({
        type: 'TOAST',
        payload: {
          message: `Backup saved to ${backupPath}`,
          variant: 'SUCCESS',
        },
      })
    } catch (error) {
      dispatch({
        type: 'TOAST',
        payload: { message: 'Something went wrong', variant: 'ERROR' },
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleRestore = async () => {
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
        const labels = rawLabels.map(label => LabelRunType.check(label))

        await queries.delete.everything()

        await queries.insert.everything({ labels, ideas })
      } catch (error) {
        dispatch({
          type: 'TOAST',
          payload: { message: 'Restore Failed', variant: 'ERROR' },
        })
        return
      }

      dispatch({
        type: 'TOAST',
        payload: { message: 'Restore Successful', variant: 'SUCCESS' },
      })
    } catch (error) {
      dispatch({
        type: 'TOAST',
        payload: { message: 'Restore Failed', variant: 'ERROR' },
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <PageWrapper>
      <View
        style={{
          flex: 1,
        }}
      >
        <Typography variant="h1" style={{ marginBottom: SPACING.MEDIUM }}>
          Settings
        </Typography>
        <Typography variant="h2" style={{ marginBottom: SPACING.MEDIUM }}>
          Database
        </Typography>
        <ButtonWrapper
          left={
            <Button
              variant="filled"
              color="primary"
              onPress={handleBackup}
              disabled={isProcessing}
            >
              Backup Database
            </Button>
          }
          right={
            <Button
              variant="filled"
              color="primary"
              onPress={handleRestore}
              disabled={isProcessing}
            >
              Restore Database
            </Button>
          }
        />

        {isProcessing && <Text>Processing...</Text>}
      </View>
    </PageWrapper>
  )
}

export default Settings
