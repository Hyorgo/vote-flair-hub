import { MapPin, CalendarPlus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { generateCalendarLink } from "@/utils/calendar";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const fetchEventInformation = async () => {
  const { data, error } = await supabase
    .from("event_information")
    .select("*")
    .single();

  if (error) throw error;
  return data;
};

export const EventInformation = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { data: eventInfo, isLoading } = useQuery({
    queryKey: ["eventInformation"],
    queryFn: fetchEventInformation,
  });

  if (isLoading) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20 animate-pulse">
        <div className="h-24 bg-white/20 rounded"></div>
      </div>
    );
  }

  if (!eventInfo) return null;

  const formattedDate = format(new Date(eventInfo.event_date), "EEEE d MMMM yyyy", { locale: fr });
  const isEventPassed = new Date(eventInfo.event_date) < new Date();
  const remainingTickets = eventInfo.remaining_tickets;

  const handleAddToCalendar = () => {
    const calendarLink = generateCalendarLink({
      date: new Date(eventInfo.event_date),
      location: eventInfo.location,
      address: eventInfo.address,
    });
    
    const link = document.createElement('a');
    link.href = calendarLink;
    link.download = 'soiree-des-trophees.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(calendarLink);

    toast({
      title: "Calendrier",
      description: "L'événement a été ajouté à votre calendrier",
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 mb-8 border border-white/20">
      <div className={`flex flex-col ${!isMobile ? 'sm:flex-row sm:items-start sm:justify-between' : ''} gap-4`}>
        <div className="flex items-start gap-4">
          <MapPin className="h-6 w-6 shrink-0 mt-1 text-primary" />
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-primary">
              Informations sur l'événement
            </h2>
            <p className="text-white text-base sm:text-lg">
              La soirée aura lieu le{" "}
              <span className="font-semibold">{formattedDate}</span> à{" "}
              {eventInfo.location}
              <br />
              {eventInfo.address}
            </p>
            {!isEventPassed && (
              <p className="mt-2 text-sm text-primary">
                {remainingTickets > 0 
                  ? `${remainingTickets} places encore disponibles`
                  : "Plus aucune place disponible"}
              </p>
            )}
            {isEventPassed && (
              <p className="mt-2 text-sm text-red-500">
                Cet événement est déjà passé
              </p>
            )}
          </div>
        </div>
        <Button
          variant="outline"
          className="text-primary border-primary hover:bg-primary hover:text-white w-full sm:w-auto"
          onClick={handleAddToCalendar}
        >
          <CalendarPlus className="mr-2 h-5 w-5" />
          {isMobile ? "Ajouter à mon calendrier" : "Ajouter au calendrier"}
        </Button>
      </div>
    </div>
  );
};