import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { EXPIRY_MINS, PREFIX } from "./constants";

const storeData = async (key: any, value: any) => {
    try {
        const item = {
            value,
            timestamp: Date.now(),
        };
        console.log("====================================");
        console.log(key, "from cache");
        console.log("====================================");
        await AsyncStorage.setItem(PREFIX + key, JSON.stringify(item));
    } catch (error) {
        console.error(error);
    }
};

const isExpired = (item: any) => {
    const now = moment(Date.now());
    const storedTime = moment(item.timestamp);
    return now.diff(storedTime, "minutes") > EXPIRY_MINS;
};

const get = async (key: any, ...rest: any) => {
    try {
        const value = await AsyncStorage.getItem(PREFIX + key);
        const item = JSON.parse(value!);

        if (!item) return null;

        if (isExpired(item)) {
            await AsyncStorage.removeItem(PREFIX + key);
            return null;
        }

        return item.value;
    } catch (error) {
        console.error(error);
    }
};

export default {
    storeData,
    get,
};
