import * as z from 'zod';
import { Config } from "../config";

export const validations = {
    email: z.string({required_error: "L'adresse email est obligatoire"})
        .email({ message: "Adresse email invalide" }),
    password: z.string({required_error: "Le mot de passe est obligatoire"})
        .regex(new RegExp(Config.PASSWORD_REGEX), "Votre mot de passe doit contenir au moins 8 caractères avec au moins 1 lettre majuscule, 1 lettre minuscule et 1 chiffre."),
}