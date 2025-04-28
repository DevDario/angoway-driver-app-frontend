import { IconProp, IconStyle } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

export interface ButtonProps extends TouchableOpacityProps {
  text: string;
  onPress: () => void;
  icon?: IconProp;
  iconColor?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

export default function Button({
  text = "click",
  onPress,
  icon,
  buttonStyle,
  textStyle,
  disabled,
  iconColor,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={onPress}
      disabled={disabled}
    >
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          style={{ color: iconColor ? iconColor : "#0C6DFF" }}
          size={13}
        />
      )}
      <Text style={[styles.text, textStyle]}>{text}</Text>
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
  text: {
    color: "#fcfcfb",
    fontWeight: 600,
  },
});
