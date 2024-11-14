import React, { type ReactNode } from 'react';
import { View } from 'react-native';


const Modal = ({ children }: { children: ReactNode }) => {
  return (
    <View
      className='flex p-1 w-full drop-shadow bg-white rounded-xl border-l-4 border-l-green border-r-white border-t-white border-b-white'
    >
      {children}
    </View>
  );
};

export default Modal;