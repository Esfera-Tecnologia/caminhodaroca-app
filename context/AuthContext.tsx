import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useState } from "react";

export interface User {
  id: number,
  name: string,
  avatar: string,
  email: string,
  state: string,
  ageRange: string,
  travelWith: string[] | undefined,
  category: number,
  subcategories: number[],
  token: string,
}
interface AuthProps {
  user?: User | null,
  setUser: (user: User) => void,
  onLogin: (userData: User) => void
  onLogout: () => Promise<any>
  getToken: () => Promise<any>
}
export type LoginInputs = {
  email?: string,
  password?: string,
}
export const AuthContext = createContext<AuthProps>({
  user: null,
  setUser: () => {},
  onLogin: async () => {},
  onLogout: async () => {},
  getToken: async () => "",
});
export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  const onLogin = async (userData: User) => {
    await SecureStore.setItemAsync('AuthToken', userData.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
    setUser({...userData, token: ''});
  };

  const onLogout = async () => {
    await SecureStore.deleteItemAsync('AuthToken');
    axios.defaults.headers.common['Authorization'] = '';
    setUser(null);
  };
  const getToken = async () => {
    return await SecureStore.getItemAsync('AuthToken');
  }
  return (
    <AuthContext.Provider value={{ user, setUser, getToken, onLogin, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
}