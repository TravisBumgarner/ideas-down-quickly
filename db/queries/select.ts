import { db } from '@/db/client'
import { desc, eq } from 'drizzle-orm'

import { IdeasTable, LabelsTable } from '../schema'

const ideaById = async (id: string) => {
  return (
    await db.select().from(IdeasTable).where(eq(IdeasTable.id, id)).limit(1)
  )[0]
}

const labelById = async (id: string) => {
  return (
    await db.select().from(LabelsTable).where(eq(LabelsTable.id, id)).limit(1)
  )[0]
}

const labels = async () => {
  return await db.select().from(LabelsTable)
}

const ideasWithLabel = async () => {
  return db
    .select()
    .from(IdeasTable)
    .leftJoin(LabelsTable, eq(IdeasTable.labelId, LabelsTable.id))
    .orderBy(desc(IdeasTable.createdAt))
}

export default {
  ideaById,
  labelById,
  labels,
  ideasWithLabel,
}
