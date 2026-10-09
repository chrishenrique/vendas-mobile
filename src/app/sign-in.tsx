import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Link, LinkText } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AlertCircleIcon, CloseIcon, EyeIcon, EyeOffIcon, HelpCircleIcon, Icon } from "@/components/ui/icon";
import { DEV_FAKE_TOKEN, useSession } from "@/context/sessionContext";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Image } from "expo-image";
import { KeyboardAvoidingView, Platform, ScrollView, View, StyleSheet, Pressable } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { login } from "@/api/auth";
import * as Device from "expo-device";
import {
	Toast,
	ToastDescription,
	ToastTitle,
	useToast,
} from "@/components/ui/toast";
import { HStack } from "@/components/ui/hstack";
import { reset } from "expo-router/build/react-navigation/routers/CommonActions";

type Form = {
	email: string;
	password: string;
};

export default function SignIn() {
	const { control, handleSubmit } = useForm<Form>();
	const [showPassword, setShowPassword] = useState(false);
	const { setSession } = useSession();
	const toast = useToast();

	const handleShowPasswordState = () => {
		setShowPassword((showState) => {
			return !showState;
		});
	};

	const handleKeyPress = () => {
		// Keyboard.dismiss();
		handleSubmit(onSignIn);
	};

	const onSignIn = async (form: Form) => {
		// setSession(DEV_FAKE_TOKEN);
		await login({
			email: form.email,
			password: form.password,
			device_name: `${Device.deviceName} - ${Device.osName} ${Device.osVersion}`,
		})
			.then(async (response) => {
				// reset();
				// set session with token
				setSession(response);
			})
			.catch((error) => {
				console.log(error);
				if (error.validationErrors) {
					toast.show({
						placement: "top",
						duration: 10000,
						render: ({ id }) => {
							return (
								<Toast
									action="error"
									variant="solid"
									nativeID={id}
									className="p-4 gap-6 border-danger w-full shadow-hard-5 max-w-[443px] flex-row justify-between bg-white"
								>
									<HStack space="md">
										<Icon as={HelpCircleIcon} className="stroke-danger mt-0.5" />
										<VStack space="xs">
											<ToastTitle className="font-semibold text-danger">
												Atenção
											</ToastTitle>
											<ToastDescription size="sm">
												{error.validationErrors.email}
											</ToastDescription>
										</VStack>
									</HStack>
								</Toast>
							);
						},
					});
				} else {
					// non validation errors
					toast.show({
						placement: "top",
						duration: 10000,
						render: ({ id }) => {
							return (
								<Toast
									action="error"
									variant="solid"
									nativeID={id}
									className="p-4 gap-6 border-danger w-full shadow-hard-5 max-w-[443px] flex-row justify-between bg-white"
								>
									<HStack space="lg">
										<Icon as={AlertCircleIcon} className="stroke-danger mt-0.5" />
										<VStack space="xs">
											<ToastTitle className="font-semibold text-danger">
												Erro!
											</ToastTitle>
											<ToastDescription size="sm">
												Algo de errado aconteceu, tente novamente.
											</ToastDescription>
										</VStack>
									</HStack>
								</Toast>
							);
						},
					});
					// non validation errors
					// throw Error("Major Server Error - Login", error);
				}
			});
	};


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
				locations={[0.60, 1]}
				style={{ flex: 1 }}
			>
				<View className="flex-1 justify-center">
					<View className="flex-1 items-center justify-center">
						<Image source={require('@/assets/images/logos/logo-vertical-negative.svg')} style={{ width: 120, height: 120 }} contentFit="contain" />
						<Text className="text-[1.6rem] font-extrabold text-white m-2">Orgafarma Vendas</Text>
						<Text className="font-thin text-white">Portal de cliente, vendedor e televendas</Text>
					</View>
					<View className="bg-white mx-3 rounded-xl">

						<Card size="md" className="m-2 gap-5" >
							<VStack space="xs">
								<Controller
									control={control}
									name="email"
									rules={{
										required: "E-mail obrigatorio",
										minLength: {
											value: 3,
											message: 'O nome deve ter pelo menos 3 caracteres.',
										},
									}}
									render={({
										field: { onChange, value },
										fieldState: { error },
									}) => (
										<>
											<Text className="uppercase text-xs">E-mail</Text>
											<Input className="border-gray-300">
												<InputField
													aria-label="username"
													placeholder=""
													returnKeyType="done"
													autoCapitalize="none"
													accessibilityLabel="E-mail"
													accessibilityHint="E-mail"
													keyboardType="email-address"
													onChangeText={onChange}
													onSubmitEditing={handleKeyPress}
												/>
											</Input>
											{error && <Text size="xs" className="text-danger">{error.message}</Text>}
										</>
									)}
								/>
							</VStack>
							<VStack space="xs">
								<Controller
									control={control}
									name="password"
									rules={{ required: "Senha obrigatoria" }}
									render={({
										field: { onChange, value },
										fieldState: { error },
									}) => (
										<>
											<Text className="uppercase text-xs">Senha</Text>
											<Input className="border-gray-300">
												<InputField
													type={showPassword ? "text" : "password"}
													aria-label="password"
													placeholder="Sua senha"
													returnKeyType="done"
													onChangeText={onChange}
													onSubmitEditing={handleKeyPress}
												/>
												<InputSlot onPress={handleShowPasswordState} className="pr-3 ">
													<InputIcon as={showPassword ? EyeIcon : EyeOffIcon} className="text-accent" />
												</InputSlot>
											</Input>
											{error && <Text size="xs" className="text-danger">{error.message}</Text>}
										</>
									)}
								/>
								{/* Forgot Password Link */}
								<Link onPress={() => router.push('/forgot-password')} className="ml-auto">
									<LinkText size="sm" className="text-accent">
										Esqueci minha senha
									</LinkText>
								</Link>
							</VStack>
							<VStack space="md">
								{/* Login Button */}
								<Button style={{ backgroundColor: '#3483FA' }}
									onPress={handleSubmit(onSignIn)}>
									<ButtonText className="text-white">Entar</ButtonText>
								</Button>
							</VStack>
						</Card>
					</View>
					<View className="flex-1" />
				</View>
			</LinearGradient>
		</KeyboardAwareScrollView>


	);
}

