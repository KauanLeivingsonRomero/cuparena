import { UserProvider, useUser } from '@/contexts/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, Link } from 'expo-router';
import { Bell } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Text, ScrollView, View, Image, TouchableOpacity, RefreshControl, Button, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from './../../components/carousel';
import { COLORS } from '@/constants/Colors';
import Card from '@/components/card';

const Home = () => {

  const {user, loadUser} = useUser();

  const [active] = useState(true)
  
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/(auth)");
      }
    };
    checkToken();
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);

  // Load all content on the page
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    loadUser()
    setRefreshing(false);
    
  }, []);

  return (
    <SafeAreaView className='flex-1'>
      <ScrollView 
      refreshControl={
        <RefreshControl colors={[COLORS.green]} refreshing={refreshing} onRefresh={onRefresh} />
      }
      >
        <View>
          <View className='w-screen bg-main-black pl-5 pr-5 pt-5 flex flex-row justify-between items-center'>
            <View className='flex flex-row items-center'>
              <View className='w-14 h-14 rounded-full bg-green flex justify-center items-center'>
                <Link href="/profile" asChild> 
                  <Pressable>
                    <Image                 
                        className='w-12 h-12 rounded-full bg-white'     
                        source={{ uri: user?.user_profilePicture }} 
                        resizeMode='cover'
                      />
                  </Pressable>       
                </Link>
              </View>
              <Text className='text-white ml-2 font-bold text-lg'>Olá, <Text className='font-thin'>{user?.user_name.split(" ")[0]}</Text></Text>     
            </View>
            <View>              
              <TouchableOpacity className='rounded-full'>
                <Bell color={"#fff"} size={30}/>
                {active ? <View className='w-2 h-2 rounded-full absolute top-0 right-0' /> : null }
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Carousel />
        <View className='p-5'>
          {user?.team_id ? 
            <></> 
          :             
            <Card/>
          }
          <Text>Heelo</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;
