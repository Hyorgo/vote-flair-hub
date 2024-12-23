import React, { useState } from "react";
import { motion } from "framer-motion";
import { Timer } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { validateEmailFormat } from "@/utils/emailValidation";
import { Database } from "@/integrations/supabase/types";

interface VotingNotStartedMessageProps {
  startDate: Date;
}

export const VotingNotStartedMessage = ({ startDate }: VotingNotStartedMessageProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const timeUntilStart = formatDistanceToNow(startDate, {
    locale: fr,
    addSuffix: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmailFormat(email)) {
      toast({
        title: "Format d'email invalide",
        description: "Veuillez entrer une adresse email valide.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('vote_opening_notifications')
        .insert([{ email }] as Database['public']['Tables']['vote_opening_notifications']['Insert'][]);

      if (error?.code === '23505') {
        toast({
          title: "Email déjà enregistré",
          description: "Vous recevrez une notification à l'ouverture des votes.",
        });
      } else if (error) {
        throw error;
      } else {
        toast({
          title: "Inscription réussie !",
          description: "Vous serez notifié par email à l'ouverture des votes.",
        });
        setEmail("");
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto px-4"
    >
      <div className="bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 w-full relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
        
        <div className="flex flex-col items-center gap-6 text-center relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-full blur-xl" />
            <Timer className="h-16 w-16 text-primary relative animate-pulse" />
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
            Les votes ne sont pas encore ouverts
          </h2>
          
          <p className="text-lg text-navy/80 leading-relaxed max-w-sm">
            Les votes seront ouverts {timeUntilStart}.
            <span className="block mt-2 font-medium text-primary-dark">
              Inscrivez-vous pour être notifié de l'ouverture des votes !
            </span>
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/50"
                disabled={isSubmitting}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Inscription..." : "M'avertir de l'ouverture"}
            </Button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};