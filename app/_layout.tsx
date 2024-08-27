import { COLORS } from '@/constants/Colors';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({Inter: require("../assets/fonts/Inter-regular.ttf")});

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    
    <Stack 
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.main
        },
        headerTintColor: COLORS.main,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false, animation: 'none' }} />
      <Stack.Screen name="register" options={{ headerShown: false, animation: 'none' }} />
    </Stack>
  );
}
