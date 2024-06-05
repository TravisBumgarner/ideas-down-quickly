import { SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { db } from '@/db/client';
import { sql } from 'drizzle-orm';
import { IdeasTable, LabelsTable, TABLE_NAMES } from '@/db/schema';
import { Button } from 'react-native-paper';

const Debug = () => {
  const handleWipeDatabase = () => {
    db.delete(IdeasTable);
    db.delete(LabelsTable);
  };

  return (
    <SafeAreaView style={style}>
      <ThemedText>Debug</ThemedText>
      <Button onPress={handleWipeDatabase}>Wipe Database and Migrations</Button>
    </SafeAreaView>
  );
};

const style = { backgroundColor: 'red' };

export default Debug;
