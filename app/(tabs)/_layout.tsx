import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/shared/navigation/TabBarIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Brainstorm',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'bulb-sharp' : 'bulb-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'list-circle-sharp' : 'list-circle-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="debug"
        options={{
          title: 'Debug',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'bug' : 'bug-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
