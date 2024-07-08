import PageWrapper from '@/shared/components/PageWrapper'
import Typography from '@/shared/components/Typography'
import * as React from 'react'
import { View } from 'react-native'

const Settings = () => {
  return (
    <PageWrapper>
      <View
        style={{
          flex: 1,
        }}
      >
        <Typography variant="h1" style={{ marginBottom: 16 }}>
          Settings
        </Typography>
      </View>
    </PageWrapper>
  )
}

export default Settings
