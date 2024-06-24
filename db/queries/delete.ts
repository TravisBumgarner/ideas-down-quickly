import { db } from '@/db/client'
import { eq } from 'drizzle-orm'

import { IdeasTable } from '../schema'

const idea = async (id: string): Promise<void> => {
  await db.delete(IdeasTable).where(eq(IdeasTable.id, id))
}

export default {
  idea,
}
