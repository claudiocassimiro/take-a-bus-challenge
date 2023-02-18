import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Map from "./components/Map";

export default function App() {
  const [showBusStops, setShowBusStops] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Map showBusStops={showBusStops} />
      <TouchableOpacity
        style={styles.hiddenMarkButton}
        onPress={() => setShowBusStops(!showBusStops)}
      >
        <Text>{`${
          showBusStops ? "Esconder" : "Ver"
        } paradas de ônibus proximas`}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  hiddenMarkButton: {
    position: "absolute",
    bottom: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "white",
    border: "none",
    "border-radius": 5,
  },
});
