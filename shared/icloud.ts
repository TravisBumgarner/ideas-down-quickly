import * as Sentry from '@sentry/react-native'
import { Platform } from 'react-native'
import { CloudStorage } from 'react-native-cloud-storage'

import queries from '@/db/queries'
import { IdeaRunType, LabelRunType } from '@/db/schema'

import { getValueFromKeyStore, saveValueToKeyStore } from './utilities'

const ICLOUD_BACKUP_ENABLED_KEY = 'icloud_backup_enabled'
const ICLOUD_LAST_BACKUP_KEY = 'icloud_last_backup_timestamp'
const ICLOUD_BACKUP_SLOT_KEY = 'icloud_backup_slot'
const LEGACY_BACKUP_FILENAME = 'ideas-backup.json'
const BACKUP_SLOTS = 7
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000

export const isIOS = Platform.OS === 'ios'

function getBackupFilename(slot: number): string {
  return `ideas-backup-${slot}.json`
}

async function getCurrentSlot(): Promise<number> {
  const value = await getValueFromKeyStore(ICLOUD_BACKUP_SLOT_KEY)
  return value ? parseInt(value, 10) : 0
}

async function setCurrentSlot(slot: number): Promise<void> {
  await saveValueToKeyStore(ICLOUD_BACKUP_SLOT_KEY, slot.toString())
}

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
  return now - lastBackup >= ONE_WEEK_MS
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

    const slot = await getCurrentSlot()
    const filename = getBackupFilename(slot)
    await CloudStorage.writeFile(filename, backupData)
    await setLastBackupTimestamp(Date.now())
    await setCurrentSlot((slot + 1) % BACKUP_SLOTS)

    return { success: true }
  } catch (error) {
    Sentry.captureException(error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export type ICloudBackupEntry = {
  filename: string
  backupDate: string
  ideaCount: number
  labelCount: number
  sizeBytes: number
}

export async function getAvailableICloudBackups(): Promise<ICloudBackupEntry[]> {
  if (!isIOS) return []

  try {
    const available = await CloudStorage.isCloudAvailable()
    if (!available) return []

    const backups: ICloudBackupEntry[] = []

    const filesToCheck = [
      ...Array.from({ length: BACKUP_SLOTS }, (_, i) => getBackupFilename(i)),
      LEGACY_BACKUP_FILENAME,
    ]

    for (const filename of filesToCheck) {
      try {
        const exists = await CloudStorage.exists(filename)
        if (!exists) continue

        const content = await CloudStorage.readFile(filename)
        const data = JSON.parse(content)
        if (data.backupDate) {
          backups.push({
            filename,
            backupDate: data.backupDate,
            ideaCount: Array.isArray(data.ideas) ? data.ideas.length : 0,
            labelCount: Array.isArray(data.labels) ? data.labels.length : 0,
            sizeBytes: content.length,
          })
        }
      } catch {
        // Skip files that can't be read or parsed
      }
    }

    backups.sort((a, b) => new Date(b.backupDate).getTime() - new Date(a.backupDate).getTime())

    return backups
  } catch {
    return []
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

    const backups = await getAvailableICloudBackups()
    if (backups.length === 0) {
      return { exists: false }
    }

    return {
      exists: true,
      backupDate: backups[0].backupDate,
    }
  } catch {
    return { exists: false }
  }
}

export async function restoreFromICloud(filename: string): Promise<{
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

    const fileExists = await CloudStorage.exists(filename)
    if (!fileExists) {
      return { success: false, error: 'No iCloud backup found' }
    }

    const content = await CloudStorage.readFile(filename)
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

export async function performWeeklyBackupIfNeeded(): Promise<void> {
  try {
    const needed = await isBackupNeeded()
    if (needed) {
      await backupToICloud()
    }
  } catch (error) {
    Sentry.captureException(error)
  }
}
