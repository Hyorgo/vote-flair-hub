import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { validateEmailFormat } from "@/utils/emailValidation";
import { Database } from "@/integrations/supabase/types";

export const NotificationForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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
  );
};