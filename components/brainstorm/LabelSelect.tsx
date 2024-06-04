import { BORDER_RADIUS, SPACING } from '@/app/theme';
import * as React from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-paper';

const buttons = [
  { title: 'Home', icon: 'home', backgroundColor: '#ff5722' },
  { title: 'Profile', icon: 'account', backgroundColor: '#3f51b5' },
];

const LabelInput = ({
  submitCallback,
  cancelCallback,
  newLabelCallback,
}: {
  submitCallback: (ideaText: string) => void;
  cancelCallback: () => void;
  newLabelCallback: () => void;
}) => {
  const handleCancel = React.useCallback(() => {
    cancelCallback();
  }, [cancelCallback]);

  const handleSubmit = React.useCallback(
    (button: string) => {
      submitCallback(button);
    },
    [submitCallback]
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 20,
        }}
        style={{
          flex: 1,
        }}
      >
        {buttons.map((button, index) => (
          <View
            key={index}
            style={{
              borderRadius: 5,
              width: '100%',
              padding: SPACING.sm,
              flex: 1,
            }}
          >
            <Button
              icon={() => <Icon source={button.icon} size={24} color="#fff" />}
              mode="contained"
              buttonColor={button.backgroundColor}
              onPress={() => handleSubmit(button.title)}
              style={{ borderRadius: BORDER_RADIUS.md }}
            >
              {button.title}
            </Button>
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
        <Button style={{ flex: 1 }} mode="contained" onPress={newLabelCallback}>
          Add New Label
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default LabelInput;
