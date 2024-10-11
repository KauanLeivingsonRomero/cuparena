import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as splash from 'expo-splash-screen';


splash.preventAutoHideAsync();

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("token")
        const user = await AsyncStorage.getItem("user") 
        if (token && user) {
          router.replace("/(home)");
        } else {
          router.replace('/(auth)');
        }
      } catch (error) {
        console.error(error);
        router.replace('/(auth)');
      } finally{
        splash.hideAsync();
      }
    };

    checkAuth();
  }, [router]);

  return (
    <View className='flex-1 flex justify-center align-items bg-[#1c1c1c]'>

    </View>
  );
};

export default SplashScreen;