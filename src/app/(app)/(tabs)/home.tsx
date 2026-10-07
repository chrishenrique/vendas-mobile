import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { ArrowLeftIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useSession } from "@/context/sessionContext";
import { router } from "expo-router";
import { View } from "react-native";


export default function HomeScreen() {
    const { signOut } = useSession();
    
    return (
        <View>
            <View style={{ backgroundColor: '#0f2744'}} className="p-2 mb-3 flex-row justify-between">
                <View className="flex-row">
                    <Button 
                        onPress={() => router.dismissTo('/')}>
                        <ButtonIcon as={ArrowLeftIcon} className="text-white"/>
                    </Button>
                    <View >
                        <Text size="xs" className="text-gray-300">Cliente ativo</Text>
                        <Text className="font-bold text-white">XXXXXXXXXXXXXXX</Text>
                    </View>
                </View>
                <Button style={{backgroundColor: '#3483FA'}} 
                    onPress={() => signOut()}>
                    <ButtonText className="text-white">Sair</ButtonText>
                </Button>
            </View>

        </View>
    )
}