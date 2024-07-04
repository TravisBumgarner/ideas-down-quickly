import { ICONS } from '@/assets/iconlist'
import { db } from '@/db/client'
import { LabelsTable, NewLabel } from '@/db/schema'
import Button from '@/shared/components/Button'
import ButtonWrapper from '@/shared/components/ButtonWrapper'
import Label from '@/shared/components/Label'
import PageWrapper from '@/shared/components/PageWrapper'
import TextInput from '@/shared/components/TextInput'
import { COLORS, SPACING } from '@/shared/theme'
import * as React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import 'react-native-get-random-values'
import { Icon } from 'react-native-paper'
import { v4 as uuidv4 } from 'uuid'

const IdeaInput = ({
  submitCallback,
  cancelCallback,
}: {
  submitCallback: (args: { labelId: string }) => void
  cancelCallback: () => void
}) => {
  const [labelText, setLabelText] = React.useState('Category')
  const [color, setColor] = React.useState<string>(COLORS.NEUTRAL[700])
  const [icon, setIcon] = React.useState<string>(ICONS[0])

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

  return (
    <PageWrapper>
      <View style={styles.container}>
        <Label
          id={''}
          color={color}
          icon={icon}
          text={labelText}
          readonly={true}
          lastUsedAt={new Date().toISOString()}
        />
        <TextInput
          color={COLORS.NEUTRAL[700]}
          value={labelText}
          onChangeText={text => setLabelText(text)}
          borderWidth={1}
        />
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
          }}
        >
          {Object.values(COLORS.LABELS).map(color => (
            <TouchableOpacity
              key={color}
              style={{
                margin: SPACING.XXSMALL,
                backgroundColor: color,
                width: 35,
                height: 35,
              }}
              onPress={() => setColor(color)}
            ></TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            borderTopColor: COLORS.NEUTRAL[700],
            borderTopWidth: 1,
            paddingTop: SPACING.SMALL,
            marginTop: SPACING.SMALL,
            borderBottomColor: COLORS.NEUTRAL[700],
            borderBottomWidth: 1,
            paddingBottom: SPACING.SMALL,
            marginBottom: SPACING.SMALL,
            flex: 1,
          }}
        >
          <ScrollView
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}
          >
            {ICONS.map(icon => (
              <TouchableOpacity
                onPress={() => setIcon(icon)}
                key={icon}
                style={{
                  width: 35,
                  height: 35,
                  margin: SPACING.XXSMALL,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Icon size={30} source={icon} color={color} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      <ButtonWrapper
        left={
          <Button color="warning" variant="link" onPress={() => ({})}>
            Back
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default IdeaInput
