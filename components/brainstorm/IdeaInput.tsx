import * as React from 'react'
import {
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  Platform,
} from 'react-native'
import { TextInput, ActivityIndicator, useTheme } from 'react-native-paper'
import { SPACING } from '@/shared/theme'
import { IdeasTable, LabelsTable, NewIdea, SelectLabel } from '@/db/schema'
import { db } from '@/db/client'
import { eq } from 'drizzle-orm'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import Label from '@/shared/components/Label'
import Button from '@/shared/components/Button'
import ButtonWrapper from '@/shared/components/ButtonWrapper'

const IdeaInput = ({
  submitCallback,
  cancelCallback,
  labelUUID,
}: {
  submitCallback: (ideaText: string) => void
  cancelCallback: () => void
  labelUUID: string
}) => {
  const [ideaText, setIdeaText] = React.useState('')
  const [label, setLabel] = React.useState<SelectLabel | null>(null)
  const theme = useTheme()

  React.useEffect(() => {
    db.select()
      .from(LabelsTable)
      .where(eq(LabelsTable.uuid, labelUUID))
      .limit(1)
      .then(r => setLabel(r[0]))
  }, [labelUUID])

  const handleCancel = React.useCallback(() => {
    setIdeaText('')
    cancelCallback()
  }, [cancelCallback])

  const handleSubmit = React.useCallback(async () => {
    const idea: NewIdea = {
      uuid: uuidv4(),
      text: ideaText,
      labelId: labelUUID,
      createdAt: new Date().toISOString(),
    }
    const result = await db
      .insert(IdeasTable)
      .values(idea)
      .returning({ uuid: IdeasTable.uuid })

    setIdeaText('')
    submitCallback(result[0].uuid)
  }, [submitCallback, ideaText, labelUUID])

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

export default IdeaInput
