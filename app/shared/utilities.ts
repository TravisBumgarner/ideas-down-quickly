import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'

import { URLParams } from './types'

export const areSameDay = (date1: Date | null, date2: Date | null) => {
  if (!date1 || !date2) {
    return false
  }

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export const formatDisplayDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)

  return `${year}-${month}-${day}`
}

export const saveValueToKeyStore = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value)
    return key
  } catch (e) {
    return null
  }
}

export const getValueFromKeyStore = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      return value
    }
  } catch (e) {
    return null
  }
}

export const navigateWithParams = <T extends keyof URLParams>(
  pathname: T,
  params: URLParams[T]
) => {
  router.push({ pathname, params })
}

export const timeAgo = (date: string) => {
  const currentDate = new Date()
  const providedDate = new Date(date)
  const diffInSeconds = Math.floor(
    (currentDate.getTime() - providedDate.getTime()) / 1000
  )
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInDays >= 1) {
    // Format the date as "Mar 10, 2021"
    return providedDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } else if (diffInHours >= 1) {
    // Show in "2h 5m ago" format
    const remainingMinutes = diffInMinutes % 60
    return `${diffInHours}h ${remainingMinutes}m ago`
  } else {
    // Show in "5m ago" format
    return `${diffInMinutes}m ago`
  }
}
