import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { AlertCircleIcon, ArrowRightIcon, Icon, PinMapIcon, SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { router } from "expo-router";
import { Pressable, ScrollView, View } from "react-native";

export default function Index() {

    return (
        <View>
            <View style={{ backgroundColor: '#0f2744'}} className="mb-3">
                <Input className="border-gray-300 bg-white m-3">
                    <InputIcon as={SearchIcon} className="text-gray-300 mx-2"/>
                    <InputField
                        className=""
                        aria-label="password"
                        placeholder="Buscar por nome, fantasia, CNPJ ou código..."
                        returnKeyType="done"
                    />
                </Input>
            </View>

            <View className="flex h-full">
                <ScrollView>
                    <View className="gap-3">
                        <VStack space='md'>
                            <Pressable onPress={() => router.push('/home')}>
                                <Card className="bg-white mx-2 rounded-lg">
                                    <HStack className="flex-row justify-between">
                                        <View>
                                            <Heading size="sm">FARMACIA CRUZ PASSOS</Heading>
                                        </View>
                                        <Icon as={ArrowRightIcon} className="text-gray-300"/>
                                    </HStack>
                                    <Text className="text-gray-400">FARMACIA CRUZ PASSOS LTDA</Text>
                                    <View className="flex-row justify-start align-middle">
                                        <Text className="text-gray-400">Cod: 345296 </Text>
                                        <Text className="text-gray-500">36.179.551/0001-01</Text>
                                    </View>
                                    <View className="flex-row justify-start align-middle">
                                        <Icon as={PinMapIcon} className="text-gray-400"/> 
                                        <Text size="sm" className="text-gray-500">
                                            RUA PADRE FREIRE DE MENEZES, 05 SALA 01, CENTRO - POCOS DE CALDAS - MG
                                        </Text>
                                        
                                    </View>

                                </Card>
                            </Pressable>
                        </VStack>
                        <VStack space='md'>
                            <Pressable onPress={() => router.push('/home')}>
                                <Card className="bg-white mx-2 rounded-lg">
                                    <HStack className="flex-row justify-between">
                                        <View className="flex-row">
                                            <Heading size="sm">FARMACIA AZEVEDO</Heading>
                                            <Badge size="sm" variant="destructive" className=" bg-red-200 ml-1 rounded-xl">
                                            <BadgeIcon as={AlertCircleIcon} className="text-red-500 mr-1" />
                                            <BadgeText className="text-red-500">Alertas</BadgeText>
                                            </Badge>
                                        </View>
                                        <Icon as={ArrowRightIcon} className="text-gray-300"/>
                                    </HStack>
                                    <Text className="text-gray-400">FARMACIA AZEVEDO LTDA</Text>
                                    <View className="flex-row justify-start align-middle">
                                        <Text className="text-gray-400 mr-2">Cod: 274569 </Text>
                                        <Text className="text-gray-500">CNPJ 10.237.761/0009-72</Text>
                                    </View>
                                    <View className="flex-row justify-start align-middle">
                                        <Icon as={PinMapIcon} className="text-gray-400"/> 
                                        <Text size="sm" className="text-gray-500">
                                            ESTRADA DE CAMPINAS, 508, SAO CAETANO, SALVADOR - BA
                                        </Text>
                                        
                                    </View>
                                    <Text size="xs" className="text-danger">
                                        Retinoicos - Vencidos ha 123 dia(s) (01/01/2026)
                                    </Text>

                                </Card>
                            </Pressable>
                        </VStack>
                        
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}