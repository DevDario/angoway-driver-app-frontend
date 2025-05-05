import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";

interface InfoCardProps {
  label: string;
  value: string;
  subInfo?: string;
  valueTextSize?: number;
  subInfoTextSize?: number;
}

export default function InfoCard({
  label,
  value,
  subInfo,
  valueTextSize = 35,
  subInfoTextSize = 14,
}: InfoCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.content}>
        <Text style={[styles.value,{fontSize:valueTextSize}]}>{value}</Text>
        <Text style={[styles.subInfo,{fontSize: subInfoTextSize}]}>{subInfo}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 140,
    height: 120,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#0C6BFF",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  label: {
    fontSize: 13,
    fontWeight: 300,
    color: "#FCFCFB",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  value: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#FCFCFB",
  },
  subInfo: {
    fontSize: 14,
    fontWeight: 300,
    color: "#FCFCFB",
    top: 6,
  },
});
