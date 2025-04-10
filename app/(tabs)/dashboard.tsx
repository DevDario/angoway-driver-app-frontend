import { View, Text, StyleSheet, ScrollView } from "react-native";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import InfoCard from "../components/InfoCard";




export default function Index() {
    return(
        <ScrollView style={styles.container}>
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
            <View style={styles.routeStatusContainer}>
                  <Text style={styles.statusLabel}>Status</Text>
                  <View style={styles.statusBar}>
                       <View style={styles.statusIndicator}></View>
                       <Text style={styles.statusText}> Em rota</Text>
                  </View>
            </View>
            <View style={styles.infoContainer}>
               <InfoCard 
                  label="Lugares"
                  value={"10"}
                  subInfo={"/30"}
               />
               <InfoCard 
                  label="Chegada Em (est)"
                  value={"45"}
                  subInfo={"Min"}
               />
            </View>
        </ScrollView>
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
      },
      routeStatusContainer:{
        width:"100%",
        alignItems:"flex-start",
        paddingVertical:20
      },
      statusLabel:{
        fontSize:14,
        fontWeight:"bold",
        color: "#0C6BFF",
        paddingBottom: 15
      },
      statusBar:{
        width:"100%",
        height:45,
        paddingHorizontal:10,
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"#0C6BFF",
        borderRadius:10
      },
      statusIndicator:{
        width: 15,
        height: 15,
        borderRadius: 20,
        backgroundColor:"#28A745" // change it dynamically
      },
      statusText:{
        fontSize: 14,
        fontWeight:"bold",
        color:"#FCFCFB",
        paddingLeft:10
      },
      infoContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        gap:10
      }
})