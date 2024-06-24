import { db } from '@/db/client'
import { IdeasTable, LabelsTable } from '@/db/schema'
import Button from '@/shared/components/Button'
import PageWrapper from '@/shared/components/PageWrapper'
import Typography from '@/shared/components/Typography'
import { context } from '@/shared/context'
import { SPACING } from '@/shared/theme'
import { useCallback, useContext, useState } from 'react'
import { View } from 'react-native'
import { Text, TextInput, ToggleButton, useTheme } from 'react-native-paper'

const Settings = () => {
  const { state, dispatch } = useContext(context)
  const theme = useTheme()

  const [deleteText, setDeleteText] = useState('')
  const [showRestartText, setShowRestartText] = useState(false)

  const handleWipeDatabase = useCallback(() => {
    db.delete(IdeasTable).run()
    db.delete(LabelsTable).run()
    setShowRestartText(true)
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
    <PageWrapper title="Settings">
      <View
        style={{
          margin: SPACING.md,
        }}
      >
        <Typography variant="h2">Theme</Typography>
        <View style={{ width: '100%', height: 60, flexDirection: 'row' }}>
          <ToggleButton.Group
            onValueChange={updateTheme}
            value={state.settings.colorTheme}
          >
            <ToggleButton
              style={{ flex: 1 }}
              icon="weather-sunny"
              value="light"
            />
            <ToggleButton
              style={{ flex: 1 }}
              icon="moon-waxing-crescent"
              value="dark"
            />
          </ToggleButton.Group>
        </View>
      </View>
      <View style={{ margin: SPACING.md }}>
        <Typography variant="h2">Wipe Database</Typography>
        <TextInput
          label="Type 'Delete' to wipe database"
          value={deleteText}
          onChangeText={text => setDeleteText(text)}
        />
        <View style={{ marginTop: SPACING.md }}>
          <Button
            disabled={deleteText !== 'Delete'}
            onPress={handleWipeDatabase}
            variant="error"
          >
            Wipe Database and Migrations
          </Button>
        </View>
        {showRestartText && (
          <Text style={{ marginTop: SPACING.md }}>
            Database and migrations wiped. Please restart the app.
          </Text>
        )}
      </View>
    </PageWrapper>
  )
}

export default Settings
