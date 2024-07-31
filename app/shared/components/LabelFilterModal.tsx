import { SelectLabel } from '@/db/schema'
import * as React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Modal, Portal } from 'react-native-paper'

import { COLORS, SPACING } from '../theme'
import Button from './Button'
import ButtonWrapper from './ButtonWrapper'
import Label from './Label'

type Props = {
  filterLabelList: SelectLabel[]
  onSubmit: (id: string) => void
  onCancel: () => void
  isModalVisible: boolean
}

const LabelFilterModal: React.FC<Props> = ({
  filterLabelList,
  onCancel,
  onSubmit,
  isModalVisible,
}) => {
  return (
    <Portal>
      <Modal
        contentContainerStyle={styles.modalContainer}
        visible={isModalVisible}
        onDismiss={onCancel}
      >
        <GestureHandlerRootView>
          <ScrollView>
            {filterLabelList.map(
              ({ color, id, icon, text, lastUsedAt }, index) => (
                <View
                  key={index}
                  style={{
                    marginBottom: SPACING.SMALL,
                  }}
                >
                  <Label
                    disableSideSwipe
                    lastUsedAt={lastUsedAt}
                    color={color}
                    icon={icon}
                    text={text}
                    id={id}
                    handlePress={() => onSubmit(id)}
                  />
                </View>
              )
            )}
          </ScrollView>
          <ButtonWrapper
            full={
              <Button variant="link" color="warning" onPress={onCancel}>
                Cancel
              </Button>
            }
          />
        </GestureHandlerRootView>
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.NEUTRAL[700],
    flex: 1,
    height: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.MEDIUM,
    paddingTop: SPACING.MEDIUM,
    width: '100%',
  },
})

export default LabelFilterModal
