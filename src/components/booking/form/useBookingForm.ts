import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { bookingFormSchema, type BookingFormValues } from "./BookingFormSchema";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { BookingDetails, EventInfo } from "./types";
import { TICKET_PRICE_TTC } from "@/components/admin/revenue/RevenueStats";

const fetchEventInformation = async () => {
  const { data, error } = await supabase
    .from("event_information")
    .select("*")
    .single();

  if (error) throw error;
  return data as EventInfo;
};

export const useBookingForm = () => {
  const { toast } = useToast();
  const [showQRCode, setShowQRCode] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<BookingDetails | null>(null);
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
    
    const { data: availabilityCheck, error: availabilityError } = await supabase.rpc(
      'check_tickets_availability',
      { requested_tickets: parseInt(values.numberOfTickets) }
    );

    if (availabilityError || !availabilityCheck) {
      console.error('Availability check failed:', availabilityError || 'No tickets available');
      throw new Error('Les billets demandés ne sont plus disponibles ou l\'événement est passé');
    }
    
    const response = await supabase.functions.invoke('create-checkout-session', {
      body: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        numberOfTickets: values.numberOfTickets,
        unitPriceTTC: TICKET_PRICE_TTC,
      },
    });

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
      
      const link = document.createElement('a');
      link.href = checkoutUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Redirection vers la page de paiement",
        description: "Une nouvelle fenêtre va s'ouvrir pour finaliser votre paiement.",
        variant: "default",
      });
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue lors de la création du paiement. Veuillez réessayer.",
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