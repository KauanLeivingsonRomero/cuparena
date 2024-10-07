import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as splash from 'expo-splash-screen';
import Logo from './assets/images/soccer.svg';


splash.preventAutoHideAsync();

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {

        const token = await AsyncStorage.getItem('token');
        
        if (token) {
          router.replace("/(home)");
        } else {
          router.replace('/(auth)');
        }
      } catch (error) {
        console.error('Erro ao verificar token:', error);
        router.replace('/(auth)');
      }
    };

    checkAuth();
  }, []);

  return null;
};

export default SplashScreen;