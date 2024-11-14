import { Tabs } from 'expo-router';
import { CalendarCheck2, Home, Plus } from 'lucide-react-native';
import React, { useContext } from 'react';
import { StatusBar, TouchableOpacity, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { ModalContext } from '@/contexts/modalContext';

export default function HomeLayout() {

  const {isOpen, setIsOpen} = useContext(ModalContext)
  const rotation = useSharedValue(0)

  const handlePressMoreContent = () => {
    setIsOpen(!isOpen)
    rotation.value = withTiming(isOpen ? 0 : -135, {
      duration: 300,
      easing: Easing.inOut(Easing.ease)
    })
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return ( 
    <>  
      <StatusBar backgroundColor={"#1C1C1C"}/>
      <Tabs initialRouteName='profile' screenOptions={({ route }) => ({      
        tabBarIcon: ({ focused }) => {
          let icon;
          let IconComponent;
          
          switch (route.name) {
            case 'index':
              IconComponent = Home;
              icon = <IconComponent color={'#fff'} />;
              break;
            case 'matches':
              IconComponent = CalendarCheck2;
              icon = <IconComponent color={'#fff'} />;
              break;
            case 'moreContent':
              icon = (
                <TouchableOpacity onPress={handlePressMoreContent} activeOpacity={1}>
                  <Animated.View style={[{ width: 40, height: 40, backgroundColor: '#fff', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }, animatedStyle]}>
                    <Plus color="#000"/>
                  </Animated.View>
                </TouchableOpacity>
              );
              break;
            case 'team':
              icon = (
                <FontAwesome name="soccer-ball-o" size={24} color={'white'} />
              );
              break;
            case 'profile':
              icon = <Feather name="user" size={26} color={'white'} />;
              break;
            default:
              icon = null;
          }

          return (
            <View style={{ alignItems: 'center' }}>
              {icon}
              {focused && route.name != "moreContent" && (
                <View style={{ height: 2, backgroundColor: '#46FF6F', width: 20, marginTop: 4 }} />
              )}
            </View>
          );
        },
        tabBarStyle: { 
          position: 'absolute', 
          height: 60, 
          justifyContent: 'center', 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: 0, 
          width: '100%', 
          backgroundColor: '#1C1C1C' 
        },
        tabBarShowLabel: false
      })}>
        <Tabs.Screen name="index" options={{ headerShown: false }} />
        <Tabs.Screen name="matches" options={{ headerShown: false }} />
        <Tabs.Screen name="moreContent" options={{ headerShown: false }} />
        <Tabs.Screen name="team" options={{ headerShown: false }} />
        <Tabs.Screen name="profile" options={{ headerShown: false }} />
      </Tabs>
    </> 
  );
}
