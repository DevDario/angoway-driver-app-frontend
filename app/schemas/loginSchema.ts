import { z } from "zod";

export const loginSchema = z.object({
    number: z
        .string()
        .nonempty("O número de telefone é obrigatório")
        .min(9, "O número deve ter pelo menos 9 dígitos")
        .max(9, "O número deve ter no máximo 9 dígitos")
        .regex(/^(?:\+244|244)?9[1-9]\d{7}$/, "Formato de telefone inválido (deve ser 9xx xxx xxx)"),
    password: z
        .string()
        .nonempty("A senha é obrigatória")
        .min(8, "A senha deve ter pelo menos 8 caracteres")
        .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
        .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
        .regex(/\d/, "A senha deve conter pelo menos um número")
})