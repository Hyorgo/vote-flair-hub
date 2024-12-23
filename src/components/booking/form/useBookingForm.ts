import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { bookingFormSchema, type BookingFormValues } from "./BookingFormSchema";

export const useBookingForm = () => {
  const { toast } = useToast();
  
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      numberOfTickets: "1",
    },
  });

  const onSubmit = async (values: BookingFormValues) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .insert({
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          number_of_tickets: parseInt(values.numberOfTickets),
        });

      if (error) throw error;

      toast({
        title: "Réservation confirmée",
        description: "Nous vous avons envoyé un email de confirmation.",
      });

      form.reset();
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la réservation. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};