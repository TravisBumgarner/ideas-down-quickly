import * as Sentry from '@sentry/react-native'
import { Platform } from 'react-native'
import { CloudStorage } from 'react-native-cloud-storage'

import queries from '@/db/queries'
import { IdeaRunType, LabelRunType } from '@/db/schema'

import { getValueFromKeyStore, saveValueToKeyStore } from './utilities'

const ICLOUD_BACKUP_ENABLED_KEY = 'icloud_backup_enabled'
const ICLOUD_LAST_BACKUP_KEY = 'icloud_last_backup_timestamp'
const BACKUP_FILENAME = 'ideas-backup.json'
const ONE_DAY_MS = 24 * 60 * 60 * 1000

export const isIOS = Platform.OS === 'ios'

export async function getICloudBackupEnabled(): Promise<boolean> {
  if (!isIOS) return false
  const value = await getValueFromKeyStore(ICLOUD_BACKUP_ENABLED_KEY)
  return value === 'true'
}

export async function setICloudBackupEnabled(enabled: boolean): Promise<void> {
  await saveValueToKeyStore(ICLOUD_BACKUP_ENABLED_KEY, enabled ? 'true' : 'false')
}

export async function getLastBackupTimestamp(): Promise<number | null> {
  const value = await getValueFromKeyStore(ICLOUD_LAST_BACKUP_KEY)
  return value ? parseInt(value, 10) : null
}

async function setLastBackupTimestamp(timestamp: number): Promise<void> {
  await saveValueToKeyStore(ICLOUD_LAST_BACKUP_KEY, timestamp.toString())
}

export async function isBackupNeeded(): Promise<boolean> {
  const enabled = await getICloudBackupEnabled()
  if (!enabled) return false

  const lastBackup = await getLastBackupTimestamp()
  if (!lastBackup) return true

  const now = Date.now()
  return now - lastBackup >= ONE_DAY_MS
}

export async function checkICloudAvailable(): Promise<boolean> {
  if (!isIOS) return false
  try {
    return await CloudStorage.isCloudAvailable()
  } catch {
    return false
  }
}

export async function backupToICloud(): Promise<{ success: boolean; error?: string }> {
  if (!isIOS) {
    return { success: false, error: 'iCloud backup is only available on iOS' }
  }

  try {
    const available = await CloudStorage.isCloudAvailable()
    if (!available) {
      return { success: false, error: 'iCloud is not available' }
    }

    const labels = await queries.select.labels()
    const ideas = await queries.select.ideas()
    const backupData = JSON.stringify({
      labels,
      ideas,
      backupDate: new Date().toISOString(),
    })

    await CloudStorage.writeFile(BACKUP_FILENAME, backupData)
    await setLastBackupTimestamp(Date.now())

    return { success: true }
  } catch (error) {
    Sentry.captureException(error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export async function getICloudBackupInfo(): Promise<{
  exists: boolean
  backupDate?: string
  error?: string
}> {
  if (!isIOS) {
    return { exists: false, error: 'iCloud is only available on iOS' }
  }

  try {
    const available = await CloudStorage.isCloudAvailable()
    if (!available) {
      return { exists: false, error: 'iCloud is not available' }
    }

    const fileExists = await CloudStorage.exists(BACKUP_FILENAME)
    if (!fileExists) {
      return { exists: false }
    }

    const content = await CloudStorage.readFile(BACKUP_FILENAME)
    const data = JSON.parse(content)

    return {
      exists: true,
      backupDate: data.backupDate,
    }
  } catch {
    return { exists: false }
  }
}

export async function restoreFromICloud(): Promise<{
  success: boolean
  error?: string
  restoredLabels?: number
  restoredIdeas?: number
}> {
  if (!isIOS) {
    return { success: false, error: 'iCloud restore is only available on iOS' }
  }

  try {
    const available = await CloudStorage.isCloudAvailable()
    if (!available) {
      return { success: false, error: 'iCloud is not available' }
    }

    const fileExists = await CloudStorage.exists(BACKUP_FILENAME)
    if (!fileExists) {
      return { success: false, error: 'No iCloud backup found' }
    }

    const content = await CloudStorage.readFile(BACKUP_FILENAME)
    const { labels: rawLabels, ideas: rawIdeas } = JSON.parse(content)

    if (!Array.isArray(rawLabels) || !Array.isArray(rawIdeas)) {
      return { success: false, error: 'Invalid backup file format' }
    }

    const ideas = rawIdeas.map(idea => IdeaRunType.check(idea))
    const labels = rawLabels.map(label =>
      LabelRunType.check({
        ...label,
        isArchived: label.isArchived ?? 0,
      })
    )

    await queries.delete.everything()
    await queries.insert.everything({ labels, ideas })

    return {
      success: true,
      restoredLabels: labels.length,
      restoredIdeas: ideas.length,
    }
  } catch (error) {
    Sentry.captureException(error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export async function performDailyBackupIfNeeded(): Promise<void> {
  try {
    const needed = await isBackupNeeded()
    if (needed) {
      await backupToICloud()
    }
  } catch (error) {
    Sentry.captureException(error)
  }
}
