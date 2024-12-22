import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const createAdminAccount = async (setIsLoading: (loading: boolean) => void) => {
  setIsLoading(true);
  const adminEmail = "g.sauvat@ideai.fr";
  const adminPassword = "Gregolimano009";

  try {
    console.log("Tentative de création du compte admin pour:", adminEmail);
    
    // Vérifier d'abord si l'utilisateur existe dans la table admin_users
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
      // Tenter de se connecter d'abord
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: adminPassword,
      });

      // Si la connexion échoue, tenter l'inscription
      if (signInError) {
        console.log("Échec de la connexion, tentative d'inscription:", signInError);
        const { error: signUpError } = await supabase.auth.signUp({
          email: adminEmail,
          password: adminPassword,
        });

        // Gérer l'erreur d'inscription sauf si l'utilisateur existe déjà
        if (signUpError && signUpError.message !== "User already registered") {
          console.error("Erreur d'inscription:", signUpError);
          throw signUpError;
        }
      }

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
        description: "Le compte administrateur a été créé avec succès. Vous pouvez maintenant vous connecter.",
      });
    } else {
      toast({
        title: "Compte existant",
        description: "Le compte administrateur existe déjà. Vous pouvez vous connecter.",
      });
    }
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
  console.log("Attempting login for:", email);

  try {
    // First check if the email exists in admin_users
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', email)
      .maybeSingle();

    if (adminError) {
      console.error("Admin check error:", adminError);
      throw adminError;
    }

    if (!adminData) {
      throw new Error("Compte administrateur non trouvé");
    }

    // Attempt login
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      console.error("Login error:", signInError);
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
    console.error("Login error:", error);
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
