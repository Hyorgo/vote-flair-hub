import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export const useAdminAuth = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const signIn = async () => {
      const { error } = await supabase.auth.signInWithPassword({
        email: 'g.sauvat@ideai.fr',
        password: 'Gregolimano009:)'
      });
      
      if (error) {
        console.error('Erreur de connexion:', error.message);
        toast({
          title: "Erreur de connexion",
          description: "Impossible de se connecter à l'interface d'administration.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    };

    signIn();
  }, []);

  return { isLoading };
};