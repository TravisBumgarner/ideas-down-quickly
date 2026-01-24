import { db } from '@/db/client'
import { IdeasByDateAndLabel } from '@/shared/types'
import { and, desc, eq } from 'drizzle-orm'

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

const labels = async (options?: { includeArchived?: boolean }) => {
  const query = db.select().from(LabelsTable)

  if (!options?.includeArchived) {
    return await query
      .where(eq(LabelsTable.isArchived, 0))
      .orderBy(desc(LabelsTable.lastUsedAt))
  }

  return await query.orderBy(desc(LabelsTable.lastUsedAt))
}

const ideasGroupedByLabel = async (options?: { includeArchived?: boolean }) => {
  const baseCondition = eq(IdeasTable.labelId, LabelsTable.id)
  const joinCondition = options?.includeArchived
    ? baseCondition
    : and(baseCondition, eq(LabelsTable.isArchived, 0))

  const result = await db
    .select()
    .from(IdeasTable)
    .innerJoin(LabelsTable, joinCondition)
    .orderBy(desc(IdeasTable.createdAt))

  const output: IdeasByDateAndLabel = {}

  result.forEach(({ idea, label }) => {
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

const ideas = async () => {
  return await db.select().from(IdeasTable).orderBy(desc(IdeasTable.createdAt))
}

export default {
  ideaById,
  labelById,
  labels,
  ideas,
  ideasGroupedByLabel,
}
