import { db } from '@/db/client'
import { IdeasTable, LabelsTable, SelectIdea, SelectLabel } from '@/db/schema'
import Idea from '@/shared/components/Idea'
import Typography from '@/shared/components/Typography'
import { SPACING } from '@/shared/theme'
import { areSameDay, formatDisplayDate } from '@/shared/utilities'
import { useFocusEffect } from '@react-navigation/native'
import { desc, eq } from 'drizzle-orm'
import { Link } from 'expo-router'
import { useCallback, useMemo, useState } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import { ActivityIndicator, Text, useTheme } from 'react-native-paper'

const History = () => {
  const [ideasWithLabel, setIdeasWithLabel] = useState<
    { idea: SelectIdea | null; label: SelectLabel | null }[] | null
  >(null)
  const theme = useTheme()

  useFocusEffect(
    useCallback(() => {
      db.select()
        .from(IdeasTable)
        .leftJoin(LabelsTable, eq(IdeasTable.labelId, LabelsTable.uuid))
        .orderBy(desc(IdeasTable.createdAt))
        .then(setIdeasWithLabel)
    }, [])
  )

  const rows = useMemo(() => {
    if (ideasWithLabel === null) {
      return null
    }

    const output: JSX.Element[] = []
    let currentDate: Date | null = null

    ideasWithLabel.forEach(item => {
      if (item.label === null || item.idea === null) {
        output.push(
          <Text style={{ flex: 1 }} key={item.label?.uuid || item.idea?.uuid}>
            Something went wrong
          </Text>
        )
      } else {
        const parsedCreatedAt = new Date(item.idea.createdAt)
        if (!areSameDay(currentDate, parsedCreatedAt)) {
          // There might be a better way to attach dates but for now this works.
          output.push(
            <Typography
              variant="h2"
              style={{ flex: 1 }}
              key={item.idea.createdAt}
            >
              {formatDisplayDate(parsedCreatedAt)}
            </Typography>
          )
          currentDate = parsedCreatedAt
        }

        output.push(
          <View
            key={item.idea.uuid}
            style={{
              borderRadius: SPACING.md,
              width: '100%',
              paddingRight: SPACING.md,
              paddingLeft: SPACING.md,
              marginBottom: SPACING.md,
              flex: 1,
            }}
          >
            <Idea
              color={item.label.color}
              icon={item.label.icon}
              text={item.idea.text}
              label={item.label.text}
            />
          </View>
        )
      }
    })

    return output
  }, [ideasWithLabel])

  if (ideasWithLabel === null) {
    return (
      <SafeAreaView
        style={{ backgroundColor: theme.colors.background, flex: 1 }}
      >
        <ActivityIndicator animating size="large" />
      </SafeAreaView>
    )
  }

  if (ideasWithLabel.length === 0) {
    return (
      <SafeAreaView
        style={{
          backgroundColor: theme.colors.background,
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          padding: SPACING.md,
        }}
      >
        <Link href="/">
          <Typography variant="body1" style={{ textAlign: 'center' }}>
            Go to Brainstorm Tab to create your first Idea.
          </Typography>
        </Link>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <Typography variant="h1" style={{ textAlign: 'center' }}>
        History
      </Typography>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
        style={{
          flex: 1,
        }}
      >
        {rows}
      </ScrollView>
    </SafeAreaView>
  )
}

export default History
