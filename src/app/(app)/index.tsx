import { getEntities } from "@/api/entity";
import LoadingMessageScreen from "@/components/LoadingMessageScreen";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { AlertCircleIcon, ArrowRightIcon, Icon, InfoIcon, PinMapIcon, SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useEntity } from "@/context/entityContext";
import type { Entity } from "@/types/entity";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, View } from "react-native";

// TODO: trocar pelo id do usuário logado
const USER_ID = "1";

export default function Index() {
    const { selectEntity } = useEntity();
    const [searchQuery, setSearchQuery] = useState('');

    const { data: ENTITIES, isPending, isError, error, refetch, isRefetching } = useQuery({
        queryKey: ["entities", USER_ID],
        queryFn: () => getEntities(USER_ID),
    });

    const handleSelect = (entity: Entity) => {
        selectEntity(entity);
        router.push("/home");
    };

    const renderCardItem = ({ item }: { item: Entity }) => (
        <VStack space='md' style={{marginBottom: 12}}>
            <Pressable onPress={() => handleSelect(item)}>
                <Card className="bg-white mx-2 rounded-lg">
                    <HStack className="flex-row justify-between">
                            <View className="flex-row">
                            <Heading size="sm">{item.name}</Heading>
                            {!!item.alerts?.length && (
                                <Badge variant="destructive" className="bg-red-200 ml-1 rounded-xl">
                                    <BadgeIcon as={AlertCircleIcon} className="text-red-500 mr-1" />
                                    <BadgeText className="text-red-500">Alertas</BadgeText>
                                </Badge>
                            )}
                        </View>
                        <Icon as={ArrowRightIcon} className="text-gray-300"/>
                    </HStack>
                    <Text className="text-gray-400">{item.bussinesName}</Text>
                    <View className="flex-row justify-start align-middle">
                        <Text className="text-gray-400">Cod: {item.code} </Text>
                        <Text className="text-gray-500">{item.document}</Text>
                    </View>
                    <View className="flex-row justify-start align-middle">
                        <Icon as={PinMapIcon} className="text-gray-400"/> 
                        <Text size="sm" className="text-gray-500">
                            {item.address}
                        </Text>
                    </View>
                    {item.alerts?.map((alert) => (
                        <Text key={alert} size="xs" className="text-danger">
                            {alert}
                        </Text>
                    ))}
                </Card>
            </Pressable>
        </VStack>
    );

    const filteredData = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return ENTITIES;

        const digits = query.replace(/\D/g, '');

        return ENTITIES?.filter((item) =>
            item.name.toLowerCase().includes(query) ||
            item.bussinesName.toLowerCase().includes(query) ||
            item.code.toLowerCase().includes(query) ||
            item.document.toLowerCase().includes(query) ||
            (!!digits && item.document.replace(/\D/g, '').includes(digits))
        );
    }, [ENTITIES, searchQuery]);

    return (
        <View className="flex-1">
            <View style={{ backgroundColor: '#0f2744'}} className="mb-3">
                <Input className="border-gray-300 bg-white m-3">
                    <InputIcon as={SearchIcon} className="text-gray-300 mx-2"/>
                    <InputField
                        className=""
                        aria-label="password"
                        placeholder="Buscar por nome, fantasia, CNPJ ou código..."
                        returnKeyType="done"
                        value={searchQuery}
                        onChangeText={(text) => setSearchQuery(text)}
                        clearButtonMode="while-editing" // Botão 'X' para limpar no iOS
                    />
                </Input>
            </View>

            {isPending ? (
                <LoadingMessageScreen msg="Carregando clientes..." />
            ) : isError ? (
                <View className="items-center gap-3 m-3">
                    <Alert action="error" variant="solid">
                        <AlertIcon as={InfoIcon} />
                        <AlertText>Erro: {error.message}</AlertText>
                    </Alert>
                    <Button onPress={() => refetch()}>
                        <ButtonText>Tentar novamente</ButtonText>
                    </Button>
                </View>
            ) : (
                <FlatList
                    data={filteredData}
                    renderItem={renderCardItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    onRefresh={refetch}
                    refreshing={isRefetching}
                    ListEmptyComponent={
                        <View className="m-3">
                            <Text className="text-center text-gray-400">Nenhum cliente encontrado.</Text>
                        </View>
                    }
                />
            )}
        </View>
    );
}