import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { EventInfo } from "./types";

interface EventDisplayProps {
  eventInfo: EventInfo;
  onEdit: () => void;
}

export const EventDisplay = ({ eventInfo, onEdit }: EventDisplayProps) => {
  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold">Informations sur l'événement</h2>
        <Button onClick={onEdit}>Modifier</Button>
      </div>

      <div className="space-y-4">
        <div>
          <p className="font-medium">Date et heure</p>
          <p>{format(new Date(eventInfo.event_date), "dd/MM/yyyy HH:mm")}</p>
        </div>

        <div>
          <p className="font-medium">Lieu</p>
          <p>{eventInfo.location}</p>
        </div>

        <div>
          <p className="font-medium">Adresse</p>
          <p>{eventInfo.address}</p>
        </div>

        <div>
          <p className="font-medium">Nombre total de billets</p>
          <p>{eventInfo.total_tickets}</p>
        </div>

        <div>
          <p className="font-medium">Billets restants</p>
          <p>{eventInfo.remaining_tickets}</p>
        </div>
      </div>
    </div>
  );
};