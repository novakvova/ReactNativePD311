import {
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Text, TouchableOpacity,
    View,
    Image
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import {SafeAreaProvider} from "react-native-safe-area-context";
import ScrollView = Animated.ScrollView;
import FormField from "@/components/FormField";
import {useState} from "react";
import slugify from "slugify";
import {useCreateCategoryMutation} from "@/services/categoryService";
import {router} from "expo-router";

const AddTabScreen = () => {

    const [form, setForm] = useState({
        name: "",
        slug: ""
    });

    const [image, setImage] = useState<string | null>(null);

    const [createCategory, {isLoading}] = useCreateCategoryMutation();

    const handleChange = (field: string, text: string) => {
        setForm({...form, [field]: text});
    }

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            alert("Потрібен доступ до галереї!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("Name", form.name);
        formData.append("Slug", form.slug);


        if (image) {
            const filename = image.split('/').pop()!;
            const match = /\.(\w+)$/.exec(filename);
            const ext = match?.[1];
            const mimeType = `image/${ext}`;

            formData.append("ImageFile", {
                uri: image,
                name: filename,
                type: mimeType,
            } as any);
        }
        try {
            const res = await createCategory(formData).unwrap();
            console.log("Створено категорію", res);
            router.replace("/");
        } catch (error) {
            console.error("Не створено", error);
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1">
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    className="flex-1"
                >
                    <ScrollView
                        contentContainerStyle={{flexGrow: 1, paddingHorizontal: 20}}
                        keyboardShouldPersistTaps="handled"
                    >

                        <View
                            className="w-full flex justify-center items-center my-6"
                            style={{
                                minHeight: Dimensions.get("window").height - 100,
                            }}
                        >
                            <Text className={"text-3xl font-bold mb-6 text-black"}>
                                Додати категорію
                            </Text>

                            <FormField
                                title={"Назва"}
                                value={form.name}
                                placeholder={"Вкажіть назву"}
                                handleChangeText={(text) =>
                                    {
                                        const slug = slugify(text, {lower: true});
                                        setForm({...form, name: text, slug: slug});
                                    }}
                            />

                            <FormField
                                title={"Slug"}
                                value={form.slug}
                                placeholder={"Вкажіть slug"}
                                handleChangeText={(text) => handleChange("slug", text)}
                            />

                            <TouchableOpacity
                                onPress={pickImage}
                                className="w-full bg-indigo-300 p-3 rounded-lg mt-4"
                            >
                                <Text className="text-center text-white font-bold">Обрати фото</Text>
                            </TouchableOpacity>

                            {image && (
                                <Image
                                    source={{ uri: image }}
                                    style={{ width: 100, height: 100, borderRadius: 50, marginTop: 10 }}
                                />
                            )}

                            <TouchableOpacity
                                onPress={handleSubmit}
                                className="w-full bg-red-600 p-3 rounded-lg mt-4"
                            >
                                <Text className="text-center text-white font-bold">Додати</Text>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

export default AddTabScreen;
