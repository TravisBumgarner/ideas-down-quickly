import { StyleSheet, View } from 'react-native'
import { Text, TextInput as TextInputRNP } from 'react-native-paper'

import { useTheme } from '../ThemeContext'
import { BORDER_WIDTH, COLORS, SPACING } from '../theme'

type Props = {
  label?: string
  value: string
  onChangeText: (text: string) => void
  multiline?: boolean
  color: string
  autoFocus?: boolean
  maxLines?: number
}

const LINE_HEIGHT = 36 // Approximate line height for fontSize 24

const TextInput: React.FC<Props> = ({
  multiline,
  label,
  value,
  onChangeText,
  color,
  autoFocus,
  maxLines,
}) => {
  const { colors } = useTheme()
  const maxHeight = maxLines ? maxLines * LINE_HEIGHT : undefined

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: colors.textDisabled }]}>{label}</Text>}
      <TextInputRNP
        onChangeText={onChangeText}
        value={value}
        mode="flat"
        multiline={multiline}
        style={StyleSheet.flatten([
          styles.textInput,
          { backgroundColor: COLORS.MISC.TRANSPARENT },
          maxHeight ? { maxHeight } : {},
        ])}
        textColor={colors.textSecondary}
        autoFocus={autoFocus} //eslint-disable-line
        underlineStyle={{
          borderColor: color,
          borderWidth: BORDER_WIDTH.XSMALL,
        }}
        scrollEnabled={!!maxLines}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingVertical: SPACING.MEDIUM,
  },
  label: {
    paddingBottom: SPACING.MEDIUM,
  },
  textInput: {
    borderRadius: 10,
    fontSize: 24,
    paddingHorizontal: 0,
  },
})

export default TextInput
