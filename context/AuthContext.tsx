import env from "@/config.json";
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
}
interface AuthProps {
  user?: User | null,
  setUser: (user: User) => void,
  onLogin: (email: string, password: string, onError: (e: any) => void) => Promise<any>
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

  const onLogin = async (email: string, password: string, onError: (e: any) => void) => {
    try {
      const response = await axios.post(`${env.API_URL}/login`, {email, password});
      setUser(response.data);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      await SecureStore.setItemAsync('AuthToken', response.data.token);
    } catch (e) {
      onError(e as any);
    }
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