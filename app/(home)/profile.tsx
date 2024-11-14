import { COLORS } from '@/constants/Colors';
import { useUser } from '@/contexts/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';
import profileBackground from '../../assets/images/profileBackground.png';

import React, { useEffect } from 'react';
import { RefreshControl, ScrollView, Text, View, ImageBackground, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from '@/components/modal';
import { LogOut, MessageSquareText, Star, TicketCheck, Trophy, UserRoundPlus, UsersRound, WalletMinimal } from 'lucide-react-native';

const Profile = () => {

  const router = useRouter();
  const { user, loadUser } = useUser();

  const logOut = async () => {
    await AsyncStorage.clear();
    router.replace("/(auth)");
    console.log("clear storage");
  };

  const settings = [
    {id: 1, name: "Adicionar saldo", icon: <WalletMinimal className='text-zinc-600' />, route: "/(home)/"},
    {id: 2, name: "Mensagens", icon: <MessageSquareText className='text-zinc-600' />, route: "/(home)/"},
    {id: 3, name: "Convidar amigos", icon: <UserRoundPlus className='text-zinc-600' />, route: "/(home)/"},
    {id: 4, name: "Novo time", icon: <UsersRound className='text-zinc-600' />, route: "/(home)/"},
    {id: 5, name: "Sair", icon: <LogOut className='text-zinc-600' />, route: 'logout'}
  ];

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

  // Refresh control callback
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadUser();
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        refreshControl={
          <RefreshControl colors={[COLORS.green]} refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ImageBackground source={profileBackground} className="w-full h-[300px] flex justify-end items-center">
          <View className='flex flex-col items-center justify-self-end'>
            <View className='w-28 h-28 rounded-full bg-green flex justify-center items-center'>
              <Image
                className='w-[104px] h-[104px] rounded-full bg-white'
                source={{ uri: user?.user_profilePicture }} 
                resizeMode='cover'
              />
            </View>
            <Text className='text-xl text-white'>{user?.user_name}</Text>
          </View>
          <View className="w-full p-5 rounded-lg mb-[-20px]">
            <Modal>
              <View className='flex flex-row gap-3 justify-around p-2'>
                <View className='flex flex-col w-1/3 pl-2'>
                  <Star className='text-yellow-300'/>
                  <Text className='font-bold'>11.200</Text>
                  <Text className='font-thin'>pontos</Text>
                </View>
                <View className='w-[1px] bg-zinc-300'></View>
                <View className='flex flex-col w-1/3 pl-2'>
                  <TicketCheck className='text-blue-300' />
                  <Text className='font-bold'>4 jogos</Text>
                  <Text className='font-thin'>em campo</Text>
                </View>
                <View className='w-[1px] bg-zinc-300'></View>
                <View className='flex flex-col w-1/3 pl-2'>
                  <Trophy className='text-green' />
                  <Text className='font-bold'>44 vitórias</Text>
                  <Text className='font-thin'>participados</Text>
                </View>
              </View>
            </Modal>
          </View>
        </ImageBackground>
        <View className="flex p-5 w-full">
          {settings.map(({id, name, icon, route}) => 
            route === 'logout' ? (
              <Pressable key={id} onPress={logOut}>
                <View className='flex flex-row gap-2 justify-start items-center mt-7'>
                  {icon}
                  <View className='border-b-[1px] border-b-zinc-600 w-full'>
                    <Text className='text-lg'>{name}</Text>
                  </View>
                </View>
              </Pressable>
            ) : (
              // @ts-ignore
              <Link key={id} href={route} asChild>
                <Pressable>
                  <View className='flex flex-row gap-2 justify-start items-center mt-7'>
                    {icon}
                    <View className='border-b-[1px] border-b-zinc-600 w-full'>
                      <Text className='text-lg'>{name}</Text>
                    </View>
                  </View>
                </Pressable>
              </Link>
            )
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Profile;
