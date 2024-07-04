import queries from '@/db/queries'
import { SelectLabel } from '@/db/schema'
import Button from '@/shared/components/Button'
import ButtonWrapper from '@/shared/components/ButtonWrapper'
import PageWrapper from '@/shared/components/PageWrapper'
import TextInput from '@/shared/components/TextInput'
import { URLParams } from '@/shared/types'
import { router, useLocalSearchParams } from 'expo-router'
import * as React from 'react'
import { SafeAreaView, View } from 'react-native'
import 'react-native-get-random-values'
import { ActivityIndicator } from 'react-native-paper'
import { useAsyncEffect } from 'use-async-effect'

const IdeaEdit = ({
  labelId,
}: {
  submitCallback: (labelText: string) => void
  cancelCallback: () => void
  labelId: string
}) => {
  const [labelText, setLabelText] = React.useState('')
  const [label, setLabel] = React.useState<SelectLabel | null>(null)
  const params = useLocalSearchParams<URLParams['edit-label']>()

  useAsyncEffect(async () => {
    if (!params.labelId) {
      router.navigate('/')
      return
    }

    const label = await queries.select.labelById(params.labelId)
    setLabelText(label.text)
    setLabel(label)
  }, [labelId, params.labelId])

  const handleCancel = React.useCallback(() => {
    router.navigate('/')
  }, [])

  const handleSubmit = React.useCallback(async () => {
    if (!params.labelId) {
      return
    }

    await queries.update.label(params.labelId, {
      text: labelText,
    })
    router.navigate('/')
  }, [params.labelId, labelText])

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
          label=""
          value={labelText}
          onChangeText={text => setLabelText(text)}
          multiline
          color={label.color}
        />
      </View>

      <ButtonWrapper
        left={
          <Button color="warning" variant="link" onPress={handleCancel}>
            Cancel
          </Button>
        }
        right={
          <Button color="primary" variant="filled" onPress={handleSubmit}>
            Submit
          </Button>
        }
      />
    </PageWrapper>
  )
}

export default IdeaEdit
