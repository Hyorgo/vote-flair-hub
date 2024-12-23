import { MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const fetchEventInformation = async () => {
  const { data, error } = await supabase
    .from("event_information")
    .select("*")
    .single();

  if (error) throw error;
  return data;
};

export const EventInformation = () => {
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

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20">
      <div className="flex items-start gap-4 text-white">
        <MapPin className="h-6 w-6 shrink-0 mt-1 text-primary" />
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-primary">Informations sur l'événement</h2>
          <p className="text-white text-lg">
            La soirée aura lieu le <span className="font-semibold">{formattedDate}</span> à {eventInfo.location}<br />
            {eventInfo.address}
          </p>
        </div>
      </div>
    </div>
  );
};