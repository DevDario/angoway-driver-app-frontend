import { View, Text, StyleSheet } from "react-native";



export default function Index() {
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Dashboard</Text>

            </View>
            <View style={styles.routeCard}>
                <Text style={styles.routeCardLabel}>Rota Atual</Text>
                <View style={styles.routeCardContent}>

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
        borderWidth: 2,
        borderColor: "#0C6BFF"
      },
      routeCardLabel:{
        fontSize: 14,
        fontWeight: 300,
        color: "#333"
      },
      routeCardContent:{
        
      }
})