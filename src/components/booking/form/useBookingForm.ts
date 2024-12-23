import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { bookingFormSchema, type BookingFormValues } from "./BookingFormSchema";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const fetchEventInformation = async () => {
  const { data, error } = await supabase
    .from("event_information")
    .select("*")
    .single();

  if (error) throw error;
  return data;
};

export const useBookingForm = () => {
  const { toast } = useToast();
  const [showQRCode, setShowQRCode] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<any>(null);
  
  const { data: eventInfo } = useQuery({
    queryKey: ["eventInformation"],
    queryFn: fetchEventInformation,
  });
  
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      numberOfTickets: "1",
    },
  });

  const createStripeSession = async (values: BookingFormValues) => {
    try {
      const response = await supabase.functions.invoke('create-checkout-session', {
        body: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          numberOfTickets: values.numberOfTickets,
        },
      });

      if (response.error) {
        console.error('Error response from Stripe session creation:', response.error);
        throw new Error(response.error.message);
      }
      
      const { url } = response.data;
      if (url) {
        window.location.href = url;
      } else {
        console.error('No checkout URL received:', response.data);
        throw new Error('Erreur lors de la création de la session de paiement');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  };

  const onSubmit = async (values: BookingFormValues) => {
    try {
      await createStripeSession(values);
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du paiement. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    showQRCode,
    setShowQRCode,
    currentBooking,
  };
};