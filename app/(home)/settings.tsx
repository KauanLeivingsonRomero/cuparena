import React from 'react';
import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const Settings = () => {
  return(
    <SafeAreaView className='flex-1 flex'>
      <ScrollView>
        <Text>Settings</Text>     
      </ScrollView>
    </SafeAreaView>
  );
}

export default Settings;