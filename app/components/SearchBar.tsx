import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

type SearchBarProps = {
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  onChangeText: (text: string) => void;
  value: string;
  maxLength?: number;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
};

export default function SearchBar({
  placeholder,
  style,
  onChangeText,
  value,
  maxLength,
  keyboardType = "default",
}: SearchBarProps) {
  return (
    <View style={[styles.searchContainer, style]}>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor={"#3333"}
        keyboardType={keyboardType}
        value={value}
        maxLength={maxLength}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  searchContainer: {
    height: 50,
    width: 270,
    borderColor: "#0C6BFF",
    borderWidth: 2,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 30,
    backgroundColor: "#FFF",
    borderRadius: 50,
  },
  input: {
    width: "100%",
    fontSize: 16,
    paddingBottom: 4,
    color: "#212121",
    textAlign: "left",
  },
});
