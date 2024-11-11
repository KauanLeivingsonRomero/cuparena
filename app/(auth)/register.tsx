import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyRound, Mail, User } from 'lucide-react-native';
import { COLORS } from '@/constants/Colors';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Link } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { response } from '@/types/authResponse';

const schema = z.object({
  name: z.string({required_error: "Insira um nome"}).min(2, { message: "O nome precisa de pelo menos 2 caracteres" }),
  email: z.string({required_error: "Insira um email"}).email({ message: "Email inválido" }),
  password: z.string({required_error: "Insira uma senha"}).min(6, { message: "A senha precisa de pelo menos 6 dígitos" })
});

export default function Register() {

  const { control, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema)
  });

  const route = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setLoading(true)
    await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/register`, {
      name: data.name,
      email: data.email,
      password: data.password
    })    
    .then(async (res: response) => {
      console.log('Success response:', res.data);
      route.replace('/(home)')
      await AsyncStorage.setItem("token", res.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
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
    }).finally(() => {
      setLoading(false)
    });
  }

  useEffect(() => {
    setTimeout(() => {
      if(errorMessage != ""){
        setErrorMessage("")
      }
    },Number(process.env.EXPO_PUBLIC_ERROR_TIMEOUT))    
  },[onSubmit])

  return (
    <View className='flex h-full bg-off-black pb-4'>
      <View className='flex h-1/2'>
        <ImageBackground
          source={require("@/assets/images/stadium_gradient_bottom-transformed.png")}
          className='h-full w-full'
          resizeMode='cover'
        >
          <Animated.View entering={FadeInUp.duration(1000)} className='h-full flex items-center justify-end gap-2'>
            <Text className='text-off-white text-4xl font-thin'>Já está criando</Text>
            <Text className='text-off-white text-4xl font-thin'>sua história?</Text>
          </Animated.View>
        </ImageBackground>
      </View>
      <ScrollView>
      <View className='flex h-full bg-off-black items-center pt-5'>
        <Text className='flex self-start text-off-white text-2xl pl-5 mb-2'>Cadastrar</Text>

        <View className='w-3/4 h-12 border-2 border-green rounded-xl text-gray flex justify-start flex-row text-center items-center pl-2 mt-1'>
          <User className='text-gray' />
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className='pl-1 w-full h-full text-white items-center'
                placeholderTextColor={COLORS.gray}
                placeholder="Nome"
                value={value}
                onChangeText={onChange}
                autoCapitalize='words'
              />
            )}
          />
        </View>
        {errors.name && <Animated.Text entering={FadeInUp.duration(400)} exiting={FadeInUp.duration(400)} className='text-red-500 pt-2'>{String(errors.name.message)}</Animated.Text>}

        <View className='w-3/4 h-12 border-2 border-green rounded-xl text-gray flex justify-start flex-row text-center items-center pl-2 mt-3'>
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
                autoCapitalize='none'
                autoComplete='email'
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
                secureTextEntry
                value={value}
                onChangeText={onChange}
                autoCapitalize='none'
              />
            )}
          />
        </View>
        {errors.password && <Animated.Text entering={FadeInUp.duration(400)} exiting={FadeInUp.duration(400)} className='text-red-500 pt-2'>{String(errors.password.message)}</Animated.Text>}
        {errorMessage && <Animated.Text entering={FadeInUp.duration(200)} className='text-red-500 pt-2'>{errorMessage}</Animated.Text>}

        <View className="mt-5 flex w-full justify-center items-center">
          <TouchableOpacity className='w-32 h-11 flex justify-center items-center rounded-xl bg-green' onPress={handleSubmit(onSubmit)}>
          {loading ? 
            <>
              <ActivityIndicator size="large" color="#fff"/>
            </> : 
            <>
              <Text className='text-off-white text-xl'>Cadastrar</Text>
            </>
            }
          </TouchableOpacity>
          <Text className='text-off-white mt-1'>Já possui conta? <Link className='text-green' href="/">Entrar</Link></Text>
        </View>
      </View>
      </ScrollView>
    </View>
  );
}
