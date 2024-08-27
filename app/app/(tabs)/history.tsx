import queries from '@/db/queries'
import { SelectLabel } from '@/db/schema'
import Button from '@/shared/components/Button'
import ButtonWrapper from '@/shared/components/ButtonWrapper'
import { default as IdeasByLabel } from '@/shared/components/IdeasByLabel'
import LabelFilterModal from '@/shared/components/LabelFilterModal'
import PageWrapper from '@/shared/components/PageWrapper'
import Typography from '@/shared/components/Typography'
import { COLORS, SPACING } from '@/shared/theme'
import { IdeasByDateAndLabel } from '@/shared/types'
import {
  getValueFromKeyStore,
  notNull,
  saveValueToKeyStore,
} from '@/shared/utilities'
import { useFocusEffect } from '@react-navigation/native'
import * as StoreReview from 'expo-store-review'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { useAsyncEffect } from 'use-async-effect'

const History = () => {
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
    // if (feedbackRequested !== 'true') {
    if (feedbackRequested) {
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

  const [rows, unfilteredRowsCount] = useMemo(() => {
    if (ideasByDateAndLabel === null) {
      return [[], 0]
    }

    const output: JSX.Element[] = []
    let unfilteredRowsCount = 0

    Object.keys(ideasByDateAndLabel).forEach(date => {
      const dateOutput = (
        <Typography key={date} variant="h1" style={{ width: '100%' }}>
          {date}
        </Typography>
      )

      const ideasByLabel = ideasByDateAndLabel[date]

      const ideasOutput = Object.keys(ideasByLabel)
        .map(labelId => {
          unfilteredRowsCount += ideasByLabel[labelId].ideas.length
          if (selectedFilterLabelId && selectedFilterLabelId !== labelId) {
            return null
          }

          return (
            <IdeasByLabel
              key={labelId + date}
              ideasByLabel={ideasByLabel[labelId]}
              onDeleteCallback={fetchFromDB}
            />
          )
        })
        .filter(notNull)

      if (ideasOutput.length > 0) {
        output.push(dateOutput)
        output.push(...ideasOutput)
      }
    })

    return [output, unfilteredRowsCount]
  }, [ideasByDateAndLabel, fetchFromDB, selectedFilterLabelId])

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
          {unfilteredRowsCount < 5 && (
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
