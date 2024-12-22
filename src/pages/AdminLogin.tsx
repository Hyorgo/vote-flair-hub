import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminLoginForm } from "@/components/admin/auth/AdminLoginForm";
import { createAdminAccount, handleAdminLogin } from "@/components/admin/auth/AdminAuthHandlers";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleAdminLogin(email, password, setIsLoading, navigate);
  };

  const handleSignUp = async () => {
    await createAdminAccount(setIsLoading);
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
          <AdminLoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isLoading={isLoading}
            onSubmit={handleSubmit}
            onSignUp={handleSignUp}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;