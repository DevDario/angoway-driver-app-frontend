import { KeyboardTypeOptions, StyleSheet, TextInput } from "react-native";

export default function Input({
  placeholder,
  onChangeText,
  styles,
  value,
  keyboardType,
  secureTextEntry,
}: {
  placeholder: string;
  onChangeText: (text: string) => void;
  styles?: object;
  value: string;
  keyboardType: KeyboardTypeOptions;
  secureTextEntry?: boolean;
}) {
  return (
    <TextInput
      style={[style.input, styles]}
      placeholder={placeholder}
      onChangeText={onChangeText}
      placeholderTextColor={"#3333"}
      keyboardType={keyboardType}
      value={value}
      secureTextEntry={secureTextEntry}
    />
  );
}

const style = StyleSheet.create({
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#0C6DFF",
    width: "100%",
    fontSize: 16,
    paddingBottom: 13,
    color: "#212121",
    textAlign: "left",
  },
});
