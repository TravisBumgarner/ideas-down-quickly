import { router, useLocalSearchParams } from 'expo-router'
import * as React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { ActivityIndicator, Icon } from 'react-native-paper'
import { useAsyncEffect } from 'use-async-effect'
import { ICONS } from '@/assets/iconlist'
import queries from '@/db/queries'
import Button from '@/shared/components/Button'
import ButtonWrapper from '@/shared/components/ButtonWrapper'
import Label from '@/shared/components/Label'
import PageWrapper from '@/shared/components/PageWrapper'
import TextInput from '@/shared/components/TextInput'
import { context } from '@/shared/context'
import { useTheme } from '@/shared/ThemeContext'
import { BORDER_WIDTH, COLORS, LABEL_COLOR_ROWS, SPACING } from '@/shared/theme'
import type { URLParams } from '@/shared/types'
import 'react-native-get-random-values'

const IdeaEdit = () => {
  const { colors: themeColors } = useTheme()
  const [labelText, setLabelText] = React.useState('')
  const { dispatch } = React.useContext(context)
  const [color, setColor] = React.useState<string>(COLORS.NEUTRAL[700])
  const [icon, setIcon] = React.useState<string>(ICONS[0])
  const [isLoading, setIsLoading] = React.useState(true)
  const [lastUsedAt, setLastUsedAt] = React.useState<string | null>(null)
  const params = useLocalSearchParams<URLParams['edit-label']>()

  useAsyncEffect(async () => {
    if (!params.labelId) {
      setIsLoading(false)
      dispatch({
        type: 'TOAST',
        payload: { message: 'Something went wrong', variant: 'ERROR' },
      })
      router.navigate('/')
      return
    }

    const label = await queries.select.labelById(params.labelId)
    setLabelText(label.text)
    setColor(label.color)
    setIcon(label.icon)
    setLastUsedAt(label.lastUsedAt)
    setIsLoading(false)
  }, [params.labelId])

  const colorScrollRef = React.useRef<ScrollView>(null)
  const iconScrollRef = React.useRef<ScrollView>(null)

  React.useEffect(() => {
    colorScrollRef.current?.flashScrollIndicators()
    iconScrollRef.current?.flashScrollIndicators()
  }, [])

  const handleCancel = React.useCallback(() => {
    router.navigate('/')
  }, [])

  const handleSubmit = React.useCallback(async () => {
    if (!params.labelId) {
      dispatch({
        type: 'TOAST',
        payload: { message: 'Something went wrong', variant: 'ERROR' },
      })
      return
    }

    await queries.update.label(params.labelId, {
      text: labelText,
      color,
      icon,
    })
    router.navigate('/')
  }, [params.labelId, labelText, color, icon, dispatch])

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ActivityIndicator animating size="large" />
      </SafeAreaView>
    )
  }

  return (
    <PageWrapper>
      <View style={styles.container}>
        <Label
          id={''}
          color={color}
          icon={icon}
          text={labelText}
          lastUsedAt={lastUsedAt}
        />
        <TextInput
          color={themeColors.border}
          value={labelText}
          onChangeText={text => setLabelText(text)}
          multiline
        />
        <View
          style={{
            borderBottomColor: themeColors.border,
            borderBottomWidth: BORDER_WIDTH.XSMALL,
            paddingBottom: SPACING.SMALL,
          }}
        >
          <ScrollView horizontal ref={colorScrollRef}>
            <View>
              {LABEL_COLOR_ROWS.map((row, rowIndex) => (
                <View key={rowIndex} style={{ flexDirection: 'row' }}>
                  {row.map(color => (
                    <TouchableOpacity
                      key={color}
                      style={{
                        margin: SPACING.XXSMALL,
                        backgroundColor: color,
                        width: 35,
                        height: 35,
                      }}
                      onPress={() => setColor(color)}
                    />
                  ))}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            paddingTop: SPACING.SMALL,
            borderBottomColor: themeColors.border,
            borderBottomWidth: BORDER_WIDTH.XSMALL,
            paddingBottom: SPACING.SMALL,
            marginBottom: SPACING.SMALL,
            flex: 1,
          }}
        >
          <ScrollView
            ref={iconScrollRef}
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            {ICONS.map(icon => (
              <TouchableOpacity
                onPress={() => setIcon(icon)}
                key={icon}
                style={{
                  width: 35,
                  height: 35,
                  margin: SPACING.XXSMALL,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Icon size={30} source={icon} color={color} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      <ButtonWrapper
        left={
          <Button color="warning" variant="link" onPress={handleCancel}>
            Cancel
          </Button>
        }
        right={
          <Button
            disabled={labelText.length === 0}
            color="primary"
            variant="filled"
            onPress={handleSubmit}
          >
            Save
          </Button>
        }
      />
    </PageWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default IdeaEdit
