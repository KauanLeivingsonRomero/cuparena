import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Button, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// import { Container } from './styles';

const Profile = () => {

  async function clearStorage(){
    await AsyncStorage.clear()
    .then(() => {
      console.log("clear storage")
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      router.replace("/(auth)")
    })
  }

  // useEffect(() => {clearStorage()},[])

  return(
    <SafeAreaView className='flex-1 flex'>
      <ScrollView>
        <Text>Profile</Text> 
        <Button title='Clear token' color="#f00" onPress={clearStorage}/>    
      </ScrollView>
    </SafeAreaView>
  );
}

export default Profile;