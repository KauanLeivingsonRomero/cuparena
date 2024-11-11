import React from 'react';
import { FlatList, Text, TouchableOpacity, View, Image } from 'react-native';

type dataType = {
  id: string;
  icon: string;
  time: string;
};

const data: dataType[] = [
  
  { id: "1", time: "Barcelona", icon: "https://crests.football-data.org/1.png" },
  { id: "2", time: "Real Madrid", icon: "https://crests.football-data.org/2.png" },
  { id: "3", time: "Manchester United", icon: "https://crests.football-data.org/3.png" },
  { id: "4", time: "Liverpool", icon: "https://crests.football-data.org/4.png" },
  { id: "5", time: "Bayern Munich", icon: "https://crests.football-data.org/5.png" },
  { id: "6", time: "Paris Saint-Germain", icon: "https://crests.football-data.org/6.png" },
  { id: "7", time: "Juventus", icon: "https://crests.football-data.org/7.png" },
  { id: "8", time: "Chelsea", icon: "https://crests.football-data.org/8.png" },
  { id: "9", time: "Manchester City", icon: "https://crests.football-data.org/9.png" },
  { id: "10", time: "Milan", icon: "https://crests.football-data.org/10.png" },  
  { id: "11", time: "Barcelona", icon: "https://crests.football-data.org/11.png" },
  { id: "21", time: "Real Madrid", icon: "https://crests.football-data.org/12.png" },
  { id: "31", time: "Manchester United", icon: "https://crests.football-data.org/13.png" },
  { id: "41", time: "Liverpool", icon: "https://crests.football-data.org/14.png" },
  { id: "51", time: "Bayern Munich", icon: "https://crests.football-data.org/15.png" },
  { id: "61", time: "Paris Saint-Germain", icon: "https://crests.football-data.org/16.png" },
  { id: "71", time: "Juventus", icon: "https://crests.football-data.org/17.png" },
  { id: "81", time: "Chelsea", icon: "https://crests.football-data.org/18.png" },
  { id: "91", time: "Manchester City", icon: "https://crests.football-data.org/19.png" },
  { id: "101", time: "Milan", icon: "https://crests.football-data.org/20.png" },
];




const Carousel = () => {

  const handleIcon = () => {
    console.log("Pressed")
  }

  const renderItem = ({ item }: { item: dataType }) => {
    return (
      <TouchableOpacity className='w-12 h-12 bg-white rounded-full m-2 flex justify-center items-center' onPress={handleIcon}>
        <Image className='flex justify-center align-center' source={{uri: item.icon}} width={40} height={40}/>
      </TouchableOpacity>
    );
  };

  return (
    <View className='w-screen h-20 pt-2 bg-main-black flex justify-center align-center border-b-2 border-green'>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={true}
        className=''
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Carousel;
