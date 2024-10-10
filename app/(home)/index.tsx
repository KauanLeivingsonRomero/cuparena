import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  useEffect(() => {
    const token = AsyncStorage.getItem("token")
    if(!token){
      router.replace("/(auth)")
    }
  },[])

  return(
    <SafeAreaView className='flex-1 flex'>
      <ScrollView>
        <Text>Home</Text>     
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;