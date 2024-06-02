import { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { Button } from 'react-native-paper';
import { db } from '@/db/client';
import { notes, type SelectNote } from '@/db/schema';

const Brainstorm = () => {
  const [text, setText] = useState('');
  const [todoList, setTodolist] = useState<SelectNote[]>([]);

  const handleSubmit = useCallback(() => {
    db.insert(notes)
      .values({
        id: Math.floor(Math.random() * 1000),
        title: 'foo',
        body: text,
      })
      .onConflictDoUpdate({
        target: notes.id,
        set: { title: 'foo', body: text, updatedAt: new Date().toISOString() },
      })
      .run();

    setText('');
  }, [text]);

  const handleFetch = useCallback(async () => {
    const results = await db.select().from(notes);
    setTodolist(results);
  }, []);

  return (
    <SafeAreaView style={style}>
      <ThemedText type="default">Brainstorm</ThemedText>
      <ThemedTextInput value={text} onChangeText={setText} />
      <ThemedTouchableOpacity label="Submit!" onPress={handleSubmit} />
      <Button icon="camera" mode="outlined" onPress={handleFetch}>
        Get Entries
      </Button>
      <Button icon="camera" mode="contained" onPress={handleSubmit}>
        Submit Entry
      </Button>
      {todoList.map((todo, i) => (
        <ThemedText key={i}>{todo.body}</ThemedText>
      ))}
    </SafeAreaView>
  );
};

const style = { backgroundColor: 'green' };

export default Brainstorm;
