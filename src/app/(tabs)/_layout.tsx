import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function TabLayout() {
  const colors = useThemeColor();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="catched"
        options={{
          title: 'Catched',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'save' : 'save-outline'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
