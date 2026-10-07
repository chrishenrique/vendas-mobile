import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Link, LinkText } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
// import { useSession } from "@/context/sessionContext";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as Device from "expo-device";
// import { AlertTriangle, CircleAlert } from "lucide-react-native";
import { useState } from "react";
// import { Controller, useForm } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { DEV_FAKE_TOKEN, useSession } from "@/context/sessionContext";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Image, View } from "react-native";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { setSession } = useSession();

  const handleShowPasswordState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };


  return (
    <LinearGradient
      // 180deg top-to-bottom
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      // #0f2744 from 0% to 46%, sharp transition to #EEF2F8 at 46%
      colors={['#0f2744', '#0f2744', '#EEF2F8']}
      locations={[0, 0.46, 0.46]}
      style={{ flex: 1 }}
    >
      <View className="flex justify-between h-full">
		<View className="flex-grow items-center justify-center">
			<Image source={require('@/assets/images/logos/logo-vertical-negative.svg')} style={{width: 120, height: 120}}></Image>
			<Text className="text-[1.6rem] font-extrabold text-white m-2">Orgafarma Vendas</Text>
			<Text className="font-thin text-white">Portal de cliente, vendedor e televendas</Text>
		</View>
		<View className="bg-white mx-3 rounded-xl">
			<Card size="md" className="m-2 gap-5" >
				<VStack space="xs">
					<Text className="uppercase text-xs">E-mail ou usuário</Text>
					<Input className="border-gray-300">
						<InputField
							aria-label="username"
							placeholder=""
							returnKeyType="done"
							autoCapitalize="none"
							accessibilityLabel="E-mail ou usuário"
							accessibilityHint="E-mail ou usuário"
							keyboardType="email-address"
						/>
					</Input>
				</VStack>
				<VStack space="xs">
					<Text className="uppercase text-xs">Senha</Text>
					<Input className="border-gray-300">
						<InputField
							type={showPassword ? "text" : "password"}
							aria-label="password"
							placeholder="senha"
							returnKeyType="done"
						/>
						<InputSlot onPress={handleShowPasswordState} className="pr-3 ">
							<InputIcon as={showPassword ? EyeIcon : EyeOffIcon} className="text-accent"/>
						</InputSlot>
					</Input>
					{/* Forgot Password Link */}
					<Link onPress={() => router.push('/forgot-password')} className="ml-auto">
						<LinkText size="sm" className="text-accent">
							Esqueci minha senha
						</LinkText>
					</Link>
				</VStack>
				<VStack space="md">
					{/* Login Button */}
					<Button style={{backgroundColor: '#3483FA'}} 
						onPress={() => {
						// TODO: trocar pelo login real (api/auth.ts -> login)
						// Bypass de desenvolvimento: grava um token falso como sessão.
						// O Stack.Protected do _layout raiz redireciona para (app) sozinho.
						
						setSession(DEV_FAKE_TOKEN);
						
						}}>
						<ButtonText className="text-white">Entar</ButtonText>
					</Button>
				</VStack>
			</Card>
		</View>
		<View className="flex-grow items-center justify-center">
		</View>
      </View>
    </LinearGradient>
  );
}

