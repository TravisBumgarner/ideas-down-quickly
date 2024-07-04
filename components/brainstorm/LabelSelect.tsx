import { db } from '@/db/client'
import { LabelsTable, SelectLabel } from '@/db/schema'
import Button from '@/shared/components/Button'
import Label from '@/shared/components/Label'
import PageWrapper from '@/shared/components/PageWrapper'
import Typography from '@/shared/components/Typography'
import { SPACING, SPACING2 } from '@/shared/theme'
import { useFocusEffect } from 'expo-router'
import * as React from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

const LabelInput = ({
  submitCallback,
  newLabelCallback,
}: {
  submitCallback: (ideaText: string) => void
  newLabelCallback: () => void
}) => {
  const [labels, setLabels] = React.useState<SelectLabel[] | null>(null)

  useFocusEffect(
    React.useCallback(() => {
      db.select().from(LabelsTable).then(setLabels)
    }, [])
  )

  const handleSubmit = React.useCallback(
    (button: string) => {
      submitCallback(button)
    },
    [submitCallback]
  )

  if (labels === null) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ActivityIndicator animating size="large" />
      </SafeAreaView>
    )
  }

  if (labels.length === 0) {
    return (
      <PageWrapper title="What's on your mind?">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <Button color="primary" variant="filled" onPress={newLabelCallback}>
            Add Your First Label
          </Button>
          <Typography
            variant="caption"
            style={{ textAlign: 'center', marginTop: SPACING.md }}
          >
            Ideas are grouped by label
          </Typography>
        </View>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper title="What's on your mind?">
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
                marginBottom: SPACING2.SMALL,
              }}
            >
              <Label
                lastUsedAt={lastUsedAt}
                color={color}
                icon={icon}
                text={text}
                readonly={false}
                id={id}
                handlePress={() => handleSubmit(id)}
              />
            </View>
          ))}
          {labels.length < 3 && (
            <Typography style={{ textAlign: 'center' }} variant="caption">
              Swipe left on label to edit
            </Typography>
          )}
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: SPACING.md,
        }}
      >
        <Button variant="filled" color="primary" onPress={newLabelCallback}>
          Something Different
        </Button>
      </View>
    </PageWrapper>
  )
}

export default LabelInput
