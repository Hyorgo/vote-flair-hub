import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const createAdminAccount = async (setIsLoading: (loading: boolean) => void) => {
  setIsLoading(true);
  const adminEmail = "g.sauvat@ideai.fr";
  const adminPassword = "Gregolimano009";

  try {
    console.log("Tentative de création du compte admin pour:", adminEmail);
    
    // 1. Vérifier si l'utilisateur existe déjà dans admin_users
    const { data: existingAdmin } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', adminEmail)
      .maybeSingle();

    if (existingAdmin) {
      toast({
        title: "Compte existant",
        description: "Le compte administrateur existe déjà. Vous pouvez vous connecter.",
      });
      return;
    }

    // 2. Créer le compte dans Auth
    const { error: signUpError } = await supabase.auth.signUp({
      email: adminEmail,
      password: adminPassword,
    });

    if (signUpError) {
      if (signUpError.message === "User already registered") {
        // Si l'utilisateur existe déjà dans Auth, on continue pour créer l'entrée dans admin_users
        console.log("L'utilisateur existe déjà dans Auth, création de l'entrée admin");
      } else {
        throw signUpError;
      }
    }

    // 3. Créer l'entrée dans admin_users
    const { error: insertError } = await supabase
      .from('admin_users')
      .insert([{ email: adminEmail }]);

    if (insertError) {
      console.error("Erreur lors de l'insertion admin:", insertError);
      throw insertError;
    }

    toast({
      title: "Compte créé",
      description: "Le compte administrateur a été créé avec succès. Vous pouvez maintenant vous connecter.",
    });

  } catch (error: any) {
    console.error("Erreur de création du compte admin:", error);
    toast({
      title: "Erreur",
      description: error.message || "Erreur lors de la création du compte admin",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};

export const handleAdminLogin = async (
  email: string,
  password: string,
  setIsLoading: (loading: boolean) => void,
  navigate: (path: string) => void
) => {
  setIsLoading(true);
  console.log("Tentative de connexion pour:", email);

  try {
    // 1. Vérifier si l'email existe dans admin_users
    const { data: adminData } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', email)
      .maybeSingle();

    if (!adminData) {
      throw new Error("Compte administrateur non trouvé");
    }

    // 2. Tenter la connexion
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      throw signInError;
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