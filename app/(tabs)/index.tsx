import { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { ThemedTextInput } from '@/components/ThemedTextInput'
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity'
import { Button } from 'react-native-paper'

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
      <Button icon="camera" mode="outlined" onPress={handleSubmit}>React Paper Button</Button>
      <Button icon="camera" mode="contained" onPress={handleSubmit}>React Paper Button</Button>
    </SafeAreaView>
  )
}

const style = { backgroundColor: 'green' }

export default Brainstorm

