import { Text, SafeAreaView, ScrollView, View } from 'react-native';
import { IdeasTable, LabelsTable, SelectIdea, SelectLabel } from '@/db/schema';
import { useCallback, useState } from 'react';
import { db } from '@/db/client';
import { ActivityIndicator } from 'react-native-paper';
import { Link } from 'expo-router';
import { eq } from 'drizzle-orm';
import Idea from '@/shared/Idea';
import { useFocusEffect } from '@react-navigation/native';

import { SPACING } from '../theme';

const History = () => {
  const [ideasWithLabel, setIdeasWithLabel] = useState<
    { idea: SelectIdea | null; label: SelectLabel | null }[] | null
  >(null);

  useFocusEffect(
    useCallback(() => {
      db.select()
        .from(IdeasTable)
        .leftJoin(LabelsTable, eq(IdeasTable.labelId, LabelsTable.uuid))
        .then(setIdeasWithLabel);
    }, [])
  );

  if (ideasWithLabel === null) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ActivityIndicator animating size="large" />
      </SafeAreaView>
    );
  }

  if (ideasWithLabel.length === 0) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}
      >
        <Link href="/">
          <Text>Go to brainstorm tab!</Text>
        </Link>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 20,
        }}
        style={{
          flex: 1,
        }}
      >
        {ideasWithLabel.map(item => {
          if (item.label === null || item.idea === null) {
            return (
              <Text
                style={{ flex: 1 }}
                key={item.label?.uuid || item.idea?.uuid}
              >
                Something went wrong
              </Text>
            );
          }
          return (
            <View
              key={item.idea.uuid}
              style={{
                borderRadius: 5,
                width: '100%',
                padding: SPACING.sm,
                flex: 1,
              }}
            >
              <Idea
                color={item.label.color}
                icon={item.label.icon}
                text={item.idea.text}
                label={item.label.text}
                date={item.idea.createdAt}
              />
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default History;
