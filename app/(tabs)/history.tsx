import { useFocusEffect } from '@react-navigation/native'
import * as StoreReview from 'expo-store-review'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FlatList, type ListRenderItem, SafeAreaView, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { useAsyncEffect } from 'use-async-effect'
import queries from '@/db/queries'
import type { SelectLabel } from '@/db/schema'
import Button from '@/shared/components/Button'
import ButtonWrapper from '@/shared/components/ButtonWrapper'
import { default as IdeasByLabelComponent } from '@/shared/components/IdeasByLabel'
import LabelFilterModal from '@/shared/components/LabelFilterModal'
import PageWrapper from '@/shared/components/PageWrapper'
import Typography from '@/shared/components/Typography'
import { useTheme } from '@/shared/ThemeContext'
import { SPACING } from '@/shared/theme'
import type { IdeasByDateAndLabel, IdeasByLabel } from '@/shared/types'
import { getValueFromKeyStore, saveValueToKeyStore } from '@/shared/utilities'

type DateHeaderItem = {
  type: 'date'
  date: string
}

type IdeasByLabelItem = {
  type: 'ideas'
  date: string
  labelId: string
  ideasByLabel: IdeasByLabel
}

type ListItem = DateHeaderItem | IdeasByLabelItem

const History = () => {
  const { colors } = useTheme()
  const [ideasByDateAndLabel, setIdeasByDateAndLabel] =
    useState<IdeasByDateAndLabel | null>(null)

  const [selectedFilterLabelId, setSelectedFilterLabelId] = useState('')
  const [filterLabelList, setFilterLabelList] = useState<SelectLabel[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [hasCheckedIfFeedbackRequested, setHasCheckedIfFeedbackRequested] =
    useState(false)

  // Request feedback once the user has recorded ideas for at least 3 days.
  useAsyncEffect(async () => {
    const shouldRequestFeedback =
      ideasByDateAndLabel !== null &&
      Object.keys(ideasByDateAndLabel).length >= 3

    if (!shouldRequestFeedback || hasCheckedIfFeedbackRequested) return

    setHasCheckedIfFeedbackRequested(true)
    const feedbackRequested = await getValueFromKeyStore('feedbackRequested')
    if (feedbackRequested !== 'true') {
      if (await StoreReview.hasAction()) {
        saveValueToKeyStore('feedbackRequested', 'true')
        StoreReview.requestReview()
      }
    }
  }, [ideasByDateAndLabel, hasCheckedIfFeedbackRequested])

  const clearFilter = useCallback(() => {
    setSelectedFilterLabelId('')
  }, [])

  const fetchFromDB = useCallback(async () => {
    const result = await queries.select.ideasGroupedByLabel()
    setIdeasByDateAndLabel(result)

    const labels = await queries.select.labels()
    setFilterLabelList(labels)
  }, [])

  const onFilterSubmitCallback = useCallback((id: string) => {
    setSelectedFilterLabelId(id)
    setIsModalVisible(false)
  }, [])

  const onFilterCancelCallback = useCallback(() => {
    setIsModalVisible(false)
  }, [])

  useEffect(() => {
    fetchFromDB()
  }, [fetchFromDB])

  useFocusEffect(
    useCallback(() => {
      fetchFromDB()
    }, [fetchFromDB])
  )

  const [listData, unfilteredRowsCount] = useMemo(() => {
    if (ideasByDateAndLabel === null) {
      return [[], 0]
    }

    const output: ListItem[] = []
    let unfilteredRowsCount = 0

    Object.keys(ideasByDateAndLabel).forEach(date => {
      const ideasByLabel = ideasByDateAndLabel[date]
      const dateItems: ListItem[] = []

      Object.keys(ideasByLabel).forEach(labelId => {
        unfilteredRowsCount += ideasByLabel[labelId].ideas.length
        if (selectedFilterLabelId && selectedFilterLabelId !== labelId) {
          return
        }

        dateItems.push({
          type: 'ideas',
          date,
          labelId,
          ideasByLabel: ideasByLabel[labelId],
        })
      })

      if (dateItems.length > 0) {
        output.push({ type: 'date', date })
        output.push(...dateItems)
      }
    })

    return [output, unfilteredRowsCount]
  }, [ideasByDateAndLabel, selectedFilterLabelId])

  const renderItem: ListRenderItem<ListItem> = useCallback(
    ({ item }) => {
      if (item.type === 'date') {
        return (
          <Typography variant="h1" style={{ width: '100%' }}>
            {item.date}
          </Typography>
        )
      }

      return (
        <IdeasByLabelComponent
          ideasByLabel={item.ideasByLabel}
          onDeleteCallback={fetchFromDB}
        />
      )
    },
    [fetchFromDB]
  )

  const keyExtractor = useCallback(
    (item: ListItem) =>
      item.type === 'date'
        ? `date-${item.date}`
        : `ideas-${item.date}-${item.labelId}`,
    []
  )

  if (ideasByDateAndLabel === null) {
    return (
      <SafeAreaView style={{ backgroundColor: colors.surface, flex: 1 }}>
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
      {listData.length > 0 ? (
        <FlatList
          data={listData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews={true}
          ListFooterComponent={
            unfilteredRowsCount < 5 ? (
              <Typography variant="caption" style={{ textAlign: 'center' }}>
                Swipe right on an idea to delete or left to edit
              </Typography>
            ) : null
          }
        />
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

      <ButtonWrapper
        full={
          <Button
            onPress={
              selectedFilterLabelId
                ? () => setSelectedFilterLabelId('')
                : () => setIsModalVisible(true)
            }
            variant="filled"
            color={selectedFilterLabelId ? 'warning' : 'primary'}
          >
            {selectedFilterLabelId ? 'Clear Filter' : 'Filter'}
          </Button>
        }
      />

      <LabelFilterModal
        filterLabelList={filterLabelList}
        onSubmit={onFilterSubmitCallback}
        onCancel={onFilterCancelCallback}
        isModalVisible={isModalVisible}
      />
    </PageWrapper>
  )
}

export default History
