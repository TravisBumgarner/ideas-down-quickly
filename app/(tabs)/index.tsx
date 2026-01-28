import { router, useFocusEffect } from 'expo-router'
import * as React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { ActivityIndicator, Switch, Text } from 'react-native-paper'
import queries from '@/db/queries'
import type { SelectLabel } from '@/db/schema'
import Button from '@/shared/components/Button'
import Label from '@/shared/components/Label'
import PageWrapper from '@/shared/components/PageWrapper'
import Typography from '@/shared/components/Typography'
import { context } from '@/shared/context'
import { useTheme } from '@/shared/ThemeContext'
import { SPACING } from '@/shared/theme'
import { navigateWithParams } from '@/shared/utilities'

const LabelSelect = () => {
  const [labels, setLabels] = React.useState<SelectLabel[] | null>(null)
  const [hasArchivedLabels, setHasArchivedLabels] = React.useState(false)
  const [showArchived, setShowArchived] = React.useState(false)
  const { colors } = useTheme()
  const { dispatch } = React.useContext(context)

  const fetchLabels = React.useCallback(async () => {
    const fetchedLabels = await queries.select.labels({
      includeArchived: showArchived,
    })
    setLabels(fetchedLabels)

    // Check if there are any archived labels
    const allLabels = await queries.select.labels({ includeArchived: true })
    setHasArchivedLabels(allLabels.some(l => l.isArchived === 1))
  }, [showArchived])

  useFocusEffect(
    React.useCallback(() => {
      fetchLabels()
    }, [fetchLabels])
  )

  const handleArchive = React.useCallback(
    async (id: string, isCurrentlyArchived: boolean) => {
      await queries.update.archiveLabel(id, !isCurrentlyArchived)
      fetchLabels()
      dispatch({
        type: 'TOAST',
        payload: {
          message: isCurrentlyArchived
            ? 'Category restored'
            : 'Category archived',
          variant: 'SUCCESS',
        },
      })
    },
    [fetchLabels, dispatch]
  )

  const addNewLabel = React.useCallback(() => {
    router.push('add-label')
  }, [])

  if (labels === null) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ActivityIndicator animating size="large" />
      </SafeAreaView>
    )
  }

  if (labels.length === 0) {
    return (
      <PageWrapper>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <Button color="primary" variant="filled" onPress={addNewLabel}>
            Categorize Your Idea
          </Button>
          <Typography
            variant="caption"
            style={{ textAlign: 'center', marginTop: SPACING.MEDIUM }}
          >
            Ideas are grouped by Category
          </Typography>
          {hasArchivedLabels && (
            <View
              style={[styles.toggleContainer, { marginTop: SPACING.LARGE, backgroundColor: colors.surfaceVariant }]}
            >
              <Text style={[styles.toggleLabel, { color: colors.textPrimary }]}>Show Archived</Text>
              <Switch
                value={showArchived}
                onValueChange={setShowArchived}
                color={colors.switchActive}
              />
            </View>
          )}
        </View>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <View
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'flex-start',
          }}
          style={{
            flex: 1,
          }}
        >
          {labels.map(
            ({ color, id, icon, text, lastUsedAt, isArchived }, index) => (
              <View
                key={index}
                style={{
                  marginBottom: SPACING.SMALL,
                }}
              >
                <Label
                  lastUsedAt={lastUsedAt}
                  color={color}
                  icon={icon}
                  text={text}
                  id={id}
                  isArchived={isArchived === 1}
                  handlePress={() =>
                    navigateWithParams('add-idea', { labelId: id })
                  }
                  onArchive={() => handleArchive(id, isArchived === 1)}
                />
              </View>
            )
          )}
          {labels.length < 3 && (
            <Typography style={{ textAlign: 'center' }} variant="caption">
              Swipe right to archive/restore, left to edit
            </Typography>
          )}
        </ScrollView>
      </View>
      <View style={styles.bottomSection}>
        <View style={[styles.toggleContainer, { backgroundColor: colors.surfaceVariant }]}>
          <Text style={[styles.toggleLabel, { color: colors.textPrimary }]}>Show Archived</Text>
          <Switch
            value={showArchived}
            onValueChange={setShowArchived}
            color={colors.switchActive}
          />
        </View>
        <Button variant="filled" color="primary" onPress={addNewLabel}>
          Add a new Category
        </Button>
      </View>
    </PageWrapper>
  )
}

const styles = StyleSheet.create({
  bottomSection: {
    marginBottom: SPACING.MEDIUM,
  },
  toggleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.MEDIUM,
    marginTop: SPACING.MEDIUM,
    paddingHorizontal: SPACING.MEDIUM,
    paddingVertical: SPACING.SMALL,
  },
  toggleLabel: {
    fontSize: 16,
  },
})

export default LabelSelect
