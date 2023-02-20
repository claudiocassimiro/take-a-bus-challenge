import { StyleSheet, TouchableOpacity, Text } from "react-native";

interface HiddenMarkerButton {
  onPress: (value: boolean) => void;
  showBusStops: boolean;
}

export default function HiddenMarkerButton({ onPress, showBusStops }) {
  return (
    <TouchableOpacity
      style={styles.hiddenMarkerButton}
      onPress={() => onPress(!showBusStops)}
    >
      <Text>{`${
        showBusStops ? "Esconder" : "Ver"
      } paradas de ônibus proximas`}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  hiddenMarkerButton: {
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
