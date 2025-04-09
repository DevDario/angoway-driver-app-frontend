import { View, Text, StyleSheet } from "react-native";



export default function Index() {
    return(
        <View style={styles.container}>
            <Text>Dashboard</Text>
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
})