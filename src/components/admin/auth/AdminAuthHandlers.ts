import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const createAdminAccount = async (setIsLoading: (loading: boolean) => void) => {
  setIsLoading(true);
  const adminEmail = "g.sauvat@ideai.fr";
  const adminPassword = "Gregolimano009";

  try {
    console.log("Vérification du compte administrateur pour:", adminEmail);
    
    // 1. Vérifier si l'utilisateur existe déjà dans admin_users
    const { data: existingAdmin, error: adminCheckError } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', adminEmail)
      .maybeSingle();

    if (adminCheckError) {
      console.error("Erreur lors de la vérification admin:", adminCheckError);
      throw adminCheckError;
    }

    // Si l'admin existe déjà, on vérifie juste l'authentification
    if (existingAdmin) {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: adminPassword,
      });

      if (!signInError) {
        toast({
          title: "Compte existant",
          description: "Le compte administrateur existe déjà. Vous pouvez vous connecter.",
        });
      } else {
        throw signInError;
      }
      return;
    }

    // 2. Si l'admin n'existe pas, on le crée dans admin_users
    const { error: insertError } = await supabase
      .from('admin_users')
      .insert([{ email: adminEmail }]);

    if (insertError) {
      console.error("Erreur lors de l'insertion admin:", insertError);
      throw insertError;
    }

    // 3. Créer ou vérifier le compte dans Auth
    const { error: signUpError } = await supabase.auth.signUp({
      email: adminEmail,
      password: adminPassword,
    });

    if (signUpError && signUpError.message !== "User already registered") {
      // Si l'erreur n'est pas "User already registered", on la traite comme une vraie erreur
      console.error("Erreur lors de la création du compte:", signUpError);
      // On supprime l'entrée admin_users car la création du compte a échoué
      await supabase
        .from('admin_users')
        .delete()
        .eq('email', adminEmail);
      throw signUpError;
    }

    toast({
      title: "Compte créé",
      description: "Le compte administrateur a été créé avec succès. Vous pouvez maintenant vous connecter.",
    });

  } catch (error: any) {
    console.error("Erreur de création du compte admin:", error);
    toast({
      title: "Erreur",
      description: error.message === "User already registered" 
        ? "Le compte existe déjà. Veuillez vous connecter."
        : "Erreur lors de la création du compte admin. Veuillez réessayer.",
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
    const { data: adminData, error: adminCheckError } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', email)
      .maybeSingle();

    if (adminCheckError) {
      throw adminCheckError;
    }

    if (!adminData) {
      throw new Error("Ce compte n'a pas les droits administrateur");
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