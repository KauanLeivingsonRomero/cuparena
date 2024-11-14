import api from '@/lib/axios';
import type { User, UserContextType } from '@/types/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState, useCallback, type ReactElement, type ReactNode } from 'react';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext)
  if(!context){
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

const UserProvider = (props: {children: ReactNode}): ReactElement => {

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const loadUser = useCallback(async () => {
    await api.get('/me')
      .then((response: any) => {
        setUser(response.data.user);
        // console.log(response.data.user); 
      })
      .catch((error) => {        
        console.error("Error loading user:", error);
      });
  }, []);

  useEffect(() => {    
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    if (user) {
      AsyncStorage.setItem('user', JSON.stringify(user));
    } else {
      AsyncStorage.removeItem('user');
    }
  }, [user]);

  const logout = () => {
    setUser(null);
  };

  return <UserContext.Provider {...props} value={{ user, setUser, logout, token, setToken, loadUser }} />;
}

export { UserContext, UserProvider };
