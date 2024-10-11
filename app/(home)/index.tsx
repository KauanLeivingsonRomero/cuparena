import { useUser } from '@/contexts/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {

  const {user} = useUser()
  
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token")
      if(!token){
        router.replace("/(auth)")
      }
    }
    checkToken()
  },[])

  return(
    <SafeAreaView className='flex-1 flex'>
      <ScrollView>
        <Text>Home {user?.name.split(" ")[0]}</Text>     
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;