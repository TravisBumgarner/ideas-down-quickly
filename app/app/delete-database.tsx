import queries from '@/db/queries'
import Button from '@/shared/components/Button'
import ButtonWrapper from '@/shared/components/ButtonWrapper'
import PageWrapper from '@/shared/components/PageWrapper'
import TextInput from '@/shared/components/TextInput'
import { context } from '@/shared/context'
import { COLORS, SPACING } from '@/shared/theme'
import { router } from 'expo-router'
import * as React from 'react'
import { View } from 'react-native'
import 'react-native-get-random-values'

const DeleteDatabase = () => {
  const { dispatch } = React.useContext(context)
  const [deleteText, setDeleteText] = React.useState('')

  const handleCancel = React.useCallback(() => {
    router.back()
  }, [])

  const handleSubmit = React.useCallback(async () => {
    await queries.delete.everything()
    dispatch({
      type: 'TOAST',
      payload: { message: 'Database wiped', variant: 'SUCCESS' },
    })
    setDeleteText('')
    router.back()
  }, [dispatch])

  return (
    <PageWrapper>
      <View style={{ marginTop: SPACING.XLARGE }}>
        <TextInput
          label="Type 'Delete' to wipe database"
          value={deleteText}
          onChangeText={text => setDeleteText(text)}
          color={COLORS.WARNING[300]}
        />
        <ButtonWrapper
          left={
            <Button variant="link" color="primary" onPress={handleCancel}>
              Cancel
            </Button>
          }
          right={
            <Button
              disabled={deleteText.toLowerCase() !== 'delete'}
              variant="filled"
              color="warning"
              onPress={handleSubmit}
            >
              Delete
            </Button>
          }
        />
      </View>
    </PageWrapper>
  )
}

export default DeleteDatabase
