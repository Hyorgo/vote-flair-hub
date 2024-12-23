import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { bookingFormSchema, type BookingFormValues } from "./BookingFormSchema";
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
  const [isLoading, setIsLoading] = useState(false);
  
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
    console.log('Creating Stripe session with values:', values);
    
    const response = await supabase.functions.invoke('create-checkout-session', {
      body: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        numberOfTickets: values.numberOfTickets,
      },
    });

    console.log('Stripe session response:', response);

    if (response.error) {
      console.error('Error response from Stripe session creation:', response.error);
      throw new Error(response.error.message);
    }
    
    const { url } = response.data;
    if (!url) {
      console.error('No checkout URL received:', response.data);
      throw new Error('Erreur lors de la création de la session de paiement');
    }

    return url;
  };

  const onSubmit = async (values: BookingFormValues) => {
    try {
      setIsLoading(true);
      const checkoutUrl = await createStripeSession(values);
      
      // Créer un nouvel élément <a> et simuler un clic
      const link = document.createElement('a');
      link.href = checkoutUrl;
      link.target = '_blank'; // Ouvrir dans un nouvel onglet
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Afficher un message de confirmation
      toast({
        title: "Redirection vers la page de paiement",
        description: "Une nouvelle fenêtre va s'ouvrir pour finaliser votre paiement.",
        variant: "default",
      });
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du paiement. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    showQRCode,
    setShowQRCode,
    currentBooking,
    isLoading,
  };
};