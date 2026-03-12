import React from "react";
import { motion } from "framer-motion";

interface ODSItem {
  image: string;
  alt: string;
  fallbackSrc: string;
  title: string;
  indicator: string;
  subtitle?: string;
}

interface ODSSectionProps {
  items?: ODSItem[];
}

const DEFAULT_ODS_ITEMS: ODSItem[] = [
  {
    image: "/images/ods-11.png",
    alt: "ODS 11",
    fallbackSrc:
      "https://brasil.un.org/profiles/undg_country/themes/custom/undg/images/SDGs/pt-br/SDG-11.svg",
    title: "ODS 11",
    indicator: "Indicador 11.6.1",
  },
  {
    image: "/images/ods-12.png",
    alt: "ODS 12",
    fallbackSrc:
      "https://brasil.un.org/profiles/undg_country/themes/custom/undg/images/SDGs/pt-br/SDG-12.svg",
    title: "ODS 12",
    indicator: "Indicador 12.5.1",
  },
];

const ODSSection: React.FC<ODSSectionProps> = ({
  items = DEFAULT_ODS_ITEMS,
}) => {
  return (
    <section className="mb-16">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Objetivos de Desenvolvimento Sustentável da ONU (ODS)
        </h2>
      </motion.div>

      <motion.div
        className="bg-white p-8 md:p-12 rounded-2xl shadow-syntiro max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
          <p className="text-justify">
            Entendemos que empreender deve ser muito além de lucro, é preciso
            estar alinhado à práticas que transmitam o real impacto positivo em
            ações que beneficiam a sociedade e o planeta. Com isso, os ODS da ONU
            são um apelo global à ação para acabar com a pobreza, proteger o meio
            ambiente e o clima e garantir que as pessoas, em todos os lugares,
            possam desfrutar de paz e de prosperidade.
          </p>
          <p className="text-justify">
            Confira abaixo as ODS com as quais estamos diretamente alinhados,
            assim como o respectivo indicador.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-12 items-center mt-12">
          {items.map((item) => (
            <div key={item.title} className="flex flex-col items-center">
              <img
                src={item.image}
                alt={item.alt}
                className="h-40 w-40 mb-4"
                onError={(e) => {
                  e.currentTarget.src = item.fallbackSrc;
                }}
              />
              <p className="font-semibold text-center text-xl">{item.title}</p>
              <p className="text-gray-600 text-center">{item.indicator}</p>
              {item.subtitle && (
                <p className="text-sm text-gray-500 text-center mt-2">
                  {item.subtitle}
                </p>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ODSSection;
