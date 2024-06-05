import * as React from 'react'
import { Animated, SafeAreaView, View } from 'react-native'
import {
  TextInput,
  Button,
  ActivityIndicator,
  Icon,
  Text,
  useTheme,
} from 'react-native-paper'
import { SPACING } from '@/src/app/theme'
import { IdeasTable, LabelsTable, NewIdea, SelectLabel } from '@/src/db/schema'
import { db } from '@/src/db/client'
import { eq } from 'drizzle-orm'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

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
  const isFocused = React.useRef(new Animated.Value(0)).current
  const theme = useTheme()

  const onFocus = React.useCallback(() => {
    Animated.timing(isFocused, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }, [isFocused])

  const onBlur = React.useCallback(() => {
    Animated.timing(isFocused, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }, [isFocused])

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
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon source={label.icon} size={50} color="white" />
        <Text>{label.text}</Text>
      </View>
      <Animated.View
        style={{
          flex: isFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        }}
      >
        <TextInput
          style={{
            margin: SPACING.md,
            flex: 1,
          }}
          label="Spill it..."
          value={ideaText}
          onChangeText={text => setIdeaText(text)}
          onFocus={onFocus}
          onBlur={onBlur}
          multiline
        />
      </Animated.View>
      <View
        style={{
          flexDirection: 'row',
          marginRight: SPACING.md,
          marginLeft: SPACING.md,
          marginBottom: SPACING.md,
        }}
      >
        <Button style={{ flex: 1 }} mode="outlined" onPress={handleCancel}>
          Clear
        </Button>
        <Button style={{ flex: 1 }} mode="contained" onPress={handleSubmit}>
          Submit
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default IdeaInput
