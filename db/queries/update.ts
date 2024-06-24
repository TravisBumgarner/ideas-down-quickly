import { db } from '@/db/client'
import { PartialWithRequiredKeys } from '@/shared/types'
import { eq } from 'drizzle-orm'
import 'react-native-get-random-values'

import { IdeasTable, NewIdea } from '../schema'

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

export default {
  idea,
}
