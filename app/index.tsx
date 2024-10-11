import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as splash from 'expo-splash-screen';
import { useUser } from '@/contexts/userContext';

splash.preventAutoHideAsync();

const SplashScreen = () => {
  const router = useRouter();
  const { user, token, setUser, setToken } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        const storedToken = await AsyncStorage.getItem("token");

        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        }

        if (storedToken && storedUser) {
          router.replace("/(home)");  // Redirect to home if both token and user are available
        } else {
          router.replace("/(auth)");  // Redirect to login if token or user is missing
        }
      } catch (error) {
        console.error("Error loading user data", error);
        router.replace("/(auth)");  // Redirect to login on error
      } finally {
        setLoading(false);  // Set loading to false once user data is loaded
        splash.hideAsync();
      }
    };

    loadUser();
  }, []);

  if (loading) {
    return null;  // Return null while loading
  }

  return (
    <View className='flex-1 flex justify-center align-items bg-[#1c1c1c]'>
      {/* You can add a loading spinner here if you'd like */}
    </View>
  );
};

export default SplashScreen;
