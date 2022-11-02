import {
    Button,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./app/hooks/useCachedResources";
import useColorScheme from "./app/hooks/useColorScheme";
// import Navigation from "./app/navigation";
import {
    useDeviceOrientation,
    useDimensions,
} from "@react-native-community/hooks";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import ViewImageScreen from "./app/screens/ViewImageScreen";
import SalesList from "./app/components/SalesList";
import ListingDetailsScreen from "./app/screens/ListingDetailsScreen";
import ListingsScreen from "./app/screens/ListingsScreen";
import Screen from "./app/components/Screen";
import MessagesScreen from "./app/screens/MessagesScreen";
import AccountScreen from "./app/screens/AccountScreen";
import AppTextInput from "./app/components/form/AppTextInput";
import AppPicker from "./app/components/Picker";
import { useState } from "react";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import ListingsEditScreen from "./app/screens/ListingsEditScreen";
import * as ImagePicker from "expo-image-picker";

const categories = [
    { label: "Furniture", value: 1 },
    { label: "Clothing", value: 2 },
    { label: "Cameras", value: 3 },
];

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();
    const { landscape } = useDeviceOrientation();

    const [category, setCategory] = useState<Object>(categories[0]);

    const [image, setImage] = useState(null);

    // const pickImage = async () => {
    //     // No permissions request is necessary for launching the image library
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         // allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });

    //     console.log(result);

    //     if (!result.cancelled) {
    //         setImage(result.uri);
    //     }
    // };

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <Screen style={styles.container}>
                    {/* <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            title="Pick an image from camera roll"
                            onPress={pickImage}
                        />
                        {image && (
                            <Image
                                source={{ uri: image }}
                                style={{ width: 200, height: 200 }}
                            />
                        )}
                    </View> */}

                    <ListingsEditScreen />
                    {/* <RegisterScreen /> */}
                    {/* <LoginScreen /> */}
                    {/* <AppPicker
                        selectedItem={category}
                        items={categories}
                        onSelectItem={(item: Object) => setCategory(item)}
                    /> */}
                    {/* <AppTextInput icon="email" placeholder="Email" /> */}
                    {/* <AccountScreen /> */}
                    {/* <MessagesScreen /> */}
                    {/* <ListingDetailsScreen /> */}
                    {/* <ListingsScreen /> */}
                    {/* <SalesList /> */}
                    {/* <WelcomeScreen /> */}
                    {/* <ViewImageScreen /> */}
                </Screen>
                {/* <Navigation colorScheme={colorScheme} /> */}
                {/* <StatusBar /> */}
            </SafeAreaProvider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e8eaed",
    },
});
