import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const createAdminAccount = async (setIsLoading: (loading: boolean) => void) => {
  setIsLoading(true);
  const adminEmail = "g.sauvat@ideai.fr";
  const adminPassword = "Gregolimano009";

  try {
    // First, check if admin exists in admin_users table
    const { data: existingAdmin, error: checkError } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', adminEmail)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    if (!existingAdmin) {
      // Try to create the auth user if it doesn't exist
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: adminEmail,
        password: adminPassword,
      });

      if (signUpError && signUpError.message !== "User already registered") {
        throw signUpError;
      }

      // Insert into admin_users table
      const { error: insertError } = await supabase
        .from('admin_users')
        .insert([{ email: adminEmail }]);

      if (insertError) throw insertError;

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
  console.log("Attempting login with:", { email });

  try {
    // First verify if the user exists in admin_users table
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', email)
      .single();

    if (adminError || !adminData) {
      throw new Error("Compte administrateur non trouvé");
    }

    // Then attempt to sign in
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) throw signInError;
    if (!data.user) throw new Error("Aucune session créée");

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