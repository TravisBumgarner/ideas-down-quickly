import * as React from 'react';
import { SafeAreaView, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { SPACING } from '@/app/theme';

// TODO - Make background color, title, and icon, be that project.

const IdeaInput = ({
  submitCallback,
  cancelCallback,
  labelUUID,
}: {
  submitCallback: (ideaText: string) => void;
  cancelCallback: () => void;
  labelUUID: string;
}) => {
  const [ideaText, setIdeaText] = React.useState('');

  const handleCancel = React.useCallback(() => {
    setIdeaText('');
    cancelCallback();
  }, [cancelCallback]);

  const handleSubmit = React.useCallback(() => {
    setIdeaText('');
    submitCallback(ideaText);
    console.log('submitting', labelUUID);
  }, [submitCallback, ideaText, labelUUID]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TextInput
        style={{ flex: 1, margin: SPACING.md }}
        label="Spill it..."
        value={ideaText}
        onChangeText={text => setIdeaText(text)}
        multiline
      />
      <View
        style={{
          flexDirection: 'row',
          marginRight: SPACING.md,
          marginLeft: SPACING.md,
          marginBottom: SPACING.md,
        }}
      >
        <Button style={{ flex: 1 }} mode="outlined" onPress={handleCancel}>
          Clear
        </Button>
        <Button style={{ flex: 1 }} mode="contained" onPress={handleSubmit}>
          Submit
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default IdeaInput;
