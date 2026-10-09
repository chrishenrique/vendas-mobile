import { Redirect, Stack } from 'expo-router';
import { StatusBar, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useSession } from '@/context/sessionContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { EntityProvider } from '@/context/entityContext';

export default function AppLayout() {
  const { session, isLoading } = useSession();

  useEffect(() => {
    async function doAsyncStuff() {
      try {
        console.log('iniciou');
        
      } catch (e) {
        console.warn(e);
      } finally {
         console.log('terminou');
      }
    }

    doAsyncStuff();
  }, []);

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Carregando...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <SafeAreaProvider>
      <EntityProvider>
        <StatusBar barStyle="light-content" backgroundColor="#0F2744" />
        <SafeAreaView style={{backgroundColor: '#0f2744'}} />
        <Stack screenOptions={{ headerShown: false }} >
          <Stack.Screen name="(index)" />
        </Stack>
      </EntityProvider>
    </SafeAreaProvider>
  )
}
