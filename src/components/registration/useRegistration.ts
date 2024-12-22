import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useRegistration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: existingUser } = await supabase
        .from("user_profiles")
        .select("email")
        .eq("email", email)
        .maybeSingle();

      if (existingUser) {
        toast({
          title: "Email déjà utilisé",
          description: "Cet email est déjà enregistré.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("user_profiles").insert([
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
        },
      ]);

      if (error) throw error;

      await supabase.from("validated_emails").insert([{ email }]);

      toast({
        title: "Inscription réussie !",
        description: "Vous allez être redirigé vers les catégories.",
      });

      setTimeout(() => {
        navigate("/categories");
      }, 1500);
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

  const handleExistingUser = async () => {
    if (!email) {
      toast({
        title: "Email requis",
        description: "Veuillez entrer votre email pour continuer.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: existingUser } = await supabase
        .from("user_profiles")
        .select("email")
        .eq("email", email)
        .maybeSingle();

      if (!existingUser) {
        toast({
          title: "Email non trouvé",
          description: "Cet email n'est pas enregistré. Veuillez vous inscrire.",
          variant: "destructive",
        });
        return;
      }

      localStorage.setItem("userEmail", email);
      
      toast({
        title: "Connexion réussie !",
        description: "Vous allez être redirigé vers les catégories.",
      });

      setTimeout(() => {
        navigate("/categories");
      }, 1500);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la vérification de l'email.",
        variant: "destructive",
      });
    }
  };

  return {
    firstName,
    lastName,
    email,
    isSubmitting,
    setFirstName,
    setLastName,
    setEmail,
    handleSubmit,
    handleExistingUser,
  };
};
