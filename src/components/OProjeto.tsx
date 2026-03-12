import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";
import {
  PageHeader,
  PageFooter,
  ODSSection,
  CTASection,
} from "@/components/layout";

const ODS_ITEMS = [
  {
    image: "/images/ods-11.png",
    alt: "ODS 11",
    fallbackSrc:
      "https://brasil.un.org/profiles/undg_country/themes/custom/undg/images/SDGs/pt-br/SDG-11.svg",
    title: "ODS 11",
    indicator: "Indicador 11.6.1",
    subtitle: "Cidades e Comunidades Sustentáveis",
  },
  {
    image: "/images/ods-12.png",
    alt: "ODS 12",
    fallbackSrc:
      "https://brasil.un.org/profiles/undg_country/themes/custom/undg/images/SDGs/pt-br/SDG-12.svg",
    title: "ODS 12",
    indicator: "Indicador 12.5.1",
    subtitle: "Consumo e Produção Responsáveis",
  },
];

const OProjeto = () => {
  return (
    <div className="min-h-screen bg-syntiro-50 w-full">
      <PageHeader />

      {/* Main Content */}
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              O Projeto
            </h1>
            <div className="max-w-4xl mx-auto">
              <p className="text-gray-600 text-lg leading-relaxed text-justify">
                O ReciclaMT é mais do que uma plataforma de reciclagem. É um
                movimento que conecta tecnologia, sustentabilidade e impacto
                social para transformar a forma como lidamos com os resíduos em
                Cuiabá e região.
              </p>
            </div>
          </motion.div>

          {/* Objetivos do Projeto */}
          <section className="mb-16">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Objetivos do Projeto
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <motion.div
                className="bg-white p-8 rounded-2xl shadow-syntiro border-t-4 border-syntiro-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Target className="mr-3 h-6 w-6 text-syntiro-500" />
                  Objetivo Principal
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Aumentar significativamente o índice de reciclagem em Cuiabá,
                  atualmente em apenas 5%, através de um sistema gamificado que
                  incentiva e recompensa práticas sustentáveis.
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-8 rounded-2xl shadow-syntiro border-t-4 border-blue-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Eye className="mr-3 h-6 w-6 text-blue-500" />
                  Visão de Futuro
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Criar uma rede integrada de reciclagem que conecte cidadãos,
                  catadores, cooperativas e empresas, promovendo a economia
                  circular e a inclusão social.
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-8 rounded-2xl shadow-syntiro border-t-4 border-green-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Heart className="mr-3 h-6 w-6 text-green-500" />
                  Impacto Social
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Valorizar o trabalho dos catadores de materiais recicláveis,
                  promover educação ambiental e gerar benefícios tangíveis para
                  toda a comunidade.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Como Funciona o Projeto */}
          <section className="mb-16">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Como Funciona o Projeto
              </h2>
            </motion.div>

            <motion.div
              className="bg-white p-8 md:p-12 rounded-2xl shadow-syntiro max-w-6xl mx-auto border-l-4 border-syntiro-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      🎯 Gamificação
                    </h3>
                    <p className="mb-4">
                      Sistema de pontos que recompensa cada ação de reciclagem,
                      transformando o descarte correto em uma experiência
                      motivadora e divertida.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      📱 Tecnologia Acessível
                    </h3>
                    <p className="mb-4">
                      Integração via WhatsApp, sem necessidade de instalação de
                      aplicativos, tornando a participação simples e acessível
                      para todos.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      🏆 Recompensas Reais
                    </h3>
                    <p className="mb-4">
                      Parcerias com empresas locais para oferecer descontos,
                      produtos e serviços que podem ser trocados pelos pontos
                      acumulados.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      🌍 Impacto Mensurável
                    </h3>
                    <p className="mb-4">
                      Acompanhamento em tempo real do impacto ambiental gerado,
                      mostrando aos usuários a diferença que suas ações fazem no
                      meio ambiente.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <ODSSection items={ODS_ITEMS} />

          <CTASection />
        </div>
      </main>

      <PageFooter />
    </div>
  );
};

export default OProjeto;
