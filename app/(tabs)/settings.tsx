import { db } from '@/db/client'
import { IdeasTable, LabelsTable } from '@/db/schema'
import Button from '@/shared/components/Button'
import PageWrapper from '@/shared/components/PageWrapper'
import TextInput from '@/shared/components/TextInput'
import Typography from '@/shared/components/Typography'
import { context } from '@/shared/context'
import { COLORS, SPACING } from '@/shared/theme'
import { useCallback, useContext, useState } from 'react'
import { View } from 'react-native'
import { ToggleButton } from 'react-native-paper'

const Settings = () => {
  const { state, dispatch } = useContext(context)

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
      <Typography variant="h2">Wipe Database</Typography>
      <TextInput
        label="Type 'Delete' to wipe database"
        value={deleteText}
        onChangeText={text => setDeleteText(text)}
        color={COLORS.WARNING[300]}
      />
      <View style={{ marginTop: SPACING.MEDIUM }}>
        <Button
          disabled={deleteText !== 'Delete'}
          onPress={handleWipeDatabase}
          variant="filled"
          color="warning"
        >
          Wipe Database and Migrations
        </Button>
      </View>
      {showRestartText && (
        <Typography variant="caption">
          Database and migrations wiped. Please restart the app.
        </Typography>
      )}
    </PageWrapper>
  )
}

export default Settings
