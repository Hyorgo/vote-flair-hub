import React from "react";
import { motion } from "framer-motion";

export const ServicesSection = () => {
  return (
    <div className="space-y-6">
      <h3 className="font-heading font-semibold text-lg text-white">Nos services</h3>
      <ul className="space-y-3">
        {[
          { label: "Création de site web", href: "https://ideai.fr/creation-de-site-internet" },
          { label: "Référencement naturel", href: "https://ideai.fr/referencement-naturel" },
          { label: "Intelligence artificielle", href: "#" },
          { label: "SEO Local", href: "https://ideai.fr/seo-local" },
        ].map((service, index) => (
          <motion.li key={index} whileHover={{ x: 5 }}>
            <a
              href={service.href}
              className="text-white hover:text-navy transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {service.label}
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};