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

  const sendConfirmationEmail = async (values: BookingFormValues) => {
    if (!eventInfo) return;

    const formattedDate = format(new Date(eventInfo.event_date), "EEEE d MMMM yyyy", { locale: fr });

    try {
      const response = await fetch("/functions/v1/send-booking-confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          numberOfTickets: parseInt(values.numberOfTickets),
          eventDate: formattedDate,
          eventLocation: eventInfo.location,
          eventAddress: eventInfo.address,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send confirmation email");
      }
    } catch (error) {
      console.error("Error sending confirmation email:", error);
      throw error;
    }
  };

  const onSubmit = async (values: BookingFormValues) => {
    try {
      const { error: bookingError } = await supabase
        .from('bookings')
        .insert({
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          number_of_tickets: parseInt(values.numberOfTickets),
        });

      if (bookingError) throw bookingError;

      await sendConfirmationEmail(values);

      if (eventInfo) {
        setCurrentBooking({
          ...values,
          numberOfTickets: parseInt(values.numberOfTickets),
          eventDate: eventInfo.event_date,
          eventLocation: eventInfo.location,
          eventAddress: eventInfo.address,
        });
        setShowQRCode(true);
      }

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
    showQRCode,
    setShowQRCode,
    currentBooking,
  };
};