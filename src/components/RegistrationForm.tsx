import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

export const RegistrationForm = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Vérifier si l'email existe déjà
      const { data: existingUser } = await supabase
        .from("user_profiles")
        .select("email")
        .eq("email", email)
        .single();

      if (existingUser) {
        toast({
          title: "Email déjà utilisé",
          description: "Cet email est déjà enregistré.",
          variant: "destructive",
        });
        return;
      }

      // Insérer le nouvel utilisateur
      const { error } = await supabase.from("user_profiles").insert([
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
        },
      ]);

      if (error) throw error;

      // Ajouter l'email aux emails validés
      await supabase.from("validated_emails").insert([{ email }]);

      toast({
        title: "Inscription réussie !",
        description: "Vous allez être redirigé vers les catégories.",
      });

      // Rediriger vers la page des catégories
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <div className="space-y-2">
        <Label htmlFor="firstName">Prénom</Label>
        <Input
          id="firstName"
          type="text"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Entrez votre prénom"
          className="bg-white/50 backdrop-blur-sm"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastName">Nom</Label>
        <Input
          id="lastName"
          type="text"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Entrez votre nom"
          className="bg-white/50 backdrop-blur-sm"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Entrez votre email"
          className="bg-white/50 backdrop-blur-sm"
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Inscription en cours..." : "S'inscrire pour voter"}
      </Button>
    </form>
  );
};