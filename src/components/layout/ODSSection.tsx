import React from "react";
import { motion } from "framer-motion";
import { ODS_FALLBACK_URLS } from "@/config/constants";

interface ODSItem {
  number: number;
  indicator: string;
  subtitle?: string;
}

interface ODSSectionProps {
  items?: ODSItem[];
}

const defaultItems: ODSItem[] = [
  { number: 11, indicator: "11.6.1" },
  { number: 12, indicator: "12.5.1" },
];

const ODSSection: React.FC<ODSSectionProps> = ({ items = defaultItems }) => {
  const getFallbackUrl = (odsNumber: number) => {
    if (odsNumber === 11) return ODS_FALLBACK_URLS.ods11;
    if (odsNumber === 12) return ODS_FALLBACK_URLS.ods12;
    return "";
  };

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
            Entendemos que empreender deve ser muito além de lucro, é
            preciso estar alinhado à práticas que transmitam o real
            impacto positivo em ações que beneficiam a sociedade e o
            planeta. Com isso, os ODS da ONU são um apelo global à ação
            para acabar com a pobreza, proteger o meio ambiente e o clima
            e garantir que as pessoas, em todos os lugares, possam
            desfrutar de paz e de prosperidade.
          </p>
          <p className="text-justify">
            Confira abaixo as ODS com as quais estamos diretamente
            alinhados, assim como o respectivo indicador.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-12 items-center mt-12">
          {items.map((item) => (
            <div key={item.number} className="flex flex-col items-center">
              <img
                src={`/images/ods-${item.number}.png`}
                alt={`ODS ${item.number}`}
                className="h-40 w-40 mb-4"
                onError={(e) => {
                  e.currentTarget.src = getFallbackUrl(item.number);
                }}
              />
              <p className="font-semibold text-center text-xl">
                ODS {item.number}
              </p>
              <p className="text-gray-600 text-center">
                Indicador {item.indicator}
              </p>
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
