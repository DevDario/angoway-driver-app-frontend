import { View, Text, StyleSheet, ScrollView } from "react-native";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import InfoCard from "../components/InfoCard";
import MapView from "react-native-maps"
import { useEffect } from "react";





export default function Index() {

  useEffect(() => {
    async function getBusInformations() {

    }

    getBusInformations()
  }, [])


    return(
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Dashboard</Text>
                <View style={styles.routeStatusContainer}>
                  <View style={styles.statusBar}>
                       <Text style={styles.statusText}>Em Rota</Text>
                  </View>
            </View>
            </View>
            <View style={styles.routeCard}>
                <Text style={styles.routeCardLabel}>Rota Atual</Text>
                <View style={styles.routeCardContent}>
                      <Text style={styles.routeContentText}>Benfica</Text>
                      <FontAwesomeIcon icon={faArrowRightLong} size={20} color={"#FCFCFB"} />
                      <Text style={styles.routeContentText}>Kilamba</Text>
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
            <View style={styles.detailsContainer}>
               <Text style={styles.detailsLabel}>Detalhes</Text>
               <View style={styles.detailsContent}>
               <InfoCard 
                  label="Paragens"
                  value={"4"}
               />
               <InfoCard 
                  label={"Distância"}
                  value={"120"}
                  subInfo={"/Km"}
               />
               </View>
            </View>
            <View style={styles.destinationContainer}>
               <Text style={styles.destinationLabel}>Destino</Text>
               {/* MapView */}
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
        backgroundColor: "#0C6BFF",
        marginBottom:15
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
        width:115,
        alignItems:"flex-end",
        paddingVertical:20
      },
      statusBar:{
        width:"100%",
        height:45,
        flexDirection:"row",
        alignItems:"center",
        alignContent:"center",
        justifyContent:"center",
        backgroundColor:"#0C6BFF",
        borderRadius:10
      },
      statusText:{
        fontSize: 14,
        fontWeight:"bold",
        color:"#FCFCFB",
      },
      infoContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        gap:10
      },
      detailsContainer:{
        width:"100%",
        flexDirection:"column",
        justifyContent:"center",
      },
      detailsContent:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
        gap:10
      },
      detailsLabel:{
        fontSize:19,
        fontWeight:"bold",
        color:"#0C6BFF",
        paddingVertical:15
      },
      destinationContainer:{
        width:"100%",
        alignItems:"flex-start",
        paddingVertical:20
      },
      destinationLabel:{
        fontSize:19,
        fontWeight:"bold",
        color:"#0C6BFF",
        paddingBottom:15,
      },
      map:{
        width:"100%",
        height:350,
        borderRadius:10
      }
})