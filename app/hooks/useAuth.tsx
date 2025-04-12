import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUseCase } from "../api/auth-usecases";
import { useEffect, useState } from "react";
import { getToken, saveToken, removeToken } from "../utils/secure-store";
import { useRouter } from "expo-router";
import { LoginResponse } from "../types/login-response";
import { AxiosError } from "axios";

export function useAuth() {
    const queryClient = useQueryClient()
    const router = useRouter()
    const [authToken, setAuthToken] = useState<string | null>(null)
    const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
    const [authError, setAuthError] = useState<string | null>(null);


    useEffect(() => {
        async function checkToken() {
            const token: string | null | undefined = getToken();
            setAuthToken(token || null);
            setIsCheckingAuth(false)
        }
        checkToken()
    }, []);

    const useLogin = useMutation({
        mutationFn: loginUseCase,
        onMutate: () => {
            setIsCheckingAuth(true)
            setAuthError(null)
        },
        onSuccess: async (data: LoginResponse) => {
            saveToken(data.access_token)
            setAuthToken(data.access_token)
            router.replace("/dashboard")
            queryClient.invalidateQueries(["user"])
        },
        onError: (error: AxiosError) => {
            setAuthError(error.message)
        },
        onSettled: () => {
            setIsCheckingAuth(false)
        },
    })

    const logout = async () => {
        removeToken();
        router.replace("./auth/login")
        queryClient.clear();
        }

    return {
        useLogin,
        logout,
        authToken,
        isCheckingAuth,
        authError
    }

}
