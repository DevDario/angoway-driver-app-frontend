import { api } from "./axios-instance"
import {z} from "zod"
import { loginSchema } from "../schemas/loginSchema"

type LoginUseCaseProps = z.infer<typeof loginSchema>

export const loginUseCase = async ({ phone, password }: LoginUseCaseProps) => {
    const response = await api.post("/auth/driver/login", {
        phone,
        password
    })
    return response.data
}