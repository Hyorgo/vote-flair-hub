import { QRCodeSVG } from "qrcode.react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BookingDetails, EventInfo } from "./types";
import { generateBookingPDF } from "./BookingPDF";

const fetchEventInformation = async () => {
  const { data, error } = await supabase
    .from("event_information")
    .select("*")
    .single();

  if (error) throw error;
  return data as EventInfo;
};

interface BookingQRCodeProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: BookingDetails;
}

export const BookingQRCode = ({ isOpen, onClose, bookingDetails }: BookingQRCodeProps) => {
  const { data: eventInfo } = useQuery({
    queryKey: ["eventInformation"],
    queryFn: fetchEventInformation,
  });

  const formattedDate = eventInfo 
    ? format(new Date(eventInfo.event_date), "EEEE d MMMM yyyy", { locale: fr })
    : "";
  
  const qrData = JSON.stringify({
    ...bookingDetails,
    eventDate: formattedDate,
    eventLocation: eventInfo?.location,
    eventAddress: eventInfo?.address,
    paymentStatus: "confirmed",
  });

  const handleDownloadPDF = () => {
    const svg = document.querySelector("#booking-qr-code svg") as SVGElement;
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const qrCodeImage = canvas.toDataURL("image/png");
      
      generateBookingPDF({
        bookingDetails,
        qrCodeImage,
        formattedDate,
        eventInfo,
      });
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Votre QR Code de réservation</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <div id="booking-qr-code" className="bg-white p-4 rounded-lg">
            <QRCodeSVG
              value={qrData}
              size={256}
              level="H"
              includeMargin
            />
          </div>
          <Button onClick={handleDownloadPDF} className="w-full">
            Télécharger le PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};