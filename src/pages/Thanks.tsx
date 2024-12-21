import { Layout } from "@/components/Layout";
import { PartyPopper } from "lucide-react";

const Thanks = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto text-center space-y-8 py-12">
        <div className="flex justify-center">
          <PartyPopper className="h-24 w-24 text-primary animate-bounce" />
        </div>
        <h1 className="text-4xl font-bold text-primary">
          Merci pour votre vote !
        </h1>
        <p className="text-xl text-gray-600">
          Votre participation a bien été enregistrée. Nous vous tiendrons informé des résultats.
        </p>
      </div>
    </Layout>
  );
};

export default Thanks;