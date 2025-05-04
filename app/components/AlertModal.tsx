import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { faWarning, faClose, faCheck } from "@fortawesome/free-solid-svg-icons";

type ModalType = "error" | "warning" | "success"

export interface AlertModalProps {
    text: string;
    type: ModalType;
}


export default function AlertModal({ text, type }: AlertModalProps) {
    const [isVisible, setIsVisible] = useState(true)
    const icon = type === "error" ? faClose : faWarning || type === "success" ? faCheck : faClose

    return (
        <Modal visible={isVisible} transparent animationType="fade">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={{ width: 50, height: 50, borderRadius: 300, backgroundColor: "#0C6DFF", alignItems: "center", justifyContent: "center" }}>
                        <FontAwesomeIcon icon={icon} color="#FFF" size={30} />
                    </View>
                    <Text style={styles.modalText}>
                        {text}
                    </Text>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setIsVisible(false)}>
                        <Text style={styles.buttonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(189, 189, 189, 0.71)",
        filter: "blur(30)"
    },
    modalContent: {
        backgroundColor: "#FBFCFF",
        padding: 20,
        borderRadius: 20,
        width: "80%",
        height: 220,
        alignItems: "center",
        justifyContent: "space-between"
    },
    closeButton: {
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
    }
})