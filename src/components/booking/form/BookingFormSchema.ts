import * as z from "zod";

export const bookingFormSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  numberOfTickets: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 10, {
    message: "Veuillez sélectionner entre 1 et 10 places",
  }),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;