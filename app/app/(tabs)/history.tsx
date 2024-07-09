import queries from '@/db/queries'
import Button from '@/shared/components/Button'
import Dropdown from '@/shared/components/Dropdown'
import { default as IdeasByLabel } from '@/shared/components/IdeasByLabel'
import PageWrapper from '@/shared/components/PageWrapper'
import Typography from '@/shared/components/Typography'
import { COLORS, SPACING } from '@/shared/theme'
import { IdeasByDateAndLabel } from '@/shared/types'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

const History = () => {
  const [ideasByDateAndLabel, setIdeasByDateAndLabel] =
    useState<IdeasByDateAndLabel | null>(null)

  const [selectedFilterLabelId, setSelectedFilterLabelId] = useState('')
  const [filterLabelList, setFilterLabelList] = useState<
    { label: string; value: string }[]
  >([])

  const clearFilter = useCallback(() => {
    setSelectedFilterLabelId('')
  }, [])

  const fetchFromDB = useCallback(async (filterToLabels?: string[]) => {
    const result = await queries.select.ideasGroupedByLabel(filterToLabels)
    setIdeasByDateAndLabel(result)

    const labels = await queries.select.labels()
    setFilterLabelList([
      { label: 'All', value: '' },
      ...labels.map(label => ({ label: label.text, value: label.id })),
    ])
  }, [])

  useEffect(() => {
    if (selectedFilterLabelId) {
      fetchFromDB([selectedFilterLabelId])
    } else {
      fetchFromDB()
    }
  }, [fetchFromDB, selectedFilterLabelId])

  useFocusEffect(
    useCallback(() => {
      fetchFromDB()
    }, [fetchFromDB])
  )

  const rows = useMemo(() => {
    if (ideasByDateAndLabel === null) {
      return []
    }

    const output: JSX.Element[] = []

    Object.keys(ideasByDateAndLabel).forEach(date => {
      output.push(
        <Typography key={date} variant="h1" style={{ width: '100%' }}>
          {date}
        </Typography>
      )

      const ideasByLabel = ideasByDateAndLabel[date]

      Object.keys(ideasByLabel).forEach(key => {
        output.push(
          <IdeasByLabel
            key={key + date}
            ideasByLabel={ideasByLabel[key]}
            onDeleteCallback={fetchFromDB}
          />
        )
      })
    })

    return output
  }, [ideasByDateAndLabel, fetchFromDB])

  if (ideasByDateAndLabel === null) {
    return (
      <SafeAreaView style={{ backgroundColor: COLORS.NEUTRAL[700], flex: 1 }}>
        <ActivityIndicator animating size="large" />
      </SafeAreaView>
    )
  }

  if (Object.keys(ideasByDateAndLabel).length === 0) {
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
          <Typography variant="caption" style={{ textAlign: 'center' }}>
            Start on the Ideate tab.
          </Typography>
        </View>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      {rows.length > 0 ? (
        <ScrollView>
          {rows}
          {rows.length < 5 && (
            <Typography variant="caption" style={{ textAlign: 'center' }}>
              Swipe right on an idea to delete or left to edit
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
