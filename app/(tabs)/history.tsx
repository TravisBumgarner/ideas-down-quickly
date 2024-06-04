import { Text, SafeAreaView, FlatList, View } from 'react-native';
import { ThemedText } from '@/shared/ThemedText';
import { IdeasTable, SelectIdea } from '@/db/schema';
import { useCallback, useState } from 'react';
import { db } from '@/db/client';
import { Button } from 'react-native-paper';

const History = () => {
  const [ideas, setIdeas] = useState<SelectIdea[]>([]);

  const handleFetch = useCallback(async () => {
    db.select().from(IdeasTable).then(setIdeas);
  }, []);

  return (
    <SafeAreaView style={style}>
      <ThemedText>History</ThemedText>
      <Button icon="camera" mode="outlined" onPress={handleFetch}>
        Get Entries
      </Button>
      <FlatList
        data={ideas}
        keyExtractor={item => item.uuid}
        renderItem={({ item }) => (
          <View>
            <Text>Label: {item.labelId}</Text>
            <Text>Text: {item.text}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const style = { backgroundColor: 'red' };

export default History;
