import { db } from '@/db/client'
import { IdeasByDateAndLabel } from '@/shared/types'
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
  return await db
    .select()
    .from(LabelsTable)
    .orderBy(desc(LabelsTable.lastUsedAt))
}

const ideasGroupedByLabel = async (filterToLabelIds?: string[]) => {
  const result = await db
    .select()
    .from(IdeasTable)
    .innerJoin(LabelsTable, eq(IdeasTable.labelId, LabelsTable.id))
    .orderBy(desc(IdeasTable.createdAt))

  const output: IdeasByDateAndLabel = {}

  result.forEach(({ idea, label }) => {
    if (filterToLabelIds && !filterToLabelIds.includes(label.id)) {
      return
    }

    const dateKey = idea.createdAt.split('T')[0]
    if (output[dateKey] === undefined) {
      output[dateKey] = {}
    }

    if (output[dateKey][label.id] === undefined) {
      output[dateKey][label.id] = {
        color: label.color,
        icon: label.icon,
        ideas: [],
        labelText: label.text,
        labelId: label.id,
      }
    }

    output[dateKey][label.id].ideas.push({
      id: idea.id,
      text: idea.text,
      createdAt: idea.createdAt,
    })
  })

  return output
}

export default {
  ideaById,
  labelById,
  labels,
  ideasGroupedByLabel,
}
