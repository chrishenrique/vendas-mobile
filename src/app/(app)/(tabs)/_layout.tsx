import { Redirect, Slot, Tabs } from 'expo-router';
import { Icon } from '@/components/ui/icon';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { ArrowLeftIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { useSession } from "@/context/sessionContext";
import { router } from "expo-router";
import { useEffect, useState } from 'react';
import { useEntity } from '@/context/entityContext';

function HeaderDataBar({ entityName, onSignOut }: { entityName: string; onSignOut: () => void }) {
    return (
        <View style={{ backgroundColor: '#0f2744'}} className="p-2 mb-3 flex-row justify-between">
            <View className="flex-row">
                <Button
                    onPress={() => router.dismissTo('/')}>
                    <ButtonIcon as={ArrowLeftIcon} className="text-white"/>
                </Button>
                <View>
                    <Text size="xs" className="text-gray-300">Cliente ativo</Text>
                    <Text className="font-bold text-white">{entityName}</Text>
                </View>
            </View>
            <Button style={{backgroundColor: '#3483FA'}}
                onPress={onSignOut}>
                <ButtonText className="text-white">Sair</ButtonText>
            </Button>
        </View>
    );
}

export default function TabsLayout() {
    const { signOut } = useSession();
    const { entity, isLoading } = useEntity();

    if (isLoading) return null;
    if (!entity) return <Redirect href="/" />;

  return (
    <View style={{flex: 1}}>
        <HeaderDataBar entityName={entity.name} onSignOut={signOut}/>
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Início',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? 'home' : 'home-outline'}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
             <Tabs.Screen
                name="catalog"
                options={{
                    title: 'Catalogo',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                        name={focused ? 'grid' : 'grid-outline'}
                        size={24}
                        color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: 'Carrinho',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                        name={focused ? 'cart' : 'cart-outline'}
                        size={24}
                        color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="orders"
                options={{
                    title: 'Pedidos',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                        name={focused ? 'cube' : 'cube-outline'}
                        size={24}
                        color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="more"
                options={{
                    title: 'Mais',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                        name={focused ? 'ellipsis-horizontal' : 'ellipsis-horizontal-outline'}
                        size={24}
                        color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    </View>
  );
}