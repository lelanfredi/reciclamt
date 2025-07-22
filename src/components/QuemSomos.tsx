import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Leaf, BarChart3, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuemSomos = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-syntiro-50 w-full">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="/images/reciclamt-logo.png"
              alt="ReciclaMT Logo"
              className="h-8 w-auto"
            />
            <h1 className="text-xl font-bold text-syntiro-600">ReciclaMT</h1>
          </div>

          <Button
            onClick={handleGoBack}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Início
          </Button>
        </div>
      </header>

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
                  Em 2024, a ideia ganhou força com a seleção no programa{" "}
                  <strong>Inova Cerrado – Módulo Ideação</strong>, do Sebrae
                  Nacional. Logo depois, fomos contemplados no{" "}
                  <strong>Tecnova III MT</strong>, com quase{" "}
                  <strong>R$ 400 mil em recursos da Finep e Fapemat</strong>,
                  impulsionando ainda mais nosso desenvolvimento.
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

          {/* ODS Section */}
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
                <div className="flex flex-col items-center">
                  <img
                    src="/images/ods-11.png"
                    alt="ODS 11"
                    className="h-40 w-40 mb-4"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://brasil.un.org/profiles/undg_country/themes/custom/undg/images/SDGs/pt-br/SDG-11.svg";
                    }}
                  />
                  <p className="font-semibold text-center text-xl">ODS 11</p>
                  <p className="text-gray-600 text-center">Indicador 11.6.1</p>
                </div>

                <div className="flex flex-col items-center">
                  <img
                    src="/images/ods-12.png"
                    alt="ODS 12"
                    className="h-40 w-40 mb-4"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://brasil.un.org/profiles/undg_country/themes/custom/undg/images/SDGs/pt-br/SDG-12.svg";
                    }}
                  />
                  <p className="font-semibold text-center text-xl">ODS 12</p>
                  <p className="text-gray-600 text-center">Indicador 12.5.1</p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* CTA Section */}
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
                Junte-se a nós nesta jornada por um futuro mais sustentável.
                Cada ação conta, cada pessoa faz a diferença.
              </p>
              <Button
                onClick={handleGoBack}
                className="bg-white text-syntiro-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl text-lg"
              >
                Começar Agora
              </Button>
            </div>
          </motion.section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <img
                src="/images/reciclamt-logo.png"
                alt="ReciclaMT Logo"
                className="h-10 w-auto"
              />
              <h2 className="text-2xl font-bold">ReciclaMT</h2>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2025 ReciclaMT - Descarte inteligente de resíduos. Todos os
                direitos reservados I CNPJ 49.696.754.0001-17
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://drive.google.com/file/d/178mw3jgLN9C-857Bh7F-MGyGScBM0Irx/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white flex items-center gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-book-open"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                  E-book Gratuito
                </a>
                <a
                  href="https://drive.google.com/file/d/1Ya-8nYyzr17kF918RooZd2bpG5kLfKhi/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  Termos de Uso
                </a>
                <a
                  href="https://drive.google.com/file/d/1E_0uqJIOGlvYWSezL8XwsHlsYVGLpPJP/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  Política de Privacidade
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default QuemSomos;
