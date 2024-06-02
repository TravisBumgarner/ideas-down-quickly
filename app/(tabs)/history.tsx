import { useState } from 'react'
import { View, Text, SafeAreaView, Button } from 'react-native'
import { ThemedText } from '@/components/ThemedText'


const History = () => {
  return (
    <SafeAreaView style={style}>
      <ThemedText>Hello</ThemedText>
    </SafeAreaView>
  )
}
      
const style = { backgroundColor: 'red' }

export default History

