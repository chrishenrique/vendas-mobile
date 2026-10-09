import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { Link, LinkText } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
// import { AlertTriangle, CircleAlert } from "lucide-react-native";
// import { Controller, useForm } from "react-hook-form";
import { Image } from "expo-image";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, View, StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

type Form = {
	email: string;
};

export default function ForgotPasswordScreen() {
	const { control, handleSubmit } = useForm<Form>();
	const toast = useToast();
	const router = useRouter();

	const onForgotPassword = handleSubmit(({ email }) => {
		// submit form to server
		console.log('submited', email);
		
	});

	return (
		<KeyboardAwareScrollView
			style={{ flex: 1 }}
			contentContainerStyle={{ flexGrow: 1 }}
			keyboardShouldPersistTaps="handled"
			bottomOffset={40}
		>
			<LinearGradient
					// 180deg top-to-bottom
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 1 }}
					// #0f2744 from 0% to 46%, sharp transition to #EEF2F8 at 46%
					colors={['#0f2744', '#EEF2F8']}
					locations={[0.50, 1]}
					style={{ flex: 1 }}
				>
					<View className="flex justify-between h-full">
						<View className="flex-grow items-center justify-center">
							<Image
								source={require("@/assets/images/logos/logo-vertical-negative.svg")}
								style={{ width: 120, height: 120 }}
								contentFit="contain"
							/>
							<Text className="text-[1.6rem] font-extrabold text-white m-2">
								Orgafarma Vendas
							</Text>
							<Text className="font-thin text-white">
								Portal de cliente, vendedor e televendas
							</Text>
						</View>
						<View className="bg-white mx-3 rounded-xl">
							<Card size="md" className="m-2 gap-5">
								<VStack space="xl">
									{/* Heading */}
									<VStack space="sm">
										<Heading size="2xl">Esqueceu sua senha?</Heading>
										<Text>
											Informe seu e-mail para receber o link de recuperação de
											senha.
										</Text>
									</VStack>
									<VStack space="xs">
										<Controller
											control={control}
											name="email"
											rules={{ required: "E-mail obrigatorio" }}
											render={({
												field: { onChange, value },
												fieldState: { error },
											}) => (
												<>
													<Text className="uppercase text-xs">E-mail</Text>
													<Input className="border-gray-300">
														<InputField
															aria-label="email"
															placeholder=""
															returnKeyType="done"
															autoCapitalize="none"
															accessibilityLabel="E-mail"
															accessibilityHint="E-mail"
															keyboardType="email-address"
															onChangeText={onChange}
															onSubmitEditing={onForgotPassword}
														/>
													</Input>
													{error && <Text size="xs" className="text-danger">{error.message}</Text>}
												</>
											)}
										/>
									</VStack>
									<VStack space="md">
										<Button className="bg-accent" onPress={onForgotPassword}>
											<ButtonText className="text-white">
												Recuperar senha
											</ButtonText>
										</Button>
									</VStack>
									{/* Return to log in */}
									<HStack className="m-auto">
										<Link
											className="ml-1"
											onPress={() => router.dismissTo("/sign-in")}
										>
											<LinkText className="text-accent">voltar</LinkText>
										</Link>
									</HStack>
								</VStack>
							</Card>
						</View>
						<View className="flex-grow items-center justify-center"></View>
					</View>
			</LinearGradient>
		</KeyboardAwareScrollView>
			
	);
}
