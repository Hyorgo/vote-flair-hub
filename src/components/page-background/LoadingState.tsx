import { Loader2 } from "lucide-react";

export const LoadingState = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
};