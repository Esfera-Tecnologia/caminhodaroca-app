import { Slot } from 'expo-router';
import React from 'react';
import ToastManager from 'toastify-react-native';

export default function RootLayout() {
  return (
    <>
      <Slot />
      <ToastManager useModal={false}/>
    </>
  );
}