import React from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './src/redux/store/configerStore'
import Navigation from './src/navigation'
import Toast from 'react-native-toast-message';

export default function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
        <Toast />
      </PersistGate>
    </Provider>
  )
}