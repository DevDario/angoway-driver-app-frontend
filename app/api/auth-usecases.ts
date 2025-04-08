import { api } from "./axios-instance"
import {z} from "zod"
import { loginSchema } from "../schemas/loginSchema"

type LoginUseCaseProps = z.infer<typeof loginSchema>

export const loginUseCase = async ({ number, password }: LoginUseCaseProps) => {
    const response = await api.post("/auth/login", {
        number,
        password
    })
    return response.data
}