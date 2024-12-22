import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { validateEmailFormat, isDisposableEmail } from "@/utils/emailValidation";
import {
  checkExistingUser,
  createUserProfile,
  validateEmail,
} from "@/services/registrationService";

export const useRegistration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateEmailWithToast = (email: string): boolean => {
    if (!validateEmailFormat(email)) {
      toast({
        title: "Format d'email invalide",
        description: "Veuillez entrer une adresse email valide.",
        variant: "destructive",
      });
      return false;
    }

    if (isDisposableEmail(email)) {
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
    
    if (!validateEmailWithToast(email)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const existingUser = await checkExistingUser(email);

      if (existingUser) {
        toast({
          title: "Email déjà utilisé",
          description: "Cet email est déjà enregistré.",
          variant: "destructive",
        });
        return;
      }

      await createUserProfile(firstName, lastName, email);
      await validateEmail(email);

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

    if (!validateEmailWithToast(email)) {
      return;
    }

    try {
      const existingUser = await checkExistingUser(email);

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