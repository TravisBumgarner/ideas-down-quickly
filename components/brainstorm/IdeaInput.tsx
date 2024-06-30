import { db } from '@/db/client'
import queries from '@/db/queries'
import { IdeasTable, NewIdea, SelectLabel } from '@/db/schema'
import * as React from 'react'
import 'react-native-get-random-values'
import { ActivityIndicator } from 'react-native-paper'
import { v4 as uuidv4 } from 'uuid'

const IdeaInput = ({
  submitCallback,
  cancelCallback,
  labelId,
}: {
  submitCallback: (ideaText: string) => void
  cancelCallback: () => void
  labelId: string
}) => {
  const [ideaText, setIdeaText] = React.useState('')
  const [label, setLabel] = React.useState<SelectLabel | null>(null)

  React.useEffect(() => {
    queries.select.labelById(labelId).then(setLabel)
  }, [labelId])

  const handleCancel = React.useCallback(() => {
    setIdeaText('')
    cancelCallback()
  }, [cancelCallback])

  const handleSubmit = React.useCallback(async () => {
    const idea: NewIdea = {
      id: uuidv4(),
      text: ideaText,
      labelId: labelId,
      createdAt: new Date().toISOString(),
    }
    const result = await db
      .insert(IdeasTable)
      .values(idea)
      .returning({ uuid: IdeasTable.id })

    setIdeaText('')
    submitCallback(result[0].uuid)
  }, [submitCallback, ideaText, labelId])

  // if (label === null) {
  return <ActivityIndicator animating size="large" />
  // }
}

export default IdeaInput
