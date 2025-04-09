import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { TouchableOpacity, StyleSheet, Text, TouchableOpacityProps, StyleProp, ViewStyle } from "react-native";

export interface ButtonProps extends TouchableOpacityProps {
  text: string;
  onPress: () => void;
  icon?: IconProp;
  style?: StyleProp<ViewStyle>
}


export default function Button({ text = "click", onPress, icon, style }: ButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      {icon && <FontAwesomeIcon icon={icon} style={{ color: "#0C6DFF" }} />}
      <Text style={[styles.text]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 170,
    height: 53,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    borderColor: "#0C6DFF",
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: "none",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  text:{
    fontWeight:600,
  }
});