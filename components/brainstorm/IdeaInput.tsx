import { db } from '@/db/client'
import queries from '@/db/queries'
import { IdeasTable, NewIdea, SelectLabel } from '@/db/schema'
import Button from '@/shared/components/Button'
import ButtonWrapper from '@/shared/components/ButtonWrapper'
import PageWrapper from '@/shared/components/PageWrapper'
import TextInput from '@/shared/components/TextInput'
import * as React from 'react'
import { SafeAreaView, View } from 'react-native'
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

  if (label === null) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ActivityIndicator animating size="large" />
      </SafeAreaView>
    )
  }

  return (
    <PageWrapper>
      <View style={{ flex: 1 }}>
        <TextInput
          label="What's on your mind?"
          value={ideaText}
          onChangeText={text => setIdeaText(text)}
          multiline
          color={'red'}
        />
      </View>
      <ButtonWrapper
        left={
          <Button variant="link" color="warning" onPress={handleCancel}>
            Cancel
          </Button>
        }
        right={
          <Button variant="filled" color="primary" onPress={handleSubmit}>
            Submit
          </Button>
        }
      />
    </PageWrapper>
  )
}

export default IdeaInput
