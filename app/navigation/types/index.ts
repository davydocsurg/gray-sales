import type {
    CompositeScreenProps,
    NavigatorScreenParams,
    CompositeNavigationProp,
    RouteProp,
} from "@react-navigation/native";
import type { StackScreenProps } from "@react-navigation/stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Welcome = {
    Login: undefined;
    Register: undefined;
};

export type RootStackParamList = {
    // Home: NavigatorScreenParams<HomeTabParamList>;
    // PostDetails: { id: string };
    // NotFound: undefined;
    Feed: undefined;
    Listings: undefined;
    ListingsEdit: undefined;
    Account: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
    StackScreenProps<RootStackParamList, T>;

export type HomeTabParamList = {
    Feed: undefined;
    Listings: undefined;
    ListingsEdit: undefined;
    Account: undefined;
    Details: Details;
};

type Details = {
    id: number;
    title: string;
    price: number;
    image: any;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
    HomeTabParamList,
    "Feed"
>;

export type DetailsScreenRouteProp = NativeStackNavigationProp<
    HomeTabParamList,
    "Feed"
>;

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<HomeTabParamList, T>,
        RootStackScreenProps<keyof RootStackParamList>
    >;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
