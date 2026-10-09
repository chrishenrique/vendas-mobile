import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { SessionProvider, useSession } from "@/context/sessionContext";
import { SplashScreenController } from "@/splash";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot, Stack } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import '../../global.css';
import { LinearGradient } from "expo-linear-gradient";

const queryClient = new QueryClient();

const RootNavigator = () => {
	const { session } = useSession();

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Protected guard={!!session}>
				<Stack.Screen name="(app)" />
			</Stack.Protected>

			<Stack.Protected guard={!session}>
				<Stack.Screen name="sign-in" />
				<Stack.Screen name="forgot-password" />
			</Stack.Protected>
		</Stack>
	);
};

export default function Root() {

	return (
		<QueryClientProvider client={queryClient}>
			<GluestackUIProvider>
				<SafeAreaProvider>
					<SessionProvider>
						<SplashScreenController />
						<KeyboardProvider>
							<RootNavigator />
						</KeyboardProvider>
					</SessionProvider>
				</SafeAreaProvider>
			</GluestackUIProvider>
		</QueryClientProvider>
	);
}
