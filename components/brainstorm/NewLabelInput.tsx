import { ICONS } from '@/assets/iconlist'
import { db } from '@/db/client'
import { LabelsTable, NewLabel } from '@/db/schema'
import Button from '@/shared/components/Button'
import ButtonWrapper from '@/shared/components/ButtonWrapper'
import Label from '@/shared/components/Label'
import PageWrapper from '@/shared/components/PageWrapper'
import Typography from '@/shared/components/Typography'
import { SPACING, COLORS as THEME } from '@/shared/theme'
import * as React from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import 'react-native-get-random-values'
import { Icon, TextInput, useTheme } from 'react-native-paper'
import { v4 as uuidv4 } from 'uuid'

const COLORS = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#9e9e9e',
  '#607d8b',
]

const IdeaInput = ({
  submitCallback,
  cancelCallback,
}: {
  submitCallback: (args: { labelId: string }) => void
  cancelCallback: () => void
}) => {
  const [labelText, setLabelText] = React.useState('')
  const [color, setColor] = React.useState(COLORS[0])
  const [icon, setIcon] = React.useState(ICONS[0])
  const theme = useTheme()

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
    <PageWrapper title="Create a Label">
      <TextInput
        style={{ height: 80 }}
        label="Label Text"
        value={labelText}
        onChangeText={text => setLabelText(text)}
        multiline
        selectTextOnFocus
        returnKeyType="done"
      />
      <View
        style={{
          marginBottom: SPACING.md,
          borderBottomColor: THEME.light.opaque,
          borderBottomWidth: 1,
          paddingBottom: SPACING.md,
        }}
      >
        <Typography variant="h2">Color</Typography>
        <ScrollView
          horizontal
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {COLORS.map(color => (
            <TouchableOpacity
              key={color}
              style={{
                marginTop: SPACING.sm,
                marginBottom: SPACING.sm,
                marginLeft: 0,
                marginRight: SPACING.md,
                backgroundColor: color,
                width: 50,
                height: 50,
              }}
              onPress={() => setColor(color)}
            ></TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          flex: 1,
          marginBottom: SPACING.md,
          borderBottomColor: THEME.light.opaque,
          borderBottomWidth: 1,
          paddingBottom: SPACING.md,
        }}
      >
        <Typography variant="h2">Icon</Typography>
        <ScrollView
          horizontal
          contentContainerStyle={{
            flexDirection: 'column',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {ICONS.map(icon => (
            <TouchableOpacity
              onPress={() => setIcon(icon)}
              key={icon}
              style={{
                width: 25,
                height: 25,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon size={20} source={icon} color={color} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'column',
          marginBottom: SPACING.md,
          borderBottomColor: THEME.light.opaque,
          borderBottomWidth: 1,
          paddingBottom: SPACING.md,
        }}
      >
        <Typography variant="h2">Preview</Typography>
        <Label
          fullWidth
          color={color}
          icon={icon}
          text={labelText}
          readonly={true}
        />
      </View>
      <ButtonWrapper
        left={
          <Button variant="error" onPress={handleCancel}>
            Cancel
          </Button>
        }
        right={
          <Button
            disabled={labelText.length === 0}
            variant="primary"
            onPress={handleSubmit}
          >
            Create
          </Button>
        }
      />
    </PageWrapper>
  )
}

export default IdeaInput
