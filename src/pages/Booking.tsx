import React from "react";
import { Layout } from "@/components/Layout";

const Booking = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Réserver des places</h1>
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-8">
          <p className="text-white/90 text-lg mb-4">
            La réservation des places sera bientôt disponible.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Booking;