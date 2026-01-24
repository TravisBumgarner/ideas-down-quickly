import { drizzle } from 'drizzle-orm/expo-sqlite'
import { openDatabaseSync } from 'expo-sqlite'

const expoDb = openDatabaseSync('database.db')

export const db = drizzle(expoDb)
