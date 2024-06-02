import { SafeAreaView } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity'

const History = () => {
  const handleWipeDatabase = () => {
    console.log('handle wipe database')
  }

  return (
    <SafeAreaView style={style}>
      <ThemedText>Debug</ThemedText>
     <ThemedTouchableOpacity label="Wipe Database and Migrations" onPress={handleWipeDatabase}>
     </ThemedTouchableOpacity>
    </SafeAreaView>
  )
}

const style = { backgroundColor: 'red' }

export default History

