import { QRCodeSVG } from "qrcode.react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface BookingQRCodeProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: {
    firstName: string;
    lastName: string;
    email: string;
    numberOfTickets: number;
    eventDate: Date;
    eventLocation: string;
    eventAddress: string;
  };
}

export const BookingQRCode = ({ isOpen, onClose, bookingDetails }: BookingQRCodeProps) => {
  const formattedDate = format(new Date(bookingDetails.eventDate), "EEEE d MMMM yyyy", { locale: fr });
  
  const qrData = JSON.stringify({
    firstName: bookingDetails.firstName,
    lastName: bookingDetails.lastName,
    email: bookingDetails.email,
    numberOfTickets: bookingDetails.numberOfTickets,
    eventDate: formattedDate,
    eventLocation: bookingDetails.eventLocation,
    eventAddress: bookingDetails.eventAddress,
  });

  const handleDownload = () => {
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
      const pngFile = canvas.toDataURL("image/png");
      
      const downloadLink = document.createElement("a");
      downloadLink.download = `reservation-${bookingDetails.lastName}-${bookingDetails.firstName}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
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
          <Button onClick={handleDownload} className="w-full">
            Télécharger le QR Code
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};