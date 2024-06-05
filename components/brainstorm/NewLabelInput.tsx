import * as React from 'react'
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native'
import { TextInput, Button, Text, Icon } from 'react-native-paper'
import { SPACING } from '@/app/theme'
import Label from '@/shared/components/Label'
import { db } from '@/db/client'
import { LabelsTable, NewLabel } from '@/db/schema'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

const COLORS = [
  '#ff5722',
  '#3f51b5',
  '#009688',
  '#ff9800',
  '#795548',
  '#607d8b',
  '#9c27b0',
  '#e91e63',
  '#03a9f4',
  '#00bcd4',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
]

const ICONS = [
  'home',
  'account',
  'account-group',
  'account-heart',
  'account-multiple',
  'account-multiple-check',
  'account-multiple-minus',
  'account-multiple-outline',
  'account-multiple-plus',
  'account-multiple-remove',
  'account-off',
  'account-outline',
  'account-plus',
  'account-remove',
  'account-search',
  'account-star',
  'account-supervisor',
  'account-supervisor-circle',
  'account-switch',
  'adjust',
  'air-conditioner',
  'airballoon',
  'airplane',
  'airplane-landing',
  'airplane-off',
  'airplane-takeoff',
  'alarm',
  'alarm-bell',
  'alarm-check',
  'alarm-light',
  'alarm-multiple',
  'alarm-note',
  'alarm-off',
  'alarm-plus',
  'alarm-snooze',
  'album',
  'alert',
]

const IdeaInput = ({
  submitCallback,
  cancelCallback,
}: {
  submitCallback: (args: { labelUUID: string }) => void
  cancelCallback: () => void
}) => {
  const [labelText, setLabelText] = React.useState('')
  const [color, setColor] = React.useState(COLORS[0])
  const [icon, setIcon] = React.useState(ICONS[0])

  const handleCancel = React.useCallback(() => {
    setLabelText('')
    cancelCallback()
  }, [cancelCallback])

  const handleSubmit = React.useCallback(async () => {
    const newLabel: NewLabel = {
      uuid: uuidv4(),
      text: labelText,
      createdAt: new Date().toISOString(),
      color,
      icon,
    }

    const result = await db.insert(LabelsTable).values(newLabel).returning({
      uuid: LabelsTable.uuid,
    })
    submitCallback({ labelUUID: result[0].uuid })
  }, [labelText, color, icon, submitCallback])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TextInput
        style={{ flex: 1, margin: SPACING.md }}
        label="Create a label"
        value={labelText}
        onChangeText={text => setLabelText(text)}
        multiline
      />
      <Text>Choose a color:</Text>
      <ScrollView horizontal style={{ flexDirection: 'row' }}>
        {COLORS.map(color => (
          <TouchableOpacity
            key={color}
            style={{
              margin: SPACING.sm,
              backgroundColor: color,
              width: 50,
              height: 50,
            }}
            onPress={() => setColor(color)}
          ></TouchableOpacity>
        ))}
      </ScrollView>
      <Text>Choose an icon:</Text>
      <ScrollView horizontal style={{ flexDirection: 'row' }}>
        {ICONS.map(icon => (
          <TouchableOpacity
            onPress={() => setIcon(icon)}
            key={icon}
            style={{ width: 50, height: 50 }}
          >
            <Icon size={32} source={icon} color={color} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: 'column',
          marginRight: SPACING.md,
          marginLeft: SPACING.md,
          marginBottom: SPACING.md,
          flex: 1,
        }}
      >
        <Text>Preview:</Text>
        <Label
          fullWidth
          color={color}
          icon={icon}
          text={labelText}
          readonly={true}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginRight: SPACING.md,
          marginLeft: SPACING.md,
          marginBottom: SPACING.md,
        }}
      >
        <Button style={{ flex: 1 }} mode="outlined" onPress={handleCancel}>
          Back
        </Button>
        <Button style={{ flex: 1 }} mode="contained" onPress={handleSubmit}>
          Create
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default IdeaInput
