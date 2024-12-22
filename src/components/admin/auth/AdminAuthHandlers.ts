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
      throw adminCheckError;
    }

    // 2. Si l'admin n'existe pas dans admin_users, on le crée
    if (!existingAdmin) {
      const { error: insertError } = await supabase
        .from('admin_users')
        .insert([{ email: adminEmail }]);

      if (insertError) {
        if (insertError.code === "23505") {
          console.log("L'admin existe déjà dans la table admin_users");
        } else {
          throw insertError;
        }
      }
    }

    // 3. Vérifier/Créer le compte dans Auth
    const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password: adminPassword,
    });

    if (signInError) {
      // Si la connexion échoue, on essaie de créer le compte
      const { error: signUpError } = await supabase.auth.signUp({
        email: adminEmail,
        password: adminPassword,
      });

      if (signUpError) {
        if (signUpError.message === "User already registered") {
          toast({
            title: "Erreur de connexion",
            description: "Le compte existe mais le mot de passe est incorrect.",
            variant: "destructive",
          });
        } else {
          throw signUpError;
        }
        return;
      }

      toast({
        title: "Compte créé",
        description: "Le compte administrateur a été créé avec succès. Vous pouvez maintenant vous connecter.",
      });
    } else {
      toast({
        title: "Compte vérifié",
        description: "Le compte administrateur est prêt. Vous pouvez vous connecter.",
      });
    }

  } catch (error: any) {
    console.error("Erreur de création du compte admin:", error);
    toast({
      title: "Erreur",
      description: "Une erreur est survenue lors de la création du compte admin. Veuillez réessayer.",
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