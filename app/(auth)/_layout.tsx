import { COLORS } from '@/constants/Colors';
import { Stack } from 'expo-router';
import React from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ animation: "fade", headerShown: false}}>
        <Stack.Screen name="index" options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name="register" options={{ headerShown: false, animation: 'none' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
