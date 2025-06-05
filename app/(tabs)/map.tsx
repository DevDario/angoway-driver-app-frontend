import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { useBus } from "../hooks/useBus";
import { Polyline } from "react-native-maps";

export default function Map() {
  const { busDetails } = useBus()
  const { data } = busDetails
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -8.839,
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
            latitude: Number(data?.route.originLat),
            longitude: Number(data?.route.originLng),
          },
          zoom: 15,
          heading: 30,
          pitch: 90,
          altitude: 20,
        }}
      >
        <Polyline
          coordinates={[
            {
              latitude: Number(data?.route.originLat),
              longitude: Number(data?.route.originLng),
            },
            {
              latitude: Number(data?.route.destinationLat),
              longitude: Number(data?.route.destinationLng),
            },
          ]}
          strokeColor="#0C6BFF"
          strokeWidth={4}
        />
      </MapView>
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
