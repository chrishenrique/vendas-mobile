import { Redirect, Stack } from 'expo-router';
import { StatusBar, Text } from 'react-native';

import { useSession } from '@/context/sessionContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function AppLayout() {
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
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
      <StatusBar barStyle="light-content" backgroundColor="#0F2744" />
      <SafeAreaView style={{backgroundColor: '#0f2744'}} />
      <Stack screenOptions={{ headerShown: false }} />
  
    </SafeAreaProvider>
  )
}
