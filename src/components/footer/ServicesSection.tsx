import React from "react";
import { motion } from "framer-motion";

export const ServicesSection = () => {
  return (
    <div className="space-y-6">
      <h3 className="font-heading font-semibold text-lg text-white">Nos services</h3>
      <ul className="space-y-3">
        {[
          { label: "Développement web", href: "#" },
          { label: "Référencement naturel", href: "#" },
          { label: "Intelligence artificielle", href: "#" },
          { label: "Applications mobiles", href: "#" },
        ].map((service, index) => (
          <motion.li key={index} whileHover={{ x: 5 }}>
            <a
              href={service.href}
              className="text-white hover:text-navy transition-colors"
            >
              {service.label}
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};