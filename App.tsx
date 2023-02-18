import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Geolocation from "react-native-geolocation-service";
import xml2js from "xml2js";

type Bbox = {
  left: number;
  down: number;
  right: number;
  up: number;
};

export default function App() {
  const [bBox, setBbox] = useState({} as Bbox);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const leftAndRightToCalcBbox = 0.1;
        const downAndUpToCalcBbox = 0.05;

        setBbox({
          left: longitude - leftAndRightToCalcBbox,
          down: latitude - downAndUpToCalcBbox,
          right: longitude + leftAndRightToCalcBbox,
          up: latitude + downAndUpToCalcBbox,
        });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  useEffect(() => {
    getNearbyBusStops();
  }, [bBox]);

  const getNearbyBusStops = async () => {
    const { left, down, right, up } = bBox;
    const response = await fetch(
      `https://api.openstreetmap.org/api/0.6/map?bbox=${left},${down},${right},${up}&amenity=bus_stop`
    );

    const xmlString = await response.text();
    const busStopConrdinates = xml2js.parseString(xmlString, (err, result) => {
      try {
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
