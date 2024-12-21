import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export const CompleteVotingButton = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-12 mb-24 flex justify-center">
      <Button
        onClick={() => navigate("/thanks")}
        variant="outline"
        size="lg"
        className="text-lg gap-2 py-6 px-8 border border-gray-200 rounded-lg shadow-sm 
          transition-all duration-300 hover:shadow-md hover:bg-gradient-to-r 
          hover:from-[#FFD700] hover:via-[#DAA520] hover:to-[#B8860B] 
          hover:text-white group relative"
      >
        <CheckCircle className="h-6 w-6 text-[#DAA520]/80 group-hover:text-white transition-colors" />
        <span className="font-medium text-gray-700 group-hover:text-white transition-colors">
          J'ai terminé mon vote !
        </span>
      </Button>
    </div>
  );
};