import React from "react";
import { Layout } from "@/components/Layout";

const Contact = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Contact</h1>
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-8">
          <p className="text-white/90 text-lg mb-4">
            Pour toute question ou information, n'hésitez pas à nous contacter.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;