import React from 'react';
import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// import { Container } from './styles';

const Settings = () => {
  return(
    <SafeAreaView className='flex-1 flex'>
      <ScrollView>
        <Text>Matches</Text>     
      </ScrollView>
    </SafeAreaView>
  );
}

export default Settings;