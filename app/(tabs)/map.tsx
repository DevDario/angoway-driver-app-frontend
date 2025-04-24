import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { requestLocationPermission } from "../utils/request-location-permission";
import { useDriverLocation } from "../hooks/useDriverLocation";
import MapView from "react-native-maps";

export default function Map() {
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    const requestPermissionForLocation = async () => {
      const granted = await requestLocationPermission();
      setPermissionGranted(granted);
    };
    requestPermissionForLocation();
  }, []);

  useDriverLocation(permissionGranted);

  if (!permissionGranted) {
    return (
        <View style={styles.loadingContainer}>
             <ActivityIndicator style={{justifyContent:"center", alignItems:"center", backgroundColor:"#FCFCB"}} size="large" color="#0C6BFF" />
             <Text style={styles.permissionText}>Aguardando Permissão</Text>
        </View>
   );
  }

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
      />
    </View>
  );
}


const styles = StyleSheet.create({
    loadingContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
        gap:10
    },
    permissionText:{
        fontSize:14,
        fontWeight:"bold",
        color:"#0C6BFF"
    },
    container:{
       flex:1
    },
    map:{
        flex:1,
        width:"100%",
        height:"100%"
    }
})