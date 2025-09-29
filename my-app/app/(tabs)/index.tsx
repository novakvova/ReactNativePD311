import { Image } from 'expo-image';
import {  StyleSheet, FlatList, View, Text } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {useEffect, useState} from "react";
import axios from "axios";
import {ICategoryItem} from "@/interfaces/category/ICategoryItem";
import {useGetCategoriesQuery} from "@/services/categoryService";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function HomeScreen() {

    //Підключаємо спеціальних хук для списку категорій
    const {data: categories, isLoading} = useGetCategoriesQuery();
    console.log("IsLoading", isLoading);

    const renderCategory = ({ item }: { item: ICategoryItem }) => (
        <View style={styles.card}>
            <Image
                source={{ uri: `http://10.0.2.2:5109/images/200_${item.image}` }}
                style={styles.image}
            />
            <Text style={styles.name}>{item.name}</Text>
        </View>
    );

    return (
        <>

            <LoadingOverlay visible={isLoading} />

            {/* тут відмальовуємо список */}
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderCategory}
                contentContainerStyle={styles.listContainer}
                ListHeaderComponent={
                    <ThemedView style={styles.titleContainer}>
                        <ThemedText type="title">Категорії</ThemedText>

                    </ThemedView>
                }
            />
            </>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    listContainer: {
        gap: 12,
        paddingBottom: 20,
        paddingTop: 64,        // відступ зверху
        paddingHorizontal: 16, // відступ зліва і справа
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eee',
        padding: 10,
        borderRadius: 12,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
