import { Image, ImageBackground, Pressable, Text, View } from 'react-native';
import React from 'react';
import backgroundCamp from "../assets/images/backgroundCamp.png";
import neymar from "../assets/images/neymar.png";

const Card: React.FC = () => {
  return(    
      <Pressable onPress={() => console.log("teste")}>
        <ImageBackground  className='flex flex-row justify-between p-6 pl-2' source={backgroundCamp}>
          <View className=' flex flex-row p-5'>
            <View className=''>
              <Text className='text-white font-bold'>Crie ou entre no seu time</Text>
              <Text className='text-white font-bold'>Dispute partidas</Text>
              <Text className='text-white font-bold'>Veja seu time avançar no placar</Text>                      
            </View>
            
            <View className=''>
              <Image source={neymar} alt="r" className='absolute mt-[-75px]'/>              
            </View>
          </View>
        </ImageBackground>
        
      </Pressable>
  );
}

export default Card;