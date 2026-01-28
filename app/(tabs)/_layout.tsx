import { Tabs } from 'expo-router'
import { TabBarIcon } from '@/shared/components/TabBarIcon'
import { useTheme } from '@/shared/ThemeContext'

export default function TabLayout() {
  const { colors } = useTheme()
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderWidth: 0,
        },
        tabBarLabelStyle: {
          color: colors.tabBarLabel,
        },
        tabBarActiveTintColor: colors.tabBarActive,
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
          title: 'Settings',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              isFocused={focused}
              name={focused ? 'settings-sharp' : 'settings-outline'}
            />
          ),
        }}
      />
    </Tabs>
  )
}
