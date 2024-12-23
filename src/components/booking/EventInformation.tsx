import { MapPin } from "lucide-react";

export const EventInformation = () => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20">
      <div className="flex items-start gap-4 text-white">
        <MapPin className="h-6 w-6 shrink-0 mt-1 text-primary" />
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-primary">Informations sur l'événement</h2>
          <p className="text-white text-lg">
            La soirée aura lieu le <span className="font-semibold">lundi 10 mars 2025</span> au Matmut Stadium<br />
            353 Avenue Jean Jaurès, 69007 Lyon
          </p>
        </div>
      </div>
    </div>
  );
};