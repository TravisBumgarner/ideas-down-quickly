import { SafeAreaView } from 'react-native';
import { db } from '@/db/client';
import { IdeasTable, LabelsTable } from '@/db/schema';
import { Button } from 'react-native-paper';

const Debug = () => {
  const handleWipeDatabase = () => {
    db.delete(IdeasTable).run();
    db.delete(LabelsTable).run();
  };

  return (
    <SafeAreaView>
      <Button mode="contained" onPress={handleWipeDatabase}>
        Wipe Database and Migrations
      </Button>
    </SafeAreaView>
  );
};

export default Debug;
