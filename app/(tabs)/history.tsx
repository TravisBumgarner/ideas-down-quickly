import { Text, SafeAreaView, FlatList } from 'react-native'
import { ThemedText } from '@/components/ThemedText'


const History = () => {
  return (
    <SafeAreaView style={style}>
      <ThemedText>Hello</ThemedText>
      <FlatList
        data={['a', 'b', 'c']}
        renderItem={({ item }) => <Text>A! {item}</Text>}
        keyExtractor={(item) => item}
      />
    </SafeAreaView>
  )
}

const style = { backgroundColor: 'red' }

export default History

