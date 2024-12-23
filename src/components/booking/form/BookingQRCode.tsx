import { QRCodeSVG } from "qrcode.react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { jsPDF } from "jspdf";

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
      
      // Créer le PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      // Ajouter le logo
      const logoImg = new Image();
      logoImg.src = "/og-image.png";
      logoImg.onload = () => {
        const aspectRatio = logoImg.width / logoImg.height;
        const logoWidth = 60;
        const logoHeight = logoWidth / aspectRatio;
        pdf.addImage(logoImg, "PNG", (210 - logoWidth) / 2, 20, logoWidth, logoHeight);

        // Ajouter le QR code
        pdf.addImage(qrCodeImage, "PNG", (210 - 80) / 2, 80, 80, 80);

        // Ajouter les détails de la réservation
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(16);
        pdf.text("Détails de votre réservation", 105, 180, { align: "center" });

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(12);
        const detailsY = 190;
        pdf.text(`Nom: ${bookingDetails.lastName} ${bookingDetails.firstName}`, 20, detailsY);
        pdf.text(`Email: ${bookingDetails.email}`, 20, detailsY + 8);
        pdf.text(`Nombre de places: ${bookingDetails.numberOfTickets}`, 20, detailsY + 16);

        // Ajouter les informations sur l'événement
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(14);
        pdf.text("Informations sur l'événement", 105, 240, { align: "center" });

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(12);
        const eventY = 250;
        pdf.text(`Date: ${formattedDate}`, 20, eventY);
        pdf.text(`Lieu: ${bookingDetails.eventLocation}`, 20, eventY + 8);
        pdf.text(`Adresse: ${bookingDetails.eventAddress}`, 20, eventY + 16);

        // Sauvegarder le PDF
        pdf.save(`reservation-${bookingDetails.lastName}-${bookingDetails.firstName}.pdf`);
      };
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