import { StyleSheet, View } from 'react-native'
import { Text, TextInput as TextInputRNP } from 'react-native-paper'

import { COLORS2, SPACING2 } from '../theme'

type Props = {
  label: string
  value: string
  onChangeText: (text: string) => void
  multiline?: boolean
  color: string
}

const TextInput: React.FC<Props> = ({
  multiline,
  label,
  value,
  onChangeText,
  color,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInputRNP
        onChangeText={onChangeText}
        value={value}
        mode="flat"
        multiline={multiline}
        style={StyleSheet.flatten([
          styles.textInput,
          { backgroundColor: COLORS2.MISC.TRANSPARENT },
        ])}
        underlineStyle={{
          borderColor: color,
          borderWidth: 1,
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: SPACING2.MEDIUM,
  },
  label: {
    color: COLORS2.NEUTRAL[400],
    paddingBottom: SPACING2.MEDIUM,
  },
  textInput: {
    borderRadius: 10,
    fontSize: 24,
    paddingHorizontal: 0,
  },
})

export default TextInput
