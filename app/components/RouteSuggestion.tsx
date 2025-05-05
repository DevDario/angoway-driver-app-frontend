import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type RouteSuggestionProps = {
  origin: string;
  destination: string;
  onPress?: () => void;
};

export default function RouteSuggestion({
  origin,
  destination,
  onPress = () => {},
}: RouteSuggestionProps) {
  return (
    <TouchableOpacity style={styles.routeCardContent} onPress={onPress}>
      <Text style={styles.routeContentText}>{origin + ""}</Text>
      <FontAwesomeIcon icon={faArrowRightLong} size={15} color={"#0C6BFF"} />
      <Text style={styles.routeContentText}>{destination + ""}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  routeCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding:15,
    alignItems: "center",
    alignContent: "center",
  },
  routeContentText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0C6BFF",
    alignItems: "center",
  },
});
