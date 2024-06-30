import { ICONS } from '@/assets/iconlist'
import { db } from '@/db/client'
import { LabelsTable, NewLabel } from '@/db/schema'
import Button from '@/shared/components/Button'
import ButtonWrapper from '@/shared/components/ButtonWrapper'
import Label from '@/shared/components/Label'
import PageWrapper from '@/shared/components/PageWrapper'
import Typography from '@/shared/components/Typography'
import { COLORS2, SPACING, COLORS as THEME } from '@/shared/theme'
import * as React from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import 'react-native-get-random-values'
import { Icon, TextInput } from 'react-native-paper'
import { v4 as uuidv4 } from 'uuid'

const IdeaInput = ({
  submitCallback,
  cancelCallback,
}: {
  submitCallback: (args: { labelId: string }) => void
  cancelCallback: () => void
}) => {
  const [labelText, setLabelText] = React.useState('')
  const [color, setColor] = React.useState(COLORS2.LABELS[1])
  const [icon, setIcon] = React.useState(ICONS[0])

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
          {Object.values(COLORS2.LABELS).map(color => (
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
        <Typography variant="h2">Preview</Typography>rr
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
          <Button variant="link" color="warning" onPress={handleCancel}>
            Cancel
          </Button>
        }
        right={
          <Button
            disabled={labelText.length === 0}
            variant="filled"
            color="primary"
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
