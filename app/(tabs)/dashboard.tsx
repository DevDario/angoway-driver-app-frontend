import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import InfoCard from "../components/InfoCard";
import MapView from "react-native-maps";
import { useBus } from "../hooks/useBus";

export default function Index() {
  const { useBusDetails } = useBus();
  const { data, isLoading, isError } = useBusDetails;

  // use skeleton loading
  if (isLoading) {
    return (
      <ActivityIndicator
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FCFCB",
        }}
        size="large"
        color="#0C6BFF"
      />
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Dashboard</Text>
        <View style={styles.routeStatusContainer}>
          <View style={styles.statusBar}>
            <Text style={styles.statusText}>{data?.status || "N/A"}</Text>
          </View>
        </View>
      </View>
      <View style={styles.routeCard}>
        <Text style={styles.routeCardLabel}>Rota Atual</Text>
        <View style={styles.routeCardContent}>
          <Text style={styles.routeContentText}>
            {data?.route.origin + ""}
          </Text>
          <FontAwesomeIcon
            icon={faArrowRightLong}
            size={20}
            color={"#FCFCFB"}
          />
          <Text style={styles.routeContentText}>
            {data?.route.destination + ""}
          </Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <InfoCard
          label="Lugares"
          value={data?.currentLoad + ""}
          subInfo={"/" + data?.capacity}
        />
        <InfoCard
          label="Chegada Em (est)"
          value={data?.route.estimatedTime + ""}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>Detalhes</Text>
        <View style={styles.detailsContent}>
          <InfoCard
            label="Paragens"
            value={data?.numberOfStops + ""}
          />
          <InfoCard
            label={"Distância"}
            // mock value
            value={"12.5"}
            subInfo={"/Km"}
          />
        </View>
      </View>
      <View style={styles.destinationContainer}>
        <Text style={styles.destinationLabel}>Destino</Text>
        <View style={styles.destinationContent}>
          {/* draw a route from the origin point to the destination */}
          <MapView
            style={styles.map}
            initialRegion={{
              latitude:  -8.83682,
              longitude: 13.2443,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsTraffic={true}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    paddingBottom: 30,
    marginHorizontal: 30,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#0C6BFF",
  },
  routeCard: {
    width: "100%",
    height: 130,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#0C6BFF",
    marginBottom: 15,
  },
  routeCardLabel: {
    fontSize: 14,
    fontWeight: 300,
    color: "#FCFCFB",
  },
  routeCardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: 25,
  },
  routeContentText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FCFCFB",
    alignItems: "center",
  },
  routeStatusContainer: {
    width: 115,
    alignItems: "flex-end",
    paddingVertical: 20,
  },
  statusBar: {
    width: "100%",
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#0C6BFF",
    borderRadius: 10,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FCFCFB",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  detailsContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
  },
  detailsContent: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  detailsLabel: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#0C6BFF",
    paddingVertical: 15,
  },
  destinationContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingVertical: 20,
  },
  destinationContent: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  destinationLabel: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#0C6BFF",
    paddingBottom: 15,
  },
  map: {
    width: "100%",
    height: 170,
  },
});
