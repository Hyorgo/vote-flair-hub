import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PersonalInfoFields } from "./form/PersonalInfoFields";
import { EmailField } from "./form/EmailField";
import { TicketSelection } from "./form/TicketSelection";
import { useBookingForm } from "./form/useBookingForm";
import { BookingQRCode } from "./form/BookingQRCode";
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export const BookingForm = () => {
  const { form, onSubmit, showQRCode, setShowQRCode, currentBooking, isLoading } = useBookingForm();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");
    const bookingData = searchParams.get("bookingData");

    if (success === "true" && bookingData) {
      const decodedData = JSON.parse(decodeURIComponent(bookingData));
      navigate("/thanks", { 
        state: { 
          success: true,
          bookingDetails: decodedData
        }
      });
    } else if (canceled === "true") {
      navigate("/thanks", { 
        state: { 
          success: false,
          error: "Le paiement a été annulé. Vous pouvez réessayer quand vous le souhaitez."
        }
      });
    }
  }, [searchParams, toast, navigate]);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 sm:p-8 border border-white/20">
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
          <PersonalInfoFields form={form} />
          <EmailField form={form} />
          <TicketSelection form={form} />
          
          <Button 
            type="submit" 
            className="w-full h-11 text-base bg-gradient-to-r from-accent via-primary to-primary-dark text-white hover:opacity-90"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Chargement...
              </>
            ) : (
              "Réserver"
            )}
          </Button>
        </form>
      </Form>

      {currentBooking && (
        <BookingQRCode
          isOpen={showQRCode}
          onClose={() => setShowQRCode(false)}
          bookingDetails={currentBooking}
        />
      )}
    </div>
  );
};