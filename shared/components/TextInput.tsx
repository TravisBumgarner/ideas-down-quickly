import { StyleSheet, View } from 'react-native'
import { Text, TextInput as TextInputRNP } from 'react-native-paper'

import { COLORS, SPACING } from '../theme'

type Props = {
  label?: string
  value: string
  onChangeText: (text: string) => void
  multiline?: boolean
  color: string
  borderWidth?: number
}

const TextInput: React.FC<Props> = ({
  multiline,
  label,
  value,
  onChangeText,
  color,
  borderWidth,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInputRNP
        onChangeText={onChangeText}
        value={value}
        mode="flat"
        selectTextOnFocus
        multiline={multiline}
        style={StyleSheet.flatten([
          styles.textInput,
          { backgroundColor: COLORS.MISC.TRANSPARENT },
        ])}
        underlineStyle={{
          borderColor: color,
          borderWidth: borderWidth || 1,
        }}
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
    color: COLORS.NEUTRAL[400],
    paddingBottom: SPACING.MEDIUM,
  },
  textInput: {
    borderRadius: 10,
    fontSize: 24,
    paddingHorizontal: 0,
  },
})

export default TextInput
