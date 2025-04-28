import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useBus } from "../hooks/useBus";
import Button from "../components/Button";
import AlertModal from "../components/AlertModal";

export default function Manage() {
  const { data, isLoading } = useBus().useBusDetails;
  const { useUpdateBusDetails, error } = useBus();

  function handleDataUpdate(data: any) {
    useUpdateBusDetails.mutate(data);
  }

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
        <Text style={styles.headerText}>Gerenciar</Text>
      </View>
      <View style={styles.seatsManagment}>
        <Text style={styles.seatsLabel}>Lugares Vagos</Text>
        <View style={styles.seatsManagmentContainer}>
          <Text style={styles.seatsNumber}>{data?.currentLoad}</Text>
          <View style={styles.customButtonStyleContainer}>
            <Button
              buttonStyle={styles.customButtonStyle}
              text="Adicionar"
              onPress={() => {}}
            />
            <Button
              buttonStyle={styles.customButtonStyle}
              text="Remover"
              onPress={() => {}}
            />
          </View>
        </View>
      </View>
      <View style={styles.statusManagment}>
        <View style={styles.separator}></View>
        <Text style={styles.statusLabel}>Ações Rápidas</Text>
        <View style={styles.statusOptions}>
          <Button
            buttonStyle={styles.customButtonStyle}
            text="Acidente"
            onPress={() => handleDataUpdate}
          />
          <Button
            buttonStyle={styles.customButtonStyle}
            text="Manutenção"
            onPress={() => handleDataUpdate}
          />
          <Button
            buttonStyle={styles.customButtonStyle}
            text="Avaria Total"
            onPress={() => handleDataUpdate}
          />
        </View>
      </View>

      {error !== null && (
        <View>
          <AlertModal text={error} type={"error"} />
        </View>
      )}

      <View style={styles.footer}>
        <Button
          buttonStyle={styles.footerButton}
          text="Encerrar Viagem"
          onPress={() => {}}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
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
  seatsLabel: {
    fontSize: 14,
    fontWeight: 300,
  },
  seatsManagment: {
    flexDirection: "column",
    paddingTop: 15,
  },
  seatsManagmentContainer: {
    flexDirection: "column",
    gap: 10,
  },
  seatsNumber: {
    fontSize: 60,
    fontWeight: 800,
    color: "#212121",
  },
  customButtonStyleContainer: {
    flexDirection: "row",
    gap: 10,
  },
  customButtonStyle: {
    width: 125,
    height: 53,
    backgroundColor: "#0C6BFF",
    color: "#FCFCFB",
    gap: 5,
  },
  statusManagment: {
    flexDirection: "column",
    paddingTop: 15,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: 300,
  },
  separator: {
    marginVertical: 15,
    width: "100%",
    height: 1,
    backgroundColor: "#0C6BFF",
  },
  statusOptions: {
    paddingTop: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  footer: {
    flex: 1,
    top: 40,
    alignContent: "center",
    alignItems: "center",
  },
  footerButton: {
    width: "100%",
    height: 53,
    backgroundColor: "#0C6BFF",
  },
});
