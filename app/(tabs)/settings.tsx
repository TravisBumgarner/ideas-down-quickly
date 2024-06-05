import { SafeAreaView, View } from 'react-native'
import { db } from '@/db/client'
import { IdeasTable, LabelsTable } from '@/db/schema'
import { Button, Text, TextInput, ToggleButton } from 'react-native-paper'
import { useCallback, useContext, useState } from 'react'
import { context } from '@/shared/context'

import { SPACING } from '../theme'

const Debug = () => {
  const { state, dispatch } = useContext(context)

  const [deleteText, setDeleteText] = useState('')

  const handleWipeDatabase = useCallback(() => {
    db.delete(IdeasTable).run()
    db.delete(LabelsTable).run()
  }, [])

  const updateTheme = useCallback(
    (colorTheme: 'light' | 'dark') => {
      dispatch({
        type: 'EDIT_USER_SETTING',
        payload: {
          colorTheme,
        },
      })
    },
    [dispatch]
  )

  return (
    <SafeAreaView>
      <View
        style={{
          margin: SPACING.md,
          flexDirection: 'row',
        }}
      >
        <Text>Theme</Text>
        <ToggleButton.Group
          onValueChange={updateTheme}
          value={state.settings.colorTheme}
        >
          <ToggleButton icon="weather-sunny" value="light" />
          <ToggleButton icon="moon-waxing-crescent" value="dark" />
        </ToggleButton.Group>
      </View>
      <View style={{ margin: SPACING.md }}>
        <TextInput
          label="Type 'Delete' to confirm wiping database and migrations"
          value={deleteText}
          onChangeText={text => setDeleteText(text)}
        />
        <Button
          disabled={deleteText !== 'Delete'}
          buttonColor="red"
          mode="contained"
          onPress={handleWipeDatabase}
          style={{ marginTop: SPACING.md }}
        >
          Wipe Database and Migrations
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default Debug
