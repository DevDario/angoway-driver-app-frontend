import { useForm, Controller } from "react-hook-form";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Modal,
  Platform,
} from "react-native";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/app/schemas/loginSchema";
import { useAuth } from "@/app/hooks/useAuth";
import { z } from "zod";
import AlertModal from "@/app/components/AlertModal";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Camera, CameraView } from "expo-camera";

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      phone: "",
      password: "",
    },
  });
  const { login, isCheckingAuth, authError } = useAuth();
  type LoginFormData = z.infer<typeof loginSchema>;

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScannerVisible, setIsScannerVisible] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [qrcodeFormatError, setQrCodeFormatError] = useState(false);
  const [inputValidationError, setInputValidationError] = useState(false);

  function handleLogin(data: LoginFormData) {
    login.mutate(data);
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  async function handleQRCodeScanned({ data }: { data: string }) {
    setScanned(true);
    setIsScannerVisible(false);

    try {
      const parsed = JSON.parse(data);

      if (!parsed.phone || !parsed.password) {
        setQrCodeFormatError(true);
      }

      setValue("phone", parsed.phone);
      setValue("password", parsed.password);

      const isValid = await trigger(["phone", "password"]);

      if (isValid) {
        handleSubmit(handleLogin)();
      } else {
        return setInputValidationError(true);
      }
    } catch (err) {
      return (
        <AlertModal text={"QR Code inválido ou mal formatado"} type={"error"} />
      );
    }
  }

  return (
    <>
      <ScrollView
        style={[styles.container]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Iniciar Sessão</Text>
          <Text style={styles.headerDescription}>
            Proporcione uma viagem segura para os nossos cidadãos e turistas.
          </Text>
        </View>

        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <View style={styles.phoneInputContainer}>
              <Text style={styles.inputLabel}>Seu Número</Text>
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, value } }) => (
                  <View>
                    <Input
                      placeholder={"Digite o seu número"}
                      value={value}
                      onChangeText={onChange}
                      keyboardType={"phone-pad"}
                    />
                    {errors.phone && (
                      <Text style={styles.error}>{errors.phone.message}</Text>
                    )}
                  </View>
                )}
              />
            </View>

            <View style={styles.passwordInputContainer}>
              <Text style={styles.inputLabel}>Senha</Text>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <View>
                    <Input
                      placeholder="Digite sua senha"
                      value={value}
                      onChangeText={onChange}
                      keyboardType={"default"}
                      secureTextEntry={true}
                    />
                    {errors.password && (
                      <Text style={styles.error}>
                        {errors.password.message}
                      </Text>
                    )}
                  </View>
                )}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              text={isCheckingAuth ? "Entrando..." : "Entrar"}
              buttonStyle={styles.loginButton}
              textStyle={{ color: "#121212" }}
              onPress={handleSubmit(handleLogin)}
              disabled={isCheckingAuth}
            />
          </View>

          {authError !== null && (
            <View>
              <AlertModal text={authError} type={"error"} />
            </View>
          )}

          {qrcodeFormatError && (
            <AlertModal
              text="QrCode inválido. Não foi possível obter as credenciais"
              type="error"
            />
          )}

          {inputValidationError && (
            <AlertModal text="QR Code contém dados inválidos." type="error" />
          )}

          {isCheckingAuth && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 15,
              }}
            >
              <ActivityIndicator size="large" color="#007bff" />
            </View>
          )}

          <View style={styles.footerButtons}>
            <Text>Ou</Text>

            <Button
              text={"Scanear Qr Code"}
              icon={faQrcode}
              buttonStyle={styles.optionLoginButton}
              textStyle={{ color: "#0C6BFF", fontWeight: "bold" }}
              onPress={() => {
                setScanned(false);
                setIsScannerVisible(true);
              }}
            />
          </View>
        </View>
      </ScrollView>

      {isScannerVisible && Platform.OS === "web" && (
        <AlertModal
          text={`Método não suportado \nno navegador.`}
          type="error"
        />
      )}

      {isScannerVisible && Platform.OS !== "web" && (
        <Modal visible={isScannerVisible} animationType="slide">
          <View style={{ flex: 1 }}>
            <CameraView
              style={{ flex: 1 }}
              onBarcodeScanned={scanned ? undefined : handleQRCodeScanned}
              barcodeScannerSettings={{
                barcodeTypes: ["qr", "pdf417", "code128"],
              }}
            />
            <View
              style={{
                position: "absolute",
                bottom: 30,
                left: 0,
                right: 0,
                alignItems: "center",
              }}
            >
              <Button
                text="Cancelar"
                onPress={() => setIsScannerVisible(false)}
                buttonStyle={{ width: 200 }}
              />
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 45,
    paddingBottom: 30,
    marginRight: 10,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 50,
    paddingLeft: 30,
    alignSelf: "flex-start",
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "700",
  },
  headerDescription: {
    fontSize: 16,
    fontWeight: "200",
    paddingTop: 15,
  },
  content: {
    width: "100%",
    alignItems: "center",
    gap: 30,
  },
  inputContainer: {
    width: "100%",
    gap: 35,
    paddingLeft: 30,
  },
  inputLabel: {
    fontSize: 15,
    color: "#ACACAC",
  },
  phoneInputContainer: {
    width: "90%",
    gap: 10,
    justifyContent: "flex-start",
  },
  passwordInputContainer: {
    width: "90%",
    gap: 10,
    justifyContent: "flex-start",
  },
  buttonContainer: {
    width: "100%",
    paddingTop: 10,
    alignItems: "flex-end",
    paddingRight: 30,
  },
  loginButton: {
    width: 173,
  },
  highlight: {
    color: "#0C6DFF",
    fontWeight: "700",
  },
  footerButtons: {
    width: "100%",
    paddingTop: 40,
    gap: 20,
    alignItems: "center",
  },
  optionLoginButton: {
    width: 300,
    backgroundColor: "#D9E8FF",
    borderColor: "#D9E8FF",
  },
  error: {
    color: "#D9534F",
    fontSize: 13,
  },
  loader: {
    marginTop: 10,
  },
});
