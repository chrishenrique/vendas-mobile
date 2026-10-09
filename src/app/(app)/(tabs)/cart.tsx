import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { ArrowLeftIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useSession } from "@/context/sessionContext";
import { router } from "expo-router";
import { View } from "react-native";


export default function CartScreen() {
    const { signOut } = useSession();
    
    return (
        <View>
            <Text>Carrinho</Text>

        </View>
    )
}