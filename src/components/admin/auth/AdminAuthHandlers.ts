import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const createAdminAccount = async (setIsLoading: (loading: boolean) => void) => {
  setIsLoading(true);
  const adminEmail = "g.sauvat@ideai.fr";
  const adminPassword = "Gregolimano009";

  try {
    // Vérifier si l'utilisateur existe déjà dans auth
    const { data: authUser, error: authError } = await supabase.auth.signUp({
      email: adminEmail,
      password: adminPassword,
    });

    if (authError && authError.message !== "User already registered") {
      throw authError;
    }

    // Vérifier si l'admin existe dans la table admin_users
    const { data: existingAdmin, error: checkError } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', adminEmail)
      .maybeSingle();

    if (checkError) {
      console.error("Erreur lors de la vérification admin:", checkError);
      throw checkError;
    }

    if (!existingAdmin) {
      // Insérer dans la table admin_users
      const { error: insertError } = await supabase
        .from('admin_users')
        .insert([{ email: adminEmail }]);

      if (insertError) {
        console.error("Erreur lors de l'insertion admin:", insertError);
        throw insertError;
      }

      toast({
        title: "Compte créé",
        description: "Le compte admin a été créé avec succès. Vous pouvez maintenant vous connecter.",
      });
    } else {
      toast({
        title: "Compte existant",
        description: "Le compte admin existe déjà. Vous pouvez vous connecter.",
      });
    }
  } catch (error: any) {
    console.error("Erreur création compte admin:", error);
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
  console.log("Tentative de connexion avec:", { email });

  try {
    // Vérifier si l'utilisateur est un admin
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', email)
      .maybeSingle();

    if (adminError) {
      console.error("Erreur vérification admin:", adminError);
      throw adminError;
    }

    if (!adminData) {
      throw new Error("Compte administrateur non trouvé");
    }

    // Tentative de connexion
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      console.error("Erreur connexion:", signInError);
      throw signInError;
    }

    if (!data.user) {
      throw new Error("Échec de la création de session");
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