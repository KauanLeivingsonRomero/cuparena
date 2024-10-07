import { Tabs } from 'expo-router';
import { Plus } from 'lucide-react-native';

export default function HomeLayout() {
  return (    
    <Tabs >
      <Tabs.Screen 
        name="index"
        options={{
          headerShown: false, 
          tabBarIcon: (() => <Plus />),
          title: "Home",
        }} 
      />
    </Tabs>
  );
}
