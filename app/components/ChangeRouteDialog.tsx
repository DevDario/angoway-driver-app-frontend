import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView
} from "react-native";
import SearchBar from "../components/SearchBar";
import RouteSuggestion from "./RouteSuggestion";

export default function ChangeRouteDialog({
  suggestions,
  onSearch,
  value,
}: {
  suggestions: { id: number; origin: string; destination: string }[];
    onSearch: (query: string) => void;
  value: string;
}) {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [routes, setRoutes] = useState<{
    id: number;
    origin: string;
    destination: string;
  }>({
    id: 0,
    origin: "",
    destination: "",
  });

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <SearchBar
              placeholder="Pesquise uma rota nova"
              onChangeText={onSearch}
              value={value}
              key={"search-route"}
            />
          </View>
          <ScrollView style={styles.suggestionsView} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            {suggestions.length === 0 ? (
              <Text style={styles.noResultsText}>Não Encontrada</Text>
            ) : (
              <FlatList
                data={suggestions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <RouteSuggestion
                    origin={item.origin}
                    destination={item.destination}
                    onPress={() => {
                      setRoutes(item);
                      setIsVisible(false);
                    }}
                  />
                )}
              />
            )}
          </ScrollView>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setIsVisible(false)}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setIsVisible(false)}
            >
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(189, 189, 189, 0.71)",
    filter: "blur(30)",
  },
  modalContent: {
    backgroundColor: "#FBFCFF",
    padding: 20,
    borderRadius: 20,
    width: "80%",
    height: 300,
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
  },
  suggestionsView: {
    flexDirection: "column",
    gap: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  actionButton: {
    width: 120,
    padding: 15,
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#0C6DFF",
  },
  modalText: {
    textAlign: "center",
    color: "#212121",
    fontWeight: "800",
    fontSize: 19,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "700",
    color: "#fff",
  },
  noResultsText: {
    textAlign: "center",
    color: "#212121",
    fontWeight: "600",
    fontSize: 16,
    marginTop: 20,
  },
});
