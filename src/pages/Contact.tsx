import React from "react";
import { Layout } from "@/components/Layout";
import { ContactForm } from "@/components/contact/ContactForm";

const Contact = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Contact</h1>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 space-y-6">
            <p className="text-white/90 text-lg mb-6">
              Pour toute question ou information, n'hésitez pas à nous contacter via le formulaire ci-dessous.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;