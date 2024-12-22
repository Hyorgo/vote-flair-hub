import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const createAdminAccount = async (setIsLoading: (loading: boolean) => void) => {
  setIsLoading(true);
  const adminEmail = "g.sauvat@ideai.fr";
  const adminPassword = "admin123";

  try {
    // First check if admin user already exists
    const { data: existingAdmin, error: checkError } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', adminEmail)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 means no rows returned
      console.error("Error checking admin existence:", checkError);
      throw checkError;
    }

    if (existingAdmin) {
      toast({
        title: "Compte existant",
        description: "Le compte admin existe déjà. Utilisez les identifiants fournis pour vous connecter.",
      });
      setIsLoading(false);
      return;
    }

    // Create auth user if admin doesn't exist
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: adminEmail,
      password: adminPassword,
    });

    if (signUpError) {
      console.error("Signup error:", signUpError);
      throw signUpError;
    }

    if (!signUpData.user) {
      throw new Error("Failed to create admin account");
    }

    // Create admin user record
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

  try {
    // First attempt to sign in
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      console.error("Auth error:", authError);
      throw authError;
    }

    if (!authData.session) {
      throw new Error("No session created");
    }

    // Then verify admin status
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', email)
      .single();

    if (adminError) {
      console.error("Admin check error:", adminError);
      throw adminError;
    }

    if (!adminData) {
      throw new Error("Accès non autorisé");
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