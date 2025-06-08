import { View, StyleSheet } from "react-native";
import MapView,{ Marker, Callout } from "react-native-maps";
import { useBus } from "../hooks/useBus";
import { Polyline } from "react-native-maps";
import { useEffect, useState } from "react";
import { StopResponse } from "../types/stop-response";
import { useGetStops } from "../hooks/useStopQuerys";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBusSimple } from "@fortawesome/free-solid-svg-icons";

export default function Map() {
  const { busDetails } = useBus();
  const [stops, setStops] = useState<StopResponse[]>([]);
  const { data: fetchedStops } = useGetStops();
  const { data } = busDetails;

  useEffect(() => {
    if (fetchedStops !== undefined) setStops(fetchedStops);
  }, [fetchedStops]);


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
        {stops.length > 0 ? (
          stops.map((stop) => (
            <Marker
              id={stop.id + ""}
              coordinate={{
                latitude: stop.latitude,
                longitude: stop.longitude,
              }}
              image={require("../../assets/images/bustopIcon.png")}
              style={{
                width: 25,
                height: 25,
              }}
            >
              <Callout>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "2px",
                    }}
                  >
                    <FontAwesomeIcon
                      color="#0C6BFF"
                      size={15}
                      icon={faBusSimple}
                    />
                    <strong style={{ fontWeight: "bold", color: "#0C6BFF" }}>
                      {stop.name === "N/A"
                        ? `[${stop.latitude},${stop.longitude}]`
                        : stop.name}
                    </strong>
                  </div>
                </div>
              </Callout>
            </Marker>
          ))
        ) : (
          <></>
        )}
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
