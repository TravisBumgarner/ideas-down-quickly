import { eq } from 'drizzle-orm'

import { db } from '../client'
import {
  IdeasTable,
  LabelsTable,
  NewIdea,
  NewLabel,
  SelectIdea,
  SelectLabel,
} from '../schema'

const idea = async (idea: NewIdea) => {
  await db.insert(IdeasTable).values(idea).returning({ uuid: IdeasTable.id })

  await db
    .update(LabelsTable)
    .set({ lastUsedAt: idea.createdAt })
    .where(eq(LabelsTable.id, idea.labelId))
}

const label = async (label: NewLabel) => {
  await db.insert(LabelsTable).values(label).returning({ uuid: LabelsTable.id })
}

const everything = async ({
  labels,
  ideas,
}: {
  labels: SelectLabel[]
  ideas: SelectIdea[]
}) => {
  await db
    .insert(LabelsTable)
    .values(labels)
    .returning({ uuid: LabelsTable.id })

  await db.insert(IdeasTable).values(ideas).returning({ uuid: IdeasTable.id })
}

export default {
  idea,
  label,
  everything,
}
