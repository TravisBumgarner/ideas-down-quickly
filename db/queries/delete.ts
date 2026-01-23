import { db } from '@/db/client'
import { eq } from 'drizzle-orm'

import { IdeasTable, LabelsTable } from '../schema'

const idea = async (id: string): Promise<void> => {
  await db.delete(IdeasTable).where(eq(IdeasTable.id, id))
}

const everything = async (): Promise<void> => {
  await db.delete(IdeasTable).all()
  await db.delete(LabelsTable).all()
}

export default {
  idea,
  everything,
}
