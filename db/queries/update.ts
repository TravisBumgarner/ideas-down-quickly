import { db } from '@/db/client'
import { PartialWithRequiredKeys } from '@/shared/types'
import { eq } from 'drizzle-orm'
import 'react-native-get-random-values'

import { IdeasTable, LabelsTable, NewIdea, NewLabel } from '../schema'

const idea = async (
  id: string,
  { labelId, text }: Partial<Omit<NewIdea, 'id'>>
): Promise<PartialWithRequiredKeys<NewIdea, 'id'>> => {
  return {
    id,
    ...(await db
      .update(IdeasTable)
      .set({
        id,
        labelId,
        text,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(IdeasTable.id, id))
      .returning()),
  }
}

const label = async (
  id: string,
  { text, icon, color }: Partial<Omit<NewLabel, 'id'>>
): Promise<PartialWithRequiredKeys<NewLabel, 'id'>> => {
  return {
    id,
    ...(await db
      .update(LabelsTable)
      .set({
        id,
        ...(text ? { text } : {}),
        ...(icon ? { icon } : {}),
        ...(color ? { color } : {}),
        updatedAt: new Date().toISOString(),
      })
      .where(eq(LabelsTable.id, id))
      .returning()),
  }
}

export default {
  idea,
  label,
}
