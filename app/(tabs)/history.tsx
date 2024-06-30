import { db } from '@/db/client'
import { IdeasTable, LabelsTable, SelectIdea, SelectLabel } from '@/db/schema'
import Dropdown from '@/shared/components/Dropdown'
import Idea from '@/shared/components/Idea'
import PageWrapper from '@/shared/components/PageWrapper'
import Typography from '@/shared/components/Typography'
import { SPACING } from '@/shared/theme'
import { areSameDay, formatDisplayDate } from '@/shared/utilities'
import { useFocusEffect } from '@react-navigation/native'
import { desc, eq } from 'drizzle-orm'
import { Link } from 'expo-router'
import { useCallback, useMemo, useState } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import { ActivityIndicator, useTheme } from 'react-native-paper'

const History = () => {
  const [ideasWithLabel, setIdeasWithLabel] = useState<
    { idea: SelectIdea | null; label: SelectLabel | null }[] | null
  >(null)
  const theme = useTheme()
  const [isFilterMenuVisible, setIsFilterMenuVisible] = useState(false)
  const [selectedFilterLabelId, setSelectedFilterLabelId] = useState('')
  const [filterLabelList, setFilterLabelList] = useState<
    { label: string; value: string }[]
  >([])

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

  useFocusEffect(
    useCallback(() => {
      fetchFromDB()
    }, [fetchFromDB])
  )

  const rows = useMemo(() => {
    if (ideasWithLabel === null) {
      return null
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
            key={item.idea.id}
            style={{
              borderRadius: SPACING.md,
              width: '100%',
              marginBottom: SPACING.md,
              flex: 1,
            }}
          >
            <Idea
              color={item.label.color}
              icon={item.label.icon}
              text={item.idea.text}
              label={item.label.text}
              id={item.idea.id}
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
      <SafeAreaView
        style={{ backgroundColor: theme.colors.background, flex: 1 }}
      >
        <ActivityIndicator animating size="large" />
      </SafeAreaView>
    )
  }

  if (ideasWithLabel.length === 0) {
    return (
      <PageWrapper
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          paddingTop: SPACING.md,
          paddingBottom: SPACING.md,
        }}
      >
        <Link href="/">
          <Typography variant="caption" style={{ textAlign: 'center' }}>
            Get ideating on the brainstorm tab.
          </Typography>
        </Link>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper title="History">
      <Dropdown
        value={selectedFilterLabelId}
        setValue={setSelectedFilterLabelId}
        list={filterLabelList}
        isVisible={isFilterMenuVisible}
        setIsVisible={setIsFilterMenuVisible}
        label="Filter by Label"
      ></Dropdown>
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
        {!rows ||
          (rows.length < 5 && (
            <Typography variant="body1" style={{ textAlign: 'center' }}>
              Swipe right on Idea to delete or left to edit.
            </Typography>
          ))}
      </ScrollView>
    </PageWrapper>
  )
}

export default History
