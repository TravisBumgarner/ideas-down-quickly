import { ICONS } from '@/assets/iconlist'
import queries from '@/db/queries'
import { NewLabel } from '@/db/schema'
import Button from '@/shared/components/Button'
import ButtonWrapper from '@/shared/components/ButtonWrapper'
import Label from '@/shared/components/Label'
import PageWrapper from '@/shared/components/PageWrapper'
import TextInput from '@/shared/components/TextInput'
import { BORDER_WIDTH, COLORS, SPACING } from '@/shared/theme'
import { navigateWithParams } from '@/shared/utilities'
import { router } from 'expo-router'
import * as React from 'react'
import { Keyboard, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import 'react-native-get-random-values'
import { Icon } from 'react-native-paper'
import { v4 as uuidv4 } from 'uuid'

const DISPLAY_DATE = new Date().toISOString()

const AddLabel = () => {
  const [labelText, setLabelText] = React.useState('')
  const [color, setColor] = React.useState<string>(COLORS.NEUTRAL[700])
  const [icon, setIcon] = React.useState<string>(ICONS[0])

  const handleCancel = React.useCallback(() => {
    router.back()
  }, [])

  const handleColorPress = React.useCallback((color: string) => {
    setColor(color)
    Keyboard.dismiss()
  }, [])

  const handleIconPress = React.useCallback((icon: string) => {
    setIcon(icon)
    Keyboard.dismiss()
  }, [])

  const handleSubmit = React.useCallback(async () => {
    const label: NewLabel = {
      id: uuidv4(),
      text: labelText,
      createdAt: new Date().toISOString(),
      color,
      icon,
    }
    await queries.insert.label(label)
    navigateWithParams('add-idea', { labelId: label.id })
  }, [labelText, color, icon])

  return (
    <PageWrapper>
      <View style={styles.container}>
        <Label
          id={''}
          color={color}
          icon={icon}
          text={labelText}
          readonly={true}
          lastUsedAt={DISPLAY_DATE}
        />
        <TextInput
          autoFocus={true} //eslint-disable-line
          color={COLORS.NEUTRAL[700]}
          value={labelText}
          onChangeText={text => setLabelText(text)}
          multiline
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
              onPress={() => handleColorPress(color)}
            ></TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            borderTopColor: COLORS.NEUTRAL[700],
            borderTopWidth: BORDER_WIDTH.XSMALL,
            paddingTop: SPACING.SMALL,
            marginTop: SPACING.SMALL,
            borderBottomColor: COLORS.NEUTRAL[700],
            borderBottomWidth: BORDER_WIDTH.XSMALL,
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
                onPress={() => handleIconPress(icon)}
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
          <Button color="warning" variant="link" onPress={handleCancel}>
            Cancel
          </Button>
        }
        right={
          <Button
            disabled={labelText.length === 0}
            color="primary"
            variant="filled"
            onPress={handleSubmit}
          >
            Create Category
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

export default AddLabel
