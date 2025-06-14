import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useBus } from "../hooks/useBus";
import Button from "../components/Button";
import AlertModal from "../components/AlertModal";
import ChangeRouteDialog from "../components/ChangeRouteDialog";
import { useState, useEffect } from "react";
import { updateBusDetails } from "../types/update-bus-details";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowRightArrowLeft,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { useAlertNotifications } from "../hooks/useAlertNotifications";
import DecisionModal from "../components/DecisionModal";

export default function Manage() {
  const { busDetails } = useBus();
  const { isLoading, data } = busDetails;
  const { updateBusDetails, error } = useBus();
  const { changeBusRoute } = useBus();

  const { queryRoutes } = useBus();
  const [query, setQuery] = useState<string>("");
  const { data: suggestions = [], isError } = queryRoutes(query);

  const [seats, setSeats] = useState(0);
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
  const [isDecisionModalVisible, setIsDecisionModalVisible] =
    useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);
  const [busCapacity, setBusCapacity] = useState(0);

  useEffect(() => {
    if (data?.currentLoad !== undefined) {
      setSeats(data.currentLoad);
    }

    if (data?.capacity !== undefined) {
      setBusCapacity(data.capacity);
    }
  }, [data]);

  function handleDataUpdate(data: updateBusDetails) {
    updateBusDetails.mutate(data);
  }

  function handleAddSeat() {
    if (seats < busCapacity) {
      const updatedSeats = seats + 1;
      setSeats(updatedSeats);
      handleDataUpdate({ currentLoad: updatedSeats });
    }
  }

  function handleRemoveSeat() {
    if (seats > 0) {
      const updatedSeats = seats - 1;
      setSeats(updatedSeats);
      handleDataUpdate({ currentLoad: updatedSeats });
    }
  }

  function handleStatusUpdate(status: string) {
    handleDataUpdate({ status });

    //apply strattegy design later
    if (status === "ACCIDENT") {
      useAlertNotifications({
        type: "ACCIDENT",
        message: "Um autocarro teve um ACCIDENT !",
      });
      setAlertMessage("Um alerta foi enviado para a central");
    }

    if (status === "Avaria Total") {
      useAlertNotifications({
        type: "Avaria Total",
        message: "Um autocarro sofreu Avaria Total !",
      });
      setAlertMessage("Um alerta foi enviado para a central");
    }

    if (status === "Manutenção") {
      useAlertNotifications({
        type: "Manutenção",
        message: "Um autocarro teve que parar para fazer Manutenção !",
      });
      setAlertMessage("Um alerta foi enviado para a central");

      setIsDecisionModalVisible(true);
    }
  }

  function handleSearch(query: string) {
    setQuery(query);
  }

  function handleRouteChange(routeId: number) {
    setSelectedRoute(routeId);
    changeBusRoute.mutate(routeId);
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
        <Text style={styles.seatsLabel}>Lugares Ocupados</Text>
        <View style={styles.seatsManagmentContainer}>
          <Text style={styles.seatsNumber}>{seats}</Text>
          <View style={styles.customButtonStyleContainer}>
            <Button
              buttonStyle={styles.customButtonStyle}
              text="Adicionar"
              onPress={handleAddSeat}
              disabled={
                data?.status === "ACCIDENT" ||
                data?.status === "Manutenção" ||
                data?.status === "Avaria Total" ||
                data?.status === "OFF_SERVICE"
              }
            />
            <Button
              buttonStyle={styles.customButtonStyle}
              text="Remover"
              onPress={handleRemoveSeat}
              disabled={
                data?.status === "ACCIDENT" ||
                data?.status === "Manutenção" ||
                data?.status === "Avaria Total" ||
                data?.status === "OFF_SERVICE"
              }
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
            onPress={() => handleStatusUpdate("ACCIDENT")}
            disabled={
              data?.status === "ACCIDENT" ||
              data?.status === "Avaria Total" ||
              data?.status === "OFF_SERVICE" ||
              data?.status === "Manutenção"
            }
          />
          <Button
            buttonStyle={styles.customButtonStyle}
            text="Manutenção"
            onPress={() => handleStatusUpdate("Manutenção")}
            disabled={
              data?.status === "ACCIDENT" ||
              data?.status === "Avaria Total" ||
              data?.status === "OFF_SERVICE" ||
              data?.status === "Manutenção"
            }
          />
          <Button
            buttonStyle={styles.customButtonStyle}
            text="Avaria Total"
            onPress={() => handleStatusUpdate("Avaria Total")}
            disabled={
              data?.status === "ACCIDENT" ||
              data?.status === "Avaria Total" ||
              data?.status === "OFF_SERVICE"
            }
          />
        </View>
      </View>
      <View style={styles.routeManagment}>
        <View style={styles.separator}></View>
        <View style={styles.routeManagmentHeader}>
          <Text style={styles.routeLabel}>Mudar Rota</Text>
          <TouchableOpacity
            style={styles.routeManagmentHeaderIconBox}
            onPress={() => setIsDialogVisible(true)}
            disabled={
              data?.status === "ACCIDENT" ||
              data?.status === "Manutenção" ||
              data?.status === "Avaria Total" ||
              data?.status === "OFF_SERVICE"
            }
          >
            <FontAwesomeIcon
              icon={faArrowRightArrowLeft}
              size={20}
              color={"#FCFCFB"}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.routeCardContent}
          onPress={() => setIsDialogVisible(true)}
          disabled={
            data?.status === "ACCIDENT" ||
            data?.status === "Manutenção" ||
            data?.status === "Avaria Total" ||
            data?.status === "OFF_SERVICE"
          }
        >
          <Text style={styles.routeContentText}>{data?.route.origin + ""}</Text>
          <FontAwesomeIcon
            icon={faArrowRightLong}
            size={20}
            color={"#0C6BFF"}
          />
          <Text style={styles.routeContentText}>
            {data?.route.destination + ""}
          </Text>
        </TouchableOpacity>
      </View>

      {alertMessage && (
        <View>
          <AlertModal text={alertMessage} type={"warning"} />
        </View>
      )}

      {error !== null && (
        <View>
          <AlertModal text={error} type={"error"} />
        </View>
      )}

      {isDialogVisible === true && (
        <ChangeRouteDialog
          suggestions={isError ? [] : suggestions}
          onSearch={handleSearch}
          value={query}
          onSelect={(route) => handleRouteChange(route.id)}
        />
      )}

      {isDecisionModalVisible === true && (
        <DecisionModal
          message="A situação foi/pode ser resolvida ?"
          cancelText="Não"
          confirmText="Sim"
          key={"maintnance-status-decision-modal"}
          onConfirm={() => handleStatusUpdate("IN_TRANSIT")}
          onCancel={() => handleStatusUpdate("OFF_SERVICE")}
        />
      )}

      <View style={styles.footer}>
        <Button
          buttonStyle={styles.footerButton}
          text={
            data?.status === "OFF_SERVICE"
              ? "Iniciar Viagem"
              : data?.status === "ACCIDENT"
              ? "Viagem Cancelada"
              : data?.status === "Manutenção"
              ? "Voltar à Viagem"
              : data?.status === "Avaria Total"
              ? "Viagem Cancelada"
              : "Encerrar Viagem"
          }
          onPress={() => {
            if (
              data?.status !== "ACCIDENT" &&
              data?.status !== "Avaria Total"
            ) {
              handleDataUpdate({
                status:
                  data?.status === "OFF_SERVICE"
                    ? "IN_TRANSIT"
                    : data?.status === "Manutenção"
                    ? "IN_TRANSIT"
                    : "OFF_SERVICE",
              });
            }
          }}
          disabled={
            data?.status === "ACCIDENT" || data?.status === "Avaria Total"
          }
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
    fontFamily:"Inter-Bold"
  },
  seatsLabel: {
    fontSize: 14,
    fontWeight: 300,
    fontFamily:"Inter-Light"
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
    fontFamily:"Inter-Bold"
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
    fontFamily:"Inter-Light"
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
  routeManagment: {
    flexDirection: "column",
    paddingTop: 15,
  },
  routeManagmentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    paddingTop: 5,
  },
  routeManagmentHeaderIconBox: {
    width: 40,
    height: 40,
    backgroundColor: "#0C6BFF",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  routeLabel: {
    fontSize: 14,
    fontWeight: 300,
    fontFamily:"Inter-Light"
  },
  routeOptions: {
    paddingTop: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  routeCardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingTop: 30,
  },
  routeContentText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0C6BFF",
    alignItems: "center",
    fontFamily:"Inter-Bold"
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
