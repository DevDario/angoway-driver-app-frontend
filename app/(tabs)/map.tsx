import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";

export default function Map() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -8.8390,
          longitude: 13.2894,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsMyLocationButton={true}
        showsUserLocation={true}
        showsTraffic={true}
        pitchEnabled={true}
        followsUserLocation={true}
        camera={{
          center: {
            latitude: -8.8390,
            longitude: 13.2894,
          },
          zoom: 15,
          heading: 30,
          pitch: 120,
          altitude: 20,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
