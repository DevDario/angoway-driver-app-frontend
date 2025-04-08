import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { faWarning, faClose, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function AlertModal({ text, type }: {text: string, type: string}) {
    const [isVisible, setIsVisible] = useState(true)

    return (
        <Modal visible={isVisible} transparent animationType="fade">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {type === "error" ? (
                        <View style={{ width: 50, height: 50, borderRadius: 300, backgroundColor: "#0C6DFF", alignItems: "center", justifyContent: "center" }}>
                            <FontAwesomeIcon icon={faClose} color="#FFF" size={30} />
                        </View>
                    ) : (
                        <View style={{ width: 50, height: 50, borderRadius: 300, backgroundColor: "#0C6DFF", alignItems: "center", justifyContent: "center" }}>
                            <FontAwesomeIcon icon={faWarning} color="#FFF" size={30} />
                        </View>
                    )}
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
        backgroundColor: "rgba(252, 252, 253, 0.71)",
        filter: "blur(30)"
    },
    modalContent: {
        backgroundColor: "#FBFCFF",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        height: 240,
        borderWidth: 2,
        borderColor: "#0C6DFF",
        alignItems: "center",
        justifyContent: "space-between"
    },
    closeButton: {
        width: 120,
        padding: 15,
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#0C6DFF",
    },
    modalText: {
        textAlign: "center",
        color: "#212121",
        fontWeight: "800",
        fontSize: 21,
    },
    buttonText: {
        textAlign: "center",
        fontWeight: "700",
        color: "#212121",
    }
})