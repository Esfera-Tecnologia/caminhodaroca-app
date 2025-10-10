import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

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
  source: string
}
interface AuthProps {
  user?: User | null,
  setUser: (user: User) => void,
  onLogin: (userData: User) => void,
  onLogout: () => Promise<any>,
  getToken: () => Promise<any>,
  showWelcomeModal: boolean,
  setShowWelcomeModal: Dispatch<SetStateAction<boolean>>,
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
  showWelcomeModal: false,
  setShowWelcomeModal: () => {}
});
export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const onLogin = async (userData: User) => {
    await SecureStore.setItemAsync('AuthToken', userData.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
    if(userData.source === 'web' && ! userData.state) {
      setShowWelcomeModal(true);
    }
    setUser({...userData, token: ''});
  };

  const onLogout = async () => {
    await SecureStore.deleteItemAsync('AuthToken');
    axios.defaults.headers.common['Authorization'] = '';
    setShowWelcomeModal(false);
    setUser(null);
  };
  const getToken = async () => {
    return await SecureStore.getItemAsync('AuthToken');
  }
  return (
    <AuthContext.Provider value={{ user, setUser, getToken, onLogin, showWelcomeModal, setShowWelcomeModal, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
}