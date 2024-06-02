import { useState } from 'react'
import { View, Text, SafeAreaView, Button } from 'react-native'
import { ThemedText } from '@/components/ThemedText'


const Brainstorm = () => {
  const [counter, setCounter] = useState(0)

  return (
    <SafeAreaView style={style}>
      <ThemedText type="default">Brainstorm</ThemedText>
      <ThemedText type="default">{counter}</ThemedText>
      <Button title="Increment" onPress={() => setCounter(counter + 1)} />
    </SafeAreaView>
  )
}

const style = { backgroundColor: 'green' }

export default Brainstorm

