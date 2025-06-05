import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

export interface DecisionModalProps {
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DecisionModal({
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: DecisionModalProps) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 300,
              backgroundColor: "#0C6DFF",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesomeIcon icon={faQuestion} color="#FFF" size={30} />
          </View>
          <Text style={styles.modalText}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                onCancel();
                setIsVisible(false);
              }}
            >
              <Text style={styles.buttonText}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
                onConfirm();
                setIsVisible(false);
              }}
            >
              <Text style={styles.buttonText}>{confirmText}</Text>
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
  },
  modalContent: {
    backgroundColor: "#FBFCFF",
    padding: 20,
    borderRadius: 20,
    width: "89%",
    height: 210,
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: "15",
  },
  closeButton: {
    width: 125,
    padding: 15,
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#0C6DFF",
  },
  confirmButton: {
    width: 125,
    padding: 15,
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#0C6DFF",
    marginLeft: 5,
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
});
