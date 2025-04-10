import { View, Text, StyleSheet } from "react-native";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";




export default function Index() {
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Dashboard</Text>
            </View>
            <View style={styles.routeCard}>
                <Text style={styles.routeCardLabel}>Rota Atual</Text>
                <View style={styles.routeCardContent}>
                      <Text style={styles.routeContentText}>Benfica</Text>
                      <FontAwesomeIcon icon={faArrowRightLong} size={20} color={"#FCFCFB"} />
                      <Text style={styles.routeContentText}>Kilamba</Text>
                </View>
            </View>
        </View>
    )
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
      headerText:{
        fontSize: 19,
        fontWeight: "bold",
        color: "#0C6BFF"
      },
      routeCard:{
        width: "100%",
        height: 130,
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#0C6BFF"
      },
      routeCardLabel:{
        fontSize: 14,
        fontWeight: 400,
        color: "#FCFCFB"
      },
      routeCardContent:{
        flexDirection:"row",
        alignItems: "center",
        justifyContent: "space-evenly",
        paddingVertical:25
      },
      routeContentText:{
        fontSize: 18,
        fontWeight: "bold",
        color: "#FCFCFB",
        alignItems:"center"
      }
})