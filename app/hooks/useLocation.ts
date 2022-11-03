import { useEffect, useState } from "react";
import * as Location from "expo-location";

const useLocation = () => {
    const [location, setLocation] = useState({});

    const getLocation = async () => {
        try {
            const { status } =
                await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") return;

            const {
                coords: { latitude, longitude },
            } = await Location.getCurrentPositionAsync({});
            setLocation({ latitude, longitude });
        } catch (error) {
            console.log("====================================");
            console.error(error);
            console.log("====================================");
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    return location;
};

export default useLocation;
