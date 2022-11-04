import React from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import { store } from "@redux/store";

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
        <Provider store={store}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme}/>
            <StatusBar/>
          </SafeAreaProvider>
        </Provider>
      </AppContext.Provider>
    );
  }
}

