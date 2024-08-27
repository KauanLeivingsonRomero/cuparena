import React, { useState } from 'react';
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyRound, User } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Link } from 'expo-router';


export default function Login(){
  const teste = () => {
    console.log(email)
    console.log(password)
  }
 
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    
      <View className='flex h-screen bg-off-black '>   
        <View className='flex h-1/2'>
          <ImageBackground 
              source={require("@/assets/images/stadium_gradient_bottom-transformed.png")}   
              className='h-full w-full'    
              resizeMode='contain'   
            >
              <Animated.View entering={FadeInUp.duration(1000)}  className='h-full flex items-center justify-end gap-2'>
                <Text  className='text-off-white text-4xl font-thin'>Sua vitória</Text>
                <Text  className='text-off-white text-4xl font-thin'>começa aqui</Text>
              </Animated.View>
            </ImageBackground>  
        </View>         
        <View className='flex h-full bg-off-black items-center pt-5'>
          <Text className='flex self-start text-off-white text-2xl pl-5 mb-2'>Login</Text>
          <View className='w-3/4 h-12 border-2 border-green rounded-xl text-gray flex justify-start flex-row  text-center items-center pl-2 mt-1'>
            <User className='text-gray '/>
            <TextInput className='pl-1 w-full h-full text-white items-center' placeholderTextColor={COLORS.gray} placeholder="Email" value={email} onChangeText={setEmail}/>
          </View> 
          <View className='w-3/4 h-12 border-2 border-green rounded-xl text-gray flex justify-start flex-row  text-center items-center pl-2 mt-3'>
            <KeyRound className='text-gray '/>
            <TextInput className='pl-1 w-full h-full text-white items-center' placeholderTextColor={COLORS.gray} placeholder="Senha" value={password} onChangeText={setPassword} />
          </View>
          <View className="mt-5 flex w-full  justify-center items-center">
            <TouchableOpacity className='w-32 h-11 flex justify-center items-center rounded-xl  bg-green'   onPress={teste}>
              <Text className='text-off-white text-xl'>Entrar</Text>
            </TouchableOpacity>
            <Text className='text-off-white mt-1'>Não possui conta ? <Link className='text-green' href="/register">Cadastrar</Link></Text>
          </View>
          
                  
        </View>    
         
      </View>
  );
}

