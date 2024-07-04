import { db } from '@/db/client'
import { IdeasTable, LabelsTable, SelectIdea, SelectLabel } from '@/db/schema'
import Button from '@/shared/components/Button'
import Dropdown from '@/shared/components/Dropdown'
import Idea from '@/shared/components/Idea'
import PageWrapper from '@/shared/components/PageWrapper'
import Typography from '@/shared/components/Typography'
import { COLORS, SPACING } from '@/shared/theme'
import { areSameDay, formatDisplayDate } from '@/shared/utilities'
import { useFocusEffect } from '@react-navigation/native'
import { desc, eq } from 'drizzle-orm'
import { router } from 'expo-router'
import { useCallback, useMemo, useState } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

const History = () => {
  const [ideasWithLabel, setIdeasWithLabel] = useState<
    { idea: SelectIdea | null; label: SelectLabel | null }[] | null
  >(null)

  const [selectedFilterLabelId, setSelectedFilterLabelId] = useState('')
  const [filterLabelList, setFilterLabelList] = useState<
    { label: string; value: string }[]
  >([])

  const clearFilter = useCallback(() => {
    setSelectedFilterLabelId('')
  }, [])

  const fetchFromDB = useCallback(() => {
    db.select()
      .from(IdeasTable)
      .leftJoin(LabelsTable, eq(IdeasTable.labelId, LabelsTable.id))
      .orderBy(desc(IdeasTable.createdAt))
      .then(setIdeasWithLabel)

    db.select()
      .from(LabelsTable)
      .then(labels => {
        setFilterLabelList([
          { label: 'All', value: '' },
          ...labels.map(label => ({ label: label.text, value: label.id })),
        ])
      })
  }, [])

  const navigateHome = useCallback(() => {
    router.navigate('/')
  }, [])

  useFocusEffect(
    useCallback(() => {
      fetchFromDB()
    }, [fetchFromDB])
  )

  const rows = useMemo(() => {
    if (ideasWithLabel === null) {
      return []
    }

    const output: JSX.Element[] = []
    let currentDate: Date | null = null

    ideasWithLabel.forEach(item => {
      if (
        item.idea?.labelId !== selectedFilterLabelId &&
        selectedFilterLabelId !== ''
      ) {
        return
      }

      if (item.label === null || item.idea === null) {
        output.push(
          <Typography variant="body1" key={item.label?.id || item.idea?.id}>
            Something went wrong
          </Typography>
        )
      } else {
        const parsedCreatedAt = new Date(item.idea.createdAt)
        if (!areSameDay(currentDate, parsedCreatedAt)) {
          // There might be a better way to attach dates but for now this works.
          output.push(
            <Typography
              variant="h1"
              style={{ width: '100%' }}
              key={item.idea.createdAt}
            >
              {formatDisplayDate(parsedCreatedAt)}
            </Typography>
          )
          currentDate = parsedCreatedAt
        }

        output.push(
          <View
            key={item.idea.id}
            style={{
              borderRadius: SPACING.MEDIUM,
              width: '100%',
              marginBottom: SPACING.MEDIUM,
              flex: 1,
            }}
          >
            <Idea
              color={item.label.color}
              icon={item.label.icon}
              text={item.idea.text}
              id={item.idea.id}
              label={item.label.text}
              onDeleteCallback={fetchFromDB}
            />
          </View>
        )
      }
    })

    return output
  }, [ideasWithLabel, fetchFromDB, selectedFilterLabelId])

  if (ideasWithLabel === null) {
    return (
      <SafeAreaView style={{ backgroundColor: COLORS.NEUTRAL[700], flex: 1 }}>
        <ActivityIndicator animating size="large" />
      </SafeAreaView>
    )
  }

  if (ideasWithLabel.length === 0) {
    return (
      <PageWrapper>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            paddingTop: SPACING.MEDIUM,
            paddingBottom: SPACING.MEDIUM,
            flex: 1,
          }}
        >
          <Button onPress={navigateHome} variant="filled" color="primary">
            Get ideating on the brainstorm tab.
          </Button>
        </View>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      {rows.length > 0 ? (
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
          {rows.length < 5 && (
            <Typography variant="caption" style={{ textAlign: 'center' }}>
              Swipe right to delete or left to edit.
            </Typography>
          )}
        </ScrollView>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            paddingTop: SPACING.MEDIUM,
            paddingBottom: SPACING.MEDIUM,
            flex: 1,
          }}
        >
          <Typography
            variant="caption"
            style={{ textAlign: 'center', marginBottom: SPACING.MEDIUM }}
          >
            No ideas exist yet.
          </Typography>
          <Button onPress={clearFilter} variant="filled" color="primary">
            Clear Filters
          </Button>
        </View>
      )}

      <View style={{ marginVertical: SPACING.MEDIUM }}>
        <Dropdown
          value={selectedFilterLabelId}
          onChangeCallback={setSelectedFilterLabelId}
          data={filterLabelList}
          dropdownPosition="top"
        />
      </View>
    </PageWrapper>
  )
}

export default History
