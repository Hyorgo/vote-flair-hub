import { jsPDF } from "jspdf";
import { BookingDetails } from "./types";

interface BookingPDFProps {
  bookingDetails: BookingDetails;
  qrCodeImage: string;
  formattedDate: string;
  eventInfo: {
    location: string;
    address: string;
  } | null;
}

export const generateBookingPDF = ({
  bookingDetails,
  qrCodeImage,
  formattedDate,
  eventInfo,
}: BookingPDFProps) => {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  // Ajouter le logo
  const logoImg = new Image();
  logoImg.src = "/lovable-uploads/23c9d707-c3dd-4f44-b20d-a5947339639f.png";
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
    pdf.text("Statut du paiement: Confirmé", 20, detailsY + 24);

    // Ajouter les informations sur l'événement
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text("Informations sur l'événement", 105, 240, { align: "center" });

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    const eventY = 250;
    if (eventInfo) {
      pdf.text(`Date: ${formattedDate}`, 20, eventY);
      pdf.text(`Lieu: ${eventInfo.location}`, 20, eventY + 8);
      pdf.text(`Adresse: ${eventInfo.address}`, 20, eventY + 16);
    }

    // Sauvegarder le PDF
    pdf.save(`reservation-${bookingDetails.lastName}-${bookingDetails.firstName}.pdf`);
  };
};