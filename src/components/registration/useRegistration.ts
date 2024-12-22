import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const DISPOSABLE_EMAIL_DOMAINS = ['tempmail.com', 'throwawaymail.com']; // Liste à enrichir

export const useRegistration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateEmail = (email: string): boolean => {
    // Vérification du format de l'email
    if (!EMAIL_REGEX.test(email)) {
      toast({
        title: "Format d'email invalide",
        description: "Veuillez entrer une adresse email valide.",
        variant: "destructive",
      });
      return false;
    }

    // Vérification des domaines jetables
    const domain = email.split('@')[1];
    if (DISPOSABLE_EMAIL_DOMAINS.includes(domain)) {
      toast({
        title: "Email non autorisé",
        description: "Les adresses email temporaires ne sont pas acceptées.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      return;
    }

    setIsSubmitting(true);
    console.log("Tentative d'inscription avec l'email:", email);

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

      const { error: profileError } = await supabase.from("user_profiles").insert([
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
        },
      ]);

      if (profileError) throw profileError;

      const { error: emailError } = await supabase.from("validated_emails").insert([
        { email }
      ]);

      if (emailError) throw emailError;

      toast({
        title: "Inscription réussie !",
        description: "Vous allez être redirigé vers les catégories.",
      });

      localStorage.setItem("userEmail", email);

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

    if (!validateEmail(email)) {
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