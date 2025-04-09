import { useForm, Controller } from "react-hook-form";
import { ScrollView, Text, StyleSheet, View, ActivityIndicator } from "react-native";
import Input from "@/app/components/Input"
import Button from "@/app/components/Button";
import {zodResolver} from "@hookform/resolvers/zod"
import { Link, useRouter } from "expo-router";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { loginSchema } from "@/app/schemas/loginSchema";
import { useAuth } from "@/app/hooks/useAuth";
import {z} from "zod"
import AlertModal from "@/app/components/AlertModal";

export default function Login() {
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      number: "",
      password: "",
    }
  })
  const { useLogin, isCheckingAuth, authError } = useAuth()
  type LoginFormData = z.infer<typeof loginSchema>

  function handleLogin(data: LoginFormData) {
    useLogin.mutate(data)
  }

  return(
    <Text>Login</Text>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
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
    alignItems: "flex-start",
  },
  inputLabel: {
    fontSize: 15,
    color: "#ACACAC",
  },
  phoneInputContainer: {
    width: "90%",
    gap: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  passwordInputContainer: {
    width: "90%",
    gap: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
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
  },
  error: {
    color: "#D9534F", // A softer red color
    fontSize: 13
  },
  loader: {
    marginTop: 10
  },
});