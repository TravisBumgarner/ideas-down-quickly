import { TabBarIcon } from '@/shared/components/TabBarIcon'
import { COLORS2 } from '@/shared/theme'
import { Tabs } from 'expo-router'
import React from 'react'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS2.NEUTRAL[800],
          borderWidth: 0,
        },
        tabBarLabelStyle: {
          color: COLORS2.NEUTRAL['300'],
        },
        tabBarActiveTintColor: COLORS2.PRIMARY['300'],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Brainstorm',
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
          title: 'History',
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
          title: 'Settings',
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
