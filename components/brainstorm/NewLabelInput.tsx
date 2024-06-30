import { ICONS } from '@/assets/iconlist'
import { db } from '@/db/client'
import { LabelsTable, NewLabel } from '@/db/schema'
import Button from '@/shared/components/Button'
import ButtonWrapper from '@/shared/components/ButtonWrapper'
import Label from '@/shared/components/Label'
import PageWrapper from '@/shared/components/PageWrapper'
import { COLORS2, SPACING2 } from '@/shared/theme'
import * as React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import 'react-native-get-random-values'
import { Icon, TextInput } from 'react-native-paper'
import { v4 as uuidv4 } from 'uuid'

enum Step {
  Text = 0,
  Color = 1,
  Icon = 2,
}

const IdeaInput = ({
  submitCallback,
  cancelCallback,
}: {
  submitCallback: (args: { labelId: string }) => void
  cancelCallback: () => void
}) => {
  const [labelText, setLabelText] = React.useState('')
  const [color, setColor] = React.useState<string>(COLORS2.NEUTRAL[800])
  const [icon, setIcon] = React.useState<string>(ICONS[0])
  const [lastusedAt, setLastUsedAt] = React.useState<string | null>(null)
  const [currentStep, setCurrentStep] = React.useState<Step>(Step.Text)
  //For whatever reason, myself and Co-Pilot are horribly confused about the type for the next line.
  const textInputRef = React.useRef<any>(null)

  const incrementStep = React.useCallback(() => {
    setCurrentStep(prev => prev + 1)
  }, [])

  React.useEffect(() => {
    if (currentStep === Step.Color) {
      setLastUsedAt(new Date().toISOString())
    }
  }, [currentStep])

  const decrementStep = React.useCallback(() => {
    setCurrentStep(prev => prev - 1)
  }, [])

  const handleCancel = React.useCallback(() => {
    setLabelText('')
    cancelCallback()
  }, [cancelCallback])

  const handleSubmit = React.useCallback(async () => {
    const newLabel: NewLabel = {
      id: uuidv4(),
      text: labelText,
      createdAt: new Date().toISOString(),
      color,
      icon,
    }

    const result = await db.insert(LabelsTable).values(newLabel).returning({
      id: LabelsTable.id,
    })
    submitCallback({ labelId: result[0].id })
  }, [labelText, color, icon, submitCallback])

  let content: React.ReactNode
  switch (currentStep) {
    case Step.Text: {
      content = (
        <>
          <Label
            fullWidth
            color={color}
            icon={icon}
            text={labelText}
            readonly={false}
            lastUsedAt={lastusedAt}
            handlePress={() => textInputRef.current?.focus()}
          />
          <TextInput
            ref={textInputRef}
            style={{ display: 'none' }}
            label="Label Text"
            value={labelText}
            onChangeText={text => setLabelText(text)}
            selectTextOnFocus
            returnKeyType="done"
          />
        </>
      )
      break
    }
    case Step.Color: {
      content = (
        <>
          <Label
            fullWidth
            color={color}
            icon={icon}
            text={labelText}
            readonly={true}
            lastUsedAt={lastusedAt}
          />
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            {Object.values(COLORS2.LABELS).map(color => (
              <TouchableOpacity
                key={color}
                style={{
                  marginVertical: SPACING2.SMALL,
                  marginLeft: 0,
                  marginRight: SPACING2.SMALL,
                  backgroundColor: color,
                  width: 50,
                  height: 50,
                }}
                onPress={() => setColor(color)}
              ></TouchableOpacity>
            ))}
          </View>
        </>
      )
      break
    }

    case Step.Icon: {
      content = (
        <>
          <Label
            fullWidth
            color={color}
            icon={icon}
            text={labelText}
            readonly={true}
            lastUsedAt={lastusedAt}
          />
          <ScrollView
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            {ICONS.map(icon => (
              <TouchableOpacity
                onPress={() => setIcon(icon)}
                key={icon}
                style={{
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Icon size={30} source={icon} color={color} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )
      break
    }
  }

  let buttons: React.ReactNode
  switch (currentStep) {
    case Step.Text: {
      buttons = (
        <ButtonWrapper
          left={
            <Button color="warning" variant="link" onPress={handleCancel}>
              Cancel
            </Button>
          }
          right={
            <Button color="primary" variant="filled" onPress={incrementStep}>
              Add color
            </Button>
          }
        />
      )
      break
    }
    case Step.Color: {
      buttons = (
        <ButtonWrapper
          left={
            <Button color="warning" variant="link" onPress={decrementStep}>
              Back
            </Button>
          }
          right={
            <Button color="primary" variant="filled" onPress={incrementStep}>
              Add Icon
            </Button>
          }
        />
      )
      break
    }

    case Step.Icon: {
      buttons = (
        <ButtonWrapper
          left={
            <Button color="warning" variant="link" onPress={decrementStep}>
              Back
            </Button>
          }
          right={
            <Button color="primary" variant="filled" onPress={handleSubmit}>
              Submit
            </Button>
          }
        />
      )
      break
    }
  }

  return (
    <PageWrapper>
      <View style={styles.container}>{content}</View>
      {buttons}
    </PageWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: SPACING2.MEDIUM,
  },
})

export default IdeaInput
