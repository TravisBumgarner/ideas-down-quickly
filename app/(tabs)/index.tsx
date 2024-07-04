import { db } from '@/db/client'
import { LabelsTable, SelectLabel } from '@/db/schema'
import Button from '@/shared/components/Button'
import Label from '@/shared/components/Label'
import PageWrapper from '@/shared/components/PageWrapper'
import Typography from '@/shared/components/Typography'
import { SPACING } from '@/shared/theme'
import { navigateWithParams } from '@/shared/utilities'
import { router, useFocusEffect } from 'expo-router'
import * as React from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

const LabelSelect = () => {
  const [labels, setLabels] = React.useState<SelectLabel[] | null>(null)

  useFocusEffect(
    React.useCallback(() => {
      db.select().from(LabelsTable).then(setLabels)
    }, [])
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
        </View>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper title="Continue Ideating">
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
          {labels.map(({ color, id, icon, text, lastUsedAt }, index) => (
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
                readonly={false}
                id={id}
                handlePress={() =>
                  navigateWithParams('add-idea', { labelId: id })
                }
              />
            </View>
          ))}
          {labels.length < 3 && (
            <Typography style={{ textAlign: 'center' }} variant="caption">
              Swipe left to edit
            </Typography>
          )}
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: SPACING.MEDIUM,
        }}
      >
        <Button variant="filled" color="primary" onPress={addNewLabel}>
          Add a new Category
        </Button>
      </View>
    </PageWrapper>
  )
}

export default LabelSelect
