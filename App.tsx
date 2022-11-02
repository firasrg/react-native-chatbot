import React from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

export const AppContext = React.createContext(null);


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    
    
    return (
      <AppContext.Provider value={{profile: "test"}}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme}/>
          <StatusBar/>
        </SafeAreaProvider>
      </AppContext.Provider>
    );
  }
}

