import React, { useEffect, useState } from 'react';
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyRound, Mail } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Link, useRouter } from 'expo-router';
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import axios from "axios";

const schema = z.object({
  email: z.string({required_error: "Insira seu email"})
          .email({message: "Email inválido"})
          .min(1, {message: "O email é obrigatório"}),

  password: z.string({required_error: "Insira sua senha"})
             .min(6, {message: "Senha muito curta"})
})

export default function Login(){
  
  const { control, handleSubmit, formState: { errors }} = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema)
  })

  const route = useRouter()

  const [errorMessage, setErrorMessage] = useState<string>("")

  const onSubmit = async (data: z.infer<typeof schema>) => {
    await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/login`, {
      email: data.email,
      password: data.password
    })    
    .then((res) => {
      console.log('Success response:', res.data);
      route.push('/home')
    })
    .catch((error) => {
      if (error.response) {
        console.log('Error response:', error.response.data);
        setErrorMessage(error.response.data.message)
      } else if (error.request) {
        console.log('Error request:', error.request);
        setErrorMessage("Erro interno do servidor code(500)")
      } else {
        console.log('Error message:', error.message);
      }
    });
    
  };

  useEffect(() => {
    setTimeout(() => {
      if(errorMessage != ""){
        setErrorMessage("")
      }
    },5000)    
  },[onSubmit])

  return (
    <View className='flex h-screen bg-off-black '>   
      <View className='flex h-1/2'>
        <ImageBackground 
            source={require("@/assets/images/stadium_gradient_bottom-transformed.png")}   
            className='h-full w-full'    
            resizeMode='contain'   
          >
            <Animated.View entering={FadeInUp.duration(1000)}  className='h-full flex items-center justify-end gap-2'>
              <Text className='text-off-white text-4xl font-thin'>Sua vitória</Text>
              <Text className='text-off-white text-4xl font-thin'>começa aqui</Text>
            </Animated.View>
          </ImageBackground>  
      </View>         
      <View className='flex h-full bg-off-black items-center pt-5'>
        <Text className='flex self-start text-off-white text-2xl pl-5 mb-2'>Login</Text>
        <View className='w-3/4 h-12 border-2 border-green rounded-xl text-gray flex justify-start flex-row text-center items-center pl-2 mt-1'>
          <Mail className='text-gray' />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className='pl-1 w-full h-full text-white items-center'
                placeholderTextColor={COLORS.gray}
                placeholder="Email"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </View>        
        {errors.email && <Animated.Text entering={FadeInUp.duration(400)} exiting={FadeInUp.duration(400)} className='text-red-500 pt-2'>{String(errors.email.message)}</Animated.Text>}
        
        <View className='w-3/4 h-12 border-2 border-green rounded-xl text-gray flex justify-start flex-row text-center items-center pl-2 mt-3'>
          <KeyRound className='text-gray' />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className='pl-1 w-full h-full text-white items-center'
                placeholderTextColor={COLORS.gray}
                placeholder="Senha"
                value={value}
                onChangeText={onChange}
                secureTextEntry={true} 
              />
            )}
          />
        </View>
        
          {errors.password && <Animated.Text entering={FadeInUp.duration(200)} exiting={FadeInUp.duration(200)} className='text-red-500 pt-2'>{String(errors.password.message)}</Animated.Text>}
        
          {errorMessage && <Animated.Text entering={FadeInUp.duration(200)} className='text-red-500 pt-2'>{errorMessage}</Animated.Text>}
        
        
        
        <View className="mt-3 flex w-full justify-center items-center">
          <TouchableOpacity className='w-32 h-11 flex justify-center items-center rounded-xl bg-green' onPress={handleSubmit(onSubmit)}>
            <Text className='text-off-white text-xl'>Entrar</Text>
          </TouchableOpacity>
          <Text className='text-off-white mt-1'>Não possui conta ? <Link className='text-green' href="/register">Cadastrar</Link></Text>
        </View>
      </View>    
    </View>
  );
}
