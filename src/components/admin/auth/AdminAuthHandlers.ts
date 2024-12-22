import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const createAdminAccount = async (setIsLoading: (loading: boolean) => void) => {
  setIsLoading(true);
  const adminEmail = "g.sauvat@ideai.fr";
  const adminPassword = "admin123";

  try {
    // First, check if admin record exists
    const { data: existingAdmin } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', adminEmail)
      .single();

    if (!existingAdmin) {
      // Create auth user if admin doesn't exist
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: adminEmail,
        password: adminPassword,
      });

      if (signUpError && !signUpError.message.includes("User already registered")) {
        console.error("Signup error:", signUpError);
        throw signUpError;
      }

      // Create admin record
      const { error: adminError } = await supabase
        .from('admin_users')
        .insert([{ email: adminEmail }]);

      if (adminError) {
        console.error("Admin creation error:", adminError);
        throw adminError;
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
    console.error("Error creating admin account:", error);
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
  console.log("Attempting login with:", { email, password });

  try {
    // First verify admin status
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', email)
      .single();

    if (adminError || !adminData) {
      throw new Error("Accès non autorisé");
    }

    // Then attempt sign in
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      console.error("Auth error:", authError);
      throw authError;
    }

    if (!authData.session) {
      throw new Error("Aucune session créée");
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
      description: error.message || "Email ou mot de passe incorrect",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};