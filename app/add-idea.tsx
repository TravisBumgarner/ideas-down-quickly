import queries from '@/db/queries'
import { NewIdea, SelectLabel } from '@/db/schema'
import Button from '@/shared/components/Button'
import ButtonWrapper from '@/shared/components/ButtonWrapper'
import PageWrapper from '@/shared/components/PageWrapper'
import TextInput from '@/shared/components/TextInput'
import { context } from '@/shared/context'
import { URLParams } from '@/shared/types'
import { router, useLocalSearchParams } from 'expo-router'
import * as React from 'react'
import { SafeAreaView, View } from 'react-native'
import 'react-native-get-random-values'
import { ActivityIndicator } from 'react-native-paper'
import { v4 as uuidv4 } from 'uuid'

const AddIdea = () => {
  const { dispatch } = React.useContext(context)
  const [ideaText, setIdeaText] = React.useState('')
  const [label, setLabel] = React.useState<SelectLabel | null>(null)
  const params = useLocalSearchParams<URLParams['add-idea']>()

  React.useEffect(() => {
    if (!params.labelId) {
      dispatch({
        type: 'TOAST',
        payload: { message: 'Something went wrong', variant: 'ERROR' },
      })
      router.navigate('/')
      return
    }

    queries.select.labelById(params.labelId).then(setLabel)
  }, [params.labelId, dispatch])

  const handleCancel = React.useCallback(() => {
    setIdeaText('')
    router.navigate('/')
  }, [])

  const handleSubmit = React.useCallback(async () => {
    if (!params.labelId) {
      return
    }

    const idea: NewIdea = {
      id: uuidv4(),
      text: ideaText,
      labelId: params.labelId,
      createdAt: new Date().toISOString(),
    }
    await queries.insert.idea(idea)

    setIdeaText('')
    router.navigate('/')
  }, [ideaText, params.labelId])

  if (label === null) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ActivityIndicator animating size="large" />
      </SafeAreaView>
    )
  }

  return (
    <PageWrapper>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <TextInput
          label="Ideating..."
          value={ideaText}
          onChangeText={text => setIdeaText(text)}
          multiline
          color={label.color}
        />
      </View>
      <ButtonWrapper
        left={
          <Button variant="link" color="warning" onPress={handleCancel}>
            Cancel
          </Button>
        }
        right={
          <Button
            disabled={ideaText.length === 0}
            variant="filled"
            color="primary"
            onPress={handleSubmit}
          >
            Save
          </Button>
        }
      />
    </PageWrapper>
  )
}

export default AddIdea
