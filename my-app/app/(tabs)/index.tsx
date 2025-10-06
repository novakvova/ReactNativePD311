import { Image } from 'expo-image';
import {StyleSheet, FlatList, View, Text, TouchableOpacity, Animated} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {useEffect, useState} from "react";
import axios from "axios";
import {ICategoryItem} from "@/interfaces/category/ICategoryItem";
import {useGetCategoriesQuery} from "@/services/categoryService";
import LoadingOverlay from "@/components/LoadingOverlay";
import {router} from "expo-router";
import ScrollView = Animated.ScrollView;
import CategoryCard from "@/components/CategoryCard";

export default function HomeScreen() {

    //Підключаємо спеціальних хук для списку категорій
    const {data: categories, isLoading} = useGetCategoriesQuery();
    const handleEdit = (itemId: number) => {
        // тут можна зробити перехід на сторінку редагування
        router.replace({
            pathname: "/update",
            params: { id: itemId },
        });
    };
    // console.log("IsLoading", isLoading);

    // const renderCategory = ({ item }: { item: ICategoryItem }) => (
    //     <View style={styles.card}>
    //         <Image
    //             source={{ uri: `http://10.0.2.2:5109/images/200_${item.image}` }}
    //             style={styles.image}
    //         />
    //         <Text style={styles.name}>{item.name}</Text>
    //         {/* кнопка Edit */}
    //         <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item.id)}>
    //             <Text style={styles.editText}>Edit</Text>
    //         </TouchableOpacity>
    //     </View>
    // );

    const onDelete = (id: number) => {
        console.log("Delete item", id);
    }

    return (
        <>
            <LoadingOverlay visible={isLoading} />

            <View className={"pt-20"}>
                <Text className={"font-bold color-amber-800 text-3xl text-center"}>Категорії</Text>
            </View>

            <View className="flex-1">
                <ScrollView style={{ width: "100%" }} >
                    <View style={{ width: "93%", alignSelf: "center" }} className=" my-4 gap-4 flex flex-row flex-wrap justify-between">
                        {categories?.map(x => <CategoryCard key={x.id} category={x} onDelete={onDelete} />)}
                    </View>
                </ScrollView>

            </View>

            {/* тут відмальовуємо список */}
            {/*<FlatList*/}
            {/*    data={categories}*/}
            {/*    keyExtractor={(item) => item.id.toString()}*/}
            {/*    renderItem={renderCategory}*/}
            {/*    contentContainerStyle={styles.listContainer}*/}
            {/*    ListHeaderComponent={*/}
            {/*        <ThemedView style={styles.titleContainer}>*/}
            {/*            <ThemedText type="title">Категорії</ThemedText>*/}

            {/*        </ThemedView>*/}
            {/*    }*/}
            {/*/>*/}
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
        paddingTop: 64,
        paddingHorizontal: 16,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
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
        flex: 1,
    },
    editButton: {
        backgroundColor: "#007AFF",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    editText: {
        color: "#fff",
        fontWeight: "600",
    },
});
