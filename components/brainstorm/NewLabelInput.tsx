import * as React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { TextInput, Button, Text, Icon } from 'react-native-paper';
import { SPACING } from '@/app/theme';

const COLORS = [
  '#ff5722',
  '#3f51b5',
  '#009688',
  '#ff9800',
  '#795548',
  '#607d8b',
  '#9c27b0',
  '#e91e63',
  '#03a9f4',
  '#00bcd4',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
];

const ICONS = [
  'home',
  'account',
  'account-group',
  'account-heart',
  'account-multiple',
  'account-multiple-check',
  'account-multiple-minus',
  'account-multiple-outline',
  'account-multiple-plus',
  'account-multiple-remove',
  'account-off',
  'account-outline',
  'account-plus',
  'account-remove',
  'account-search',
  'account-star',
  'account-supervisor',
  'account-supervisor-circle',
  'account-switch',
  'adjust',
  'air-conditioner',
  'airballoon',
  'airplane',
  'airplane-landing',
  'airplane-off',
  'airplane-takeoff',
  'alarm',
  'alarm-bell',
  'alarm-check',
  'alarm-light',
  'alarm-multiple',
  'alarm-note',
  'alarm-off',
  'alarm-plus',
  'alarm-snooze',
  'album',
  'alert',
];

const IdeaInput = ({
  submitCallback,
  cancelCallback,
}: {
  submitCallback: (ideaText: string) => void;
  cancelCallback: () => void;
}) => {
  const [labelText, setLabelText] = React.useState('');

  const handleCancel = React.useCallback(() => {
    setLabelText('');
    cancelCallback();
  }, [cancelCallback]);

  const handleSubmit = React.useCallback(() => {
    setLabelText('');
    submitCallback(labelText);
  }, [submitCallback, labelText]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TextInput
        style={{ flex: 1, margin: SPACING.md }}
        label="Create a label"
        value={labelText}
        onChangeText={text => setLabelText(text)}
        multiline
      />
      <Text>Choose a color:</Text>
      <ScrollView horizontal style={{ flexDirection: 'row' }}>
        {COLORS.map(color => (
          <View
            key={color}
            style={{
              margin: SPACING.sm,
              backgroundColor: color,
              width: 50,
              height: 50,
            }}
          ></View>
        ))}
      </ScrollView>
      <Text>Choose an icon:</Text>
      <ScrollView horizontal style={{ flexDirection: 'row' }}>
        {ICONS.map(icon => (
          <View key={icon} style={{ width: 50, height: 50 }}>
            <Icon size={32} source={icon} />
          </View>
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          marginRight: SPACING.md,
          marginLeft: SPACING.md,
          marginBottom: SPACING.md,
        }}
      >
        <Button style={{ flex: 1 }} mode="outlined" onPress={handleCancel}>
          Back
        </Button>
        <Button style={{ flex: 1 }} mode="contained" onPress={handleSubmit}>
          Create
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default IdeaInput;
