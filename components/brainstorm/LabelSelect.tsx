import { db } from '@/db/client'
import { LabelsTable, SelectLabel } from '@/db/schema'
import Button from '@/shared/components/Button'
import Label from '@/shared/components/Label'
import PageWrapper from '@/shared/components/PageWrapper'
import Typography from '@/shared/components/Typography'
import { SPACING } from '@/shared/theme'
import * as React from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import { ActivityIndicator, useTheme } from 'react-native-paper'

const LabelInput = ({
  submitCallback,
  newLabelCallback,
}: {
  submitCallback: (ideaText: string) => void
  newLabelCallback: () => void
}) => {
  const [labels, setLabels] = React.useState<SelectLabel[] | null>(null)
  const theme = useTheme()

  React.useEffect(() => {
    db.select().from(LabelsTable).then(setLabels)
  }, [])

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
      <PageWrapper
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          margin: SPACING.md,
        }}
      >
        <Button variant="primary" onPress={newLabelCallback}>
          Add Your First Label
        </Button>
        <Typography
          variant="body1"
          style={{ textAlign: 'center', marginTop: SPACING.md }}
        >
          Labels are used to group ideas.
        </Typography>
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
        <Typography variant="h1">Select a Label</Typography>
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'flex-start',
          }}
          style={{
            flex: 1,
          }}
        >
          {labels.map(({ color, id, icon, text }, index) => (
            <View
              key={index}
              style={{
                width: '100%',
                paddingLeft: SPACING.md,
                paddingRight: SPACING.md,
                paddingBottom: SPACING.sm,
                paddingTop: SPACING.sm,
              }}
            >
              <Label
                color={color}
                icon={icon}
                text={text}
                readonly={false}
                handlePress={() => handleSubmit(id)}
              />
            </View>
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginRight: SPACING.md,
          marginLeft: SPACING.md,
          marginBottom: SPACING.md,
        }}
      >
        <Button variant="primary" onPress={newLabelCallback}>
          Add New Label
        </Button>
      </View>
    </PageWrapper>
  )
}

export default LabelInput
