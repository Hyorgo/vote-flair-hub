import React from "react";
import { Layout } from "@/components/Layout";
import { ContactForm } from "@/components/contact/ContactForm";
import { Card } from "@/components/ui/card";

const Contact = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8">
          Contact
        </h1>
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {/* Logo Card */}
          <Card className="p-6 sm:p-8 flex justify-center items-center bg-white/95 backdrop-blur-sm">
            <img 
              src="/lovable-uploads/bf3e6529-ee5b-45c3-86ec-6fc4ac0a615f.png" 
              alt="Sortir Lyon x Sixtynine Event" 
              className="max-w-full h-auto object-contain"
              style={{ maxHeight: "120px" }}
            />
          </Card>

          {/* Contact Form Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 sm:p-8 space-y-6">
            <p className="text-white/90 text-base sm:text-lg mb-6">
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