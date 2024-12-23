import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { BookingQRCode } from "@/components/booking/form/BookingQRCode";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ConfettiEffect } from "@/components/thanks/ConfettiEffect";

const Thanks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showQRCode, setShowQRCode] = useState(false);
  
  const { success, bookingDetails, error } = location.state || {};

  useEffect(() => {
    if (!location.state) {
      navigate('/booking');
      return;
    }

    if (success && bookingDetails) {
      setShowQRCode(true);
      toast({
        title: "Réservation confirmée !",
        description: "Votre paiement a été accepté. Vous allez recevoir un email de confirmation.",
        duration: 5000,
      });
    } else if (error) {
      toast({
        title: "Erreur de paiement",
        description: error,
        variant: "destructive",
        duration: 5000,
      });
    }
  }, [location.state, navigate, success, error, toast]);

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {success ? (
          <>
            <ConfettiEffect />
            <div className="text-center space-y-6">
              <h1 className="text-4xl font-bold text-white">
                Merci pour votre réservation !
              </h1>
              <p className="text-lg text-gray-200">
                Votre paiement a été accepté et votre réservation est confirmée.
              </p>
              {bookingDetails && (
                <BookingQRCode
                  isOpen={showQRCode}
                  onClose={() => setShowQRCode(false)}
                  bookingDetails={bookingDetails}
                />
              )}
            </div>
          </>
        ) : (
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold text-white">
              Une erreur est survenue
            </h1>
            <p className="text-lg text-red-400">
              {error || "Une erreur inattendue s'est produite."}
            </p>
          </div>
        )}
        
        <div className="mt-8 text-center">
          <Button 
            onClick={() => navigate('/booking')}
            className="bg-primary hover:bg-primary-dark transition-colors"
          >
            Retour à la page de réservation
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Thanks;