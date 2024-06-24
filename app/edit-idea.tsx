import queries from '@/db/queries'
import { SelectLabel } from '@/db/schema'
import Button from '@/shared/components/Button'
import ButtonWrapper from '@/shared/components/ButtonWrapper'
import Dropdown from '@/shared/components/Dropdown'
import Label from '@/shared/components/Label'
import { SPACING } from '@/shared/theme'
import { URLParams } from '@/shared/types'
import { router, useLocalSearchParams } from 'expo-router'
import * as React from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
} from 'react-native'
import 'react-native-get-random-values'
import { ActivityIndicator, TextInput, useTheme } from 'react-native-paper'
import { useAsyncEffect } from 'use-async-effect'

const IdeaEdit = ({
  labelId,
}: {
  submitCallback: (ideaText: string) => void
  cancelCallback: () => void
  labelId: string
}) => {
  const [ideaText, setIdeaText] = React.useState('')
  const [label, setLabel] = React.useState<SelectLabel | null>(null)
  const theme = useTheme()
  const params = useLocalSearchParams<URLParams['edit-idea']>()
  const [isVisible, setIsVisible] = React.useState(false)
  const [selectedLabelId, setSelectedLabelId] = React.useState('')
  const [labelList, setLabelList] = React.useState<
    { label: string; value: string }[]
  >([])

  useAsyncEffect(async () => {
    if (!params.ideaId) {
      router.navigate('/')
      return
    }

    const idea = await queries.select.ideaById(params.ideaId)
    const label = await queries.select.labelById(idea.labelId)
    const labels = await queries.select.labels()
    setIdeaText(idea.text)
    setLabel(label)
    setLabelList(labels.map(label => ({ label: label.text, value: label.id })))
    setSelectedLabelId(idea.labelId)
  }, [labelId, params.ideaId])

  const handleCancel = React.useCallback(() => {
    router.navigate('/history')
  }, [])

  const handleSubmit = React.useCallback(async () => {
    if (!params.ideaId) {
      return
    }

    await queries.update.idea(params.ideaId, {
      text: ideaText,
      labelId: selectedLabelId,
    })
    router.navigate('/history')
  }, [params.ideaId, ideaText, selectedLabelId])

  if (label === null) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ActivityIndicator animating size="large" />
      </SafeAreaView>
    )
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          justifyContent: 'space-between',
        }}
      >
        <View style={{ margin: SPACING.md }}>
          <Label
            color={label.color}
            icon={label.icon}
            text={label.text}
            readonly
          />
          <Dropdown
            label="Select a label"
            setIsVisible={setIsVisible}
            isVisible={isVisible}
            value={selectedLabelId}
            setValue={setSelectedLabelId}
            list={labelList}
          />
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            style={{
              margin: SPACING.md,
            }}
            label="Spill it..."
            value={ideaText}
            onChangeText={text => setIdeaText(text)}
            multiline
          />
        </View>
        <ButtonWrapper
          left={
            <Button variant="error" onPress={handleCancel}>
              Cancel
            </Button>
          }
          right={
            <Button variant="primary" onPress={handleSubmit}>
              Submit
            </Button>
          }
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default IdeaEdit
