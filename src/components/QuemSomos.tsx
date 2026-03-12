import React from "react";
import { motion } from "framer-motion";
import { Leaf, BarChart3, Award } from "lucide-react";
import {
  PageHeader,
  PageFooter,
  ODSSection,
  CTASection,
} from "@/components/layout";

const QuemSomos = () => {
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
              Quem Somos
            </h1>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Propósito
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed text-justify">
                No ReciclaMT, acreditamos que a transformação ambiental começa
                por atitudes simples. Queremos revolucionar o gerenciamento de
                resíduos por meio de tecnologia e inovação. Nosso propósito é
                facilitar a reciclagem urbana com soluções acessíveis,
                educativas e conectadas com a realidade das pessoas e do
                planeta.
              </p>
            </div>
          </motion.div>

          {/* Missão, Visão e Valores */}
          <section className="mb-16">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Missão, Visão e Valores
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
                  <Leaf className="mr-3 h-6 w-6 text-syntiro-500" />
                  Missão
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Gerar valor para pessoas, empresas e instituições públicas
                  através do engajamento do descarte correto.
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
                  <BarChart3 className="mr-3 h-6 w-6 text-blue-500" />
                  Visão
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Ser uma referência em soluções tecnológicas para reciclagem
                  urbana no Brasil, promovendo inclusão, circularidade e
                  inovação na gestão de resíduos.
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
                  <Award className="mr-3 h-6 w-6 text-green-500" />
                  Valores
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Responsabilidade socioambiental e impacto positivo;
                  Democratização do acesso à destinação correta de resíduos com
                  tecnologia; Acessibilidade/inclusão; Simplificação de
                  processos; Inovação; Diversidade.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Nossa História Completa */}
          <section className="mb-16">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nossa História
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
                <p className="text-xl font-semibold text-gray-900 mb-6">
                  Tudo começou com uma inquietação: como transformar o descarte
                  de resíduos em uma experiência simples, acessível e realmente
                  efetiva?
                </p>

                <p>
                  O ReciclaMT nasceu de uma inquietação: como tornar o descarte
                  de resíduos mais simples, acessível e efetivo? Diante do
                  cenário crítico em Cuiabá — onde menos de 5% dos resíduos são
                  reciclados, segundo a ABREMA — criamos uma solução que une
                  tecnologia, educação ambiental e impacto social.
                </p>

                <p>
                  Em 2024, essa ideia ganhou forma dentro do Inova Cerrado –
                  Módulo Ideação, programa nacional de inovação do Sebrae. Ali,
                  demos os primeiros passos estruturando a proposta, validando
                  hipóteses e recebendo mentorias valiosas. Na sequência, o
                  projeto foi selecionado no Tecnova III MT, com a captação de
                  quase R$ 400 mil em recursos de fomento da Finep e Fapemat, o
                  que fortaleceu ainda mais a nossa jornada.
                </p>

                <p>
                  Atualmente, estamos na fase de estruturação e validação do
                  MVP, com expansão prevista para 2026. Nosso objetivo é
                  conectar cada vez mais pessoas a um movimento coletivo por um
                  mundo mais limpo e sustentável.
                </p>

                <p>
                  Estamos preparando o caminho para a expansão das operações a
                  partir de 2026, levando o ReciclaMT a novos territórios e
                  conectando cada vez mais pessoas a um movimento coletivo por
                  um futuro mais limpo, justo e sustentável.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Depoimento do Fundador */}
          <section className="mb-16">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Palavra do Fundador
              </h2>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-syntiro-50 to-white p-8 md:p-12 rounded-2xl shadow-syntiro max-w-6xl mx-auto border-l-4 border-syntiro-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">💬</div>
              </div>
              <blockquote className="text-gray-700 text-lg leading-relaxed italic space-y-6">
                <p>
                  O ReciclaMT nasceu da vontade de facilitar a coleta seletiva. Criamos uma
                  forma simples de reciclar e ainda ser recompensado por isso —
                  sem precisar instalar nada, só usando o WhatsApp.
                </p>
                <p>
                  Mais do que reciclagem, queremos criar uma rede de pessoas que
                  se importam com o futuro, que valorizam os catadores e que
                  acreditam que cada atitude conta.
                </p>
                <footer className="text-right not-italic pt-6">
                  <cite className="text-syntiro-600 font-semibold text-2xl">
                    — Thiago, fundador do ReciclaMT.
                  </cite>
                </footer>
              </blockquote>
            </motion.div>
          </section>

          <ODSSection />

          <CTASection />
        </div>
      </main>

      <PageFooter />
    </div>
  );
};

export default QuemSomos;
