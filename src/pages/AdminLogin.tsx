import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Empêcher la soumission du formulaire
    setIsLoading(true);

    try {
      const { data: existingUser, error: checkError } = await supabase
        .from('admin_users')
        .select('email')
        .eq('email', 'g.sauvat@ideai.fr')
        .single();

      if (existingUser) {
        toast({
          title: "Compte existant",
          description: "Le compte admin existe déjà, vous pouvez vous connecter",
        });
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: "g.sauvat@ideai.fr",
        password: "admin123",
      });

      if (error) throw error;

      // Créer l'entrée dans la table admin_users
      const { error: adminError } = await supabase
        .from('admin_users')
        .insert([{ email: 'g.sauvat@ideai.fr' }]);

      if (adminError) throw adminError;

      toast({
        title: "Compte créé",
        description: "Le compte admin a été créé avec succès. Vous pouvez maintenant vous connecter.",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la création du compte admin",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.session) {
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('email')
          .eq('email', email)
          .single();

        if (adminError || !adminData) {
          throw new Error("Accès non autorisé");
        }

        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans l'interface d'administration",
        });
        navigate("/admin");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect, ou accès non autorisé.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl text-center">Administration</CardTitle>
          <p className="text-center text-muted-foreground">
            Connectez-vous pour accéder à l'interface d'administration
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10"
                  autoComplete="current-password"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Connexion..." : "Se connecter"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleSignUp}
                disabled={isLoading}
              >
                Créer le compte admin
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;