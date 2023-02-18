import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text } from "react-native";
import * as Location from "expo-location";
import axios from "axios";

interface MapProps {
  showBusStops: boolean;
}

export default function Map({ showBusStops }: MapProps) {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [locationCoord, setLocationCoord] = useState("");
  const [busStops, setBusStops] = useState([]);

  useEffect(() => {
    async function getLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      setLocation(location);

      const locationCoord = `${location.coords.latitude},${location.coords.longitude}`;

      setLocationCoord(locationCoord);
    }

    getLocation();
  }, []);

  useEffect(() => {
    getNearbyBusStops();
  }, [locationCoord]);

  const getNearbyBusStops = async () => {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
      {
        params: {
          location: locationCoord,
          radius: 500,
          type: "bus_station",
          key: "AIzaSyAUJQm_OoH3IVdUtIbFoSBi0qxyLsuwUyE",
        },
      }
    );

    const busStops = response.data.results.map((result: any) => ({
      id: result.place_id,
      lat: result.geometry.location.lat,
      lon: result.geometry.location.lng,
      name: result.name,
      address: result.vicinity,
    }));

    setBusStops(busStops);
  };
  return location ? (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.01,
      }}
    >
      {showBusStops
        ? busStops.map((busStop) => (
            <Marker
              key={busStop.id}
              coordinate={{
                latitude: busStop.lat,
                longitude: busStop.lon,
              }}
              title={busStop.name}
              description={busStop.address}
            />
          ))
        : null}
    </MapView>
  ) : (
    <Text>Loading...</Text>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
