import { TabBarIcon } from '@/shared/components/TabBarIcon'
import { COLORS } from '@/shared/theme'
import { Tabs } from 'expo-router'
import React from 'react'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.NEUTRAL[800],
          borderWidth: 0,
        },
        tabBarLabelStyle: {
          color: COLORS.NEUTRAL['300'],
        },
        tabBarActiveTintColor: COLORS.PRIMARY['300'],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ideate',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              isFocused={focused}
              name={focused ? 'bulb-sharp' : 'bulb-outline'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Reflect',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              isFocused={focused}
              name={focused ? 'list-circle-sharp' : 'list-circle-outline'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Debug',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              isFocused={focused}
              name={focused ? 'bug' : 'bug-outline'}
            />
          ),
        }}
      />
    </Tabs>
  )
}
