import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Map from "./components/Map";
import HiddenMarkerButton from "./components/HiddenMarkerButton";

export default function App() {
  const [showBusStops, setShowBusStops] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Map showBusStops={showBusStops} />
      <HiddenMarkerButton
        onPress={setShowBusStops}
        showBusStops={showBusStops}
      />
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
});
