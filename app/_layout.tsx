import { COLORS } from '@/constants/Colors';
import { Stack } from 'expo-router';
import React from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {ModalProvider} from "@/contexts/modalContext"
import { UserProvider } from '@/contexts/userContext';
 
export default function RootLayout() {
  
  return (
    <UserProvider>
      <ModalProvider>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerStyle: { backgroundColor: COLORS.main }, headerTintColor: COLORS.main, animation: "fade", headerShown: false}}>
            <Stack.Screen name="index" options={{ headerShown: false, animation: 'none' }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false, animation: 'none' }} />
          </Stack>
        </SafeAreaProvider>
      </ModalProvider>
    </UserProvider>
  );
}
