import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const [showToken, setShowToken] = useState<string | null>("")

  useEffect(() => {
    const token = AsyncStorage.getItem("token")
    if(!token){
      router.replace("/(auth)")
    }
  },[])

  async function token (){
    const token = await AsyncStorage.getItem("token")
    setShowToken(token)
    console.log(token)
  }

  async function clearToken(){
    await AsyncStorage.removeItem("token")
    console.log("Remove token")
    router.replace("/(auth)")
  }


  return(
    <SafeAreaView className='flex-1 flex'>
      <Text>Home</Text>      
      <Button title='token' onPress={token}/>
      <Text className='text-black'>{showToken}</Text>
      <Button title='clear token' color={"#f00"} onPress={clearToken}/>
    </SafeAreaView>
  );
}

export default Home;