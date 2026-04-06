import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="bg-gradient-to-r from-syntiro-500 to-syntiro-600 rounded-2xl p-8 md:p-12 text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Faça Parte Desta Transformação
        </h2>
        <p className="text-syntiro-100 text-lg mb-8 max-w-2xl mx-auto">
          Junte-se a nós nesta jornada por um futuro mais sustentável. Cada ação
          conta, cada pessoa faz a diferença.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="bg-white text-syntiro-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl text-lg"
        >
          Começar Agora
        </Button>
      </div>
    </motion.section>
  );
};

export default CTASection;
