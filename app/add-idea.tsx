import queries from '@/db/queries'
import type { NewIdea, SelectLabel } from '@/db/schema'
import Button from '@/shared/components/Button'
import PageWrapper from '@/shared/components/PageWrapper'
import TextInput from '@/shared/components/TextInput'
import { context } from '@/shared/context'
import { SPACING } from '@/shared/theme'
import type { URLParams } from '@/shared/types'
import { router, useLocalSearchParams } from 'expo-router'
import * as React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
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

  const saveIdea = React.useCallback(async () => {
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
  }, [ideaText, params.labelId])

  const handleSave = React.useCallback(async () => {
    await saveIdea()
    setIdeaText('')
    router.navigate('/')
  }, [saveIdea])

  const handleSaveAndAnother = React.useCallback(async () => {
    await saveIdea()
    setIdeaText('')
  }, [saveIdea])

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
          maxLines={10}
          color={label.color}
          autoFocus={true} //eslint-disable-line
        />
      </View>
      <View style={styles.buttonRow}>
        <View style={styles.buttonSmall}>
          <Button variant="filled" color="warning" onPress={handleCancel}>
            Close
          </Button>
        </View>
        <View style={styles.buttonFlex}>
          <Button
            disabled={ideaText.length === 0}
            variant="link"
            color="primary"
            onPress={handleSave}
          >
            Save
          </Button>
        </View>
        <View style={styles.buttonFlex}>
          <Button
            disabled={ideaText.length === 0}
            variant="filled"
            color="primary"
            onPress={handleSaveAndAnother}
          >
            Save & Another
          </Button>
        </View>
      </View>
    </PageWrapper>
  )
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.MEDIUM,
    gap: SPACING.SMALL,
  },
  buttonSmall: {
    width: 60,
  },
  buttonFlex: {
    flex: 1,
  },
})

export default AddIdea
