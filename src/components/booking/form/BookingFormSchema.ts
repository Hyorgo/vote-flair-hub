import * as z from "zod";
import { validateEmailFormat, isDisposableEmail } from "@/utils/emailValidation";

export const bookingFormSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string()
    .min(1, "L'email est requis")
    .refine(validateEmailFormat, "Format d'email invalide")
    .refine((email) => !isDisposableEmail(email), "Les emails temporaires ne sont pas acceptés"),
  numberOfTickets: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 10, {
    message: "Veuillez sélectionner entre 1 et 10 places",
  }),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;