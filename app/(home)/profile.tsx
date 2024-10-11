import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

import React from 'react';
import { Button, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// import { Container } from './styles';

const Profile = () => {

  const router = useRouter()

  async function clearToken(){
    await AsyncStorage.clear()
    router.replace("/(auth)")
    console.log("Clear storage")
  }

  return(
    <SafeAreaView className='flex-1 flex'>
      <ScrollView>
        <Text>Profile</Text>
        <Button title="clear storage" color={"red"} onPress={clearToken} />     
      </ScrollView>
    </SafeAreaView>
  );
}

export default Profile;