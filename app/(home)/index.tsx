import { useUser } from '@/contexts/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, ScrollView, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {

  const {user} = useUser()

  console.log(user?.profilePicture)

  useEffect(() => {
    const token = AsyncStorage.getItem("token")
    if(!token){
      router.replace("/(auth)")
    }
  },[])


  return(
    <SafeAreaView className='flex-1 flex'>
      <View className='bg-main_black w-screen h-24 '>
        <View className='flex flex-row w-25 h-25'>
          <View className='w-25 h-25'>
            {/* <Image className='w-full h-full' source={{uri: user?.profilePicture}} /> */}
          </View>.
          <Text className='text-white'>Ola, {user?.name.split(" ")[0]}</Text>
        </View>
      </View>
      <ScrollView>
        {/* <Text>Home</Text>         */}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;