import { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { ThemedText } from '@/shared/ThemedText';
import { ThemedTextInput } from '@/shared/ThemedTextInput';
import { Button, Text } from 'react-native-paper';
import { db } from '@/db/client';
import { IdeasTable, LabelsTable, SelectLabel, SelectIdea } from '@/db/schema';
import 'react-native-get-random-values'; // Needs to come before any uuid imports
import { v4 as uuidv4 } from 'uuid';
import { ThemedTouchableOpacity } from '@/shared/ThemedTouchableOpacity';

const Brainstorm = () => {
  const [ideaText, setIdeaText] = useState('');
  const [labelText, setLabelText] = useState('');
  const [labels, setLabels] = useState<SelectLabel[]>([]);
  const [activeLabel, setActiveLabel] = useState<SelectLabel | null>(null);

  const handleFetch = useCallback(async () => {
    db.select().from(LabelsTable).then(setLabels);
  }, []);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  useEffect(() => {
    db.select().from(LabelsTable).then(setLabels);
  }, []);

  const handleSubmitIdea = useCallback(() => {
    if (!activeLabel) {
      console.log('no active label');
      return;
    }

    db.insert(IdeasTable)
      .values({
        uuid: uuidv4(),
        text: ideaText,
        createdAt: new Date().toISOString(),
        labelId: activeLabel.uuid,
      })
      .onConflictDoUpdate({
        target: IdeasTable.uuid,
        set: { text: ideaText, updatedAt: new Date().toISOString() },
      })
      .returning({
        uuid: IdeasTable.uuid,
        labelId: IdeasTable.labelId,
      })
      .run();

    setIdeaText('');
  }, [ideaText, activeLabel]);

  const handleSubmitLabel = useCallback(async () => {
    await db
      .insert(LabelsTable)
      .values({
        uuid: uuidv4(),
        text: labelText,
        createdAt: new Date().toISOString(),
      })
      .onConflictDoUpdate({
        target: LabelsTable.uuid,
        set: { text: labelText, updatedAt: new Date().toISOString() },
      })
      .run();

    setLabelText('');
  }, [labelText]);

  const handleActiveLabelChange = useCallback(
    (data: SelectLabel | SelectIdea) => {
      setActiveLabel(data as unknown as SelectLabel);
    },
    []
  );

  return (
    <SafeAreaView style={style}>
      <ThemedText type="default">Brainstorm</ThemedText>
      <Text>Labels Input, select a label</Text>
      {labels.map(label => (
        <ThemedTouchableOpacity
          key={label.uuid}
          data={label}
          onPressCallback={handleActiveLabelChange}
        />
      ))}
      <Text>Selected Label</Text>
      {activeLabel && (
        <ThemedText type="default">{activeLabel.text}</ThemedText>
      )}
      <ThemedTextInput
        value={labelText}
        onChangeText={setLabelText}
        placeholder="Label Text"
      />
      <Button icon="camera" mode="contained" onPress={handleSubmitLabel}>
        Submit Label
      </Button>

      <Text>Idea Creation</Text>
      <ThemedTextInput
        value={ideaText}
        onChangeText={setIdeaText}
        placeholder="Idea Text"
      />
      <Button icon="camera" mode="contained" onPress={handleSubmitIdea}>
        Submit Idea
      </Button>
    </SafeAreaView>
  );
};

const style = { backgroundColor: 'green' };

export default Brainstorm;
