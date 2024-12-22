import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const handleAdminLogin = async (
  email: string,
  password: string,
  setIsLoading: (loading: boolean) => void,
  navigate: (path: string) => void
) => {
  setIsLoading(true);
  console.log("Tentative de connexion pour:", email);

  try {
    // 1. Tenter d'abord la connexion
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      throw signInError;
    }

    // 2. Une fois connecté, vérifier si l'email existe dans admin_users
    const { data: adminData, error: adminCheckError } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', email)
      .maybeSingle();

    if (adminCheckError) {
      throw adminCheckError;
    }

    if (!adminData) {
      // Si l'utilisateur n'est pas admin, le déconnecter
      await supabase.auth.signOut();
      throw new Error("Ce compte n'a pas les droits administrateur");
    }

    toast({
      title: "Connexion réussie",
      description: "Bienvenue dans l'interface d'administration",
    });
    navigate("/admin");
  } catch (error: any) {
    console.error("Erreur de connexion:", error);
    toast({
      title: "Erreur de connexion",
      description: error.message === "Invalid login credentials" 
        ? "Email ou mot de passe incorrect"
        : error.message || "Une erreur est survenue",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};