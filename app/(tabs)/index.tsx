import { useCallback, useState } from 'react'
import { SafeAreaView, Button } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { ThemedTextInput } from '@/components/ThemedTextInput'
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity'

const Brainstorm = () => {
  const [text, setText] = useState('')

  const handleSubmit = useCallback(() => {
    console.log('submitted', text)
    setText('')
  }, [text])

  return (
    <SafeAreaView style={style}>
      <ThemedText type="default">Brainstorm</ThemedText>
      <ThemedTextInput value={text} onChangeText={setText} />
      <ThemedTouchableOpacity label="Submit!" onPress={handleSubmit} />
    </SafeAreaView>
  )
}

const style = { backgroundColor: 'green' }

export default Brainstorm

