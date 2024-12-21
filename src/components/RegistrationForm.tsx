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

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">Prénom</Label>
          <Input
            id="firstName"
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Jean"
            className="bg-white/20 backdrop-blur-sm border-white/20 focus:border-primary/50 focus:ring-primary/50 h-9"
          />
        </div>

        <div>
          <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Nom</Label>
          <Input
            id="lastName"
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Dupont"
            className="bg-white/20 backdrop-blur-sm border-white/20 focus:border-primary/50 focus:ring-primary/50 h-9"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
        <Input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jean.dupont@example.com"
          className="bg-white/20 backdrop-blur-sm border-white/20 focus:border-primary/50 focus:ring-primary/50 h-9"
        />
      </div>

      <div className="space-y-2">
        <Button
          type="submit"
          className="w-full bg-primary/80 hover:bg-primary backdrop-blur-sm text-white shadow-lg h-9"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Inscription en cours..." : "S'inscrire pour voter"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={handleExistingUser}
          className="w-full backdrop-blur-sm border-white/20 hover:bg-white/10 text-gray-800 h-9"
        >
          Déjà inscrit
        </Button>
      </div>
    </form>
  );
};