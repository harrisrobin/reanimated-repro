import React from 'react';
import {ChatPage} from './components/ChatPage/ChatPage';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppProviders} from './components/AppProviders/AppProviders';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <AppProviders>
        <ChatPage />
      </AppProviders>
    </SafeAreaProvider>
  );
}

export default App;
