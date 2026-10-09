import { getOrders } from "@/api/orders";
import { StatusBadge } from "@/components/OrderStatusBadge";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { ArrowLeftIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useEntity } from "@/context/entityContext";
import { Order } from "@/types/order";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { View, StyleSheet, FlatList, ScrollView, Pressable, TouchableOpacity } from "react-native";


export default function OrdersScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const { entity } = useEntity();
    const entityId = entity?.id ?? "";

    const { data: ORDERS, isPending, isError, error, refetch, isRefetching } = useQuery({
        queryKey: ["orders", entityId],
        queryFn: () => getOrders(entityId),
        enabled: !!entityId,
    });

    const [isActive, setIsActive] = useState('');

    const handlePress = (value: string) => {
        setIsActive(value);
        setSearchQuery(value);
    };

    const filteredData = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return ORDERS;

        if (query == 'Todos'.toLocaleLowerCase()) return ORDERS;

        return ORDERS?.filter((item) =>
            item.status.toLowerCase().includes(query)
        );
    }, [ORDERS, searchQuery]);

    const renderCardItem = ({ item }: { item: Order }) => (
        <VStack space='md' style={{ marginBottom: 12 }}>
            <Card className="bg-white mx-2 rounded-lg">
                <HStack className="flex-row justify-between">
                    <View className="flex-row">
                        <Heading size="sm">Pedido #{item.id}</Heading>
                    </View>
                    <StatusBadge status={item.status} order={item} />
                </HStack>
                <Text size="xs" className="text-gray-400 my-2">{item.date} - {item.items} itens - {item.un} un.</Text>
                <View
                    className="border-gray-200"
                    style={{
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />
                <View className="flex-row justify-between align-middle my-2">
                    <Text size="sm" className="text-gray-500">
                        Total
                    </Text>
                    <Text className="font-extrabold">R$ {item.value}</Text>
                </View>
            </Card>
        </VStack>
    );

    const BUTTONS = [
        'Todos',
        'Aprovado',
        'Em separacao',
        'Entregue',
        'Faturado',
        'Cancelado',
    ];

    return (
        <View className="flex p-2">
            <Heading className="mx-2">Meus Pedidos</Heading>
            <View className="flex-row m-2">
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        BUTTONS.map((item) => (
                            <Button 
                                key={item}
                                onPress={() => handlePress(item)}
                                className={`rounded-full mr-2 ${isActive == item ? 'border-accent bg-blue-300' : 'border-gray-600 bg-white'}`}
                            >
                                <ButtonText className="text-gray-600">{item}</ButtonText>
                            </Button>
                        ))
                    }
                </ScrollView>
            </View>
            <View>
                <FlatList
                    data={filteredData}
                    renderItem={renderCardItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    onRefresh={refetch}
                    refreshing={isRefetching}
                    ListEmptyComponent={
                        <View className="m-3">
                            <Text className="text-center text-gray-400">Nenhum pedido encontrado.</Text>
                        </View>
                    }
                />
            </View>

        </View>
    )
}