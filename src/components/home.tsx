import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import AuthForms from "./AuthForms";
import Dashboard from "./Dashboard";
import EcoPointsMap from "./EcoPointsMap";
import {
  ArrowRight,
  Leaf,
  MapPin,
  Award,
  Recycle,
  Users,
  BarChart3,
  Mail,
  Phone,
} from "lucide-react";

interface HomeProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
  onLogin?: (data: any) => void;
  onRegister?: (data: any) => void;
}

const Home = ({
  isAuthenticated = false,
  onLogout = () => {},
  onLogin,
  onRegister,
}: HomeProps) => {
  const [userAuthenticated, setUserAuthenticated] = useState(isAuthenticated);
  const [activeSection, setActiveSection] = useState("hero");

  const handleScroll = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Definição dos parceiros para exibir os logos no final da página
  const parceiros = [
    {
      alt: "Fapemat",
      src: "/images/fapemat.png"
    },
    {
      alt: "Finep",
      src: "/images/finep.png"
    }
  ];

  if (userAuthenticated) {
    return (
      <motion.div
        className="w-full max-w-7xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <img
              src="/images/reciclamt-logo.png"
              alt="ReciclaMT Logo"
              className="h-10 w-auto"
            />
            <h1 className="text-2xl font-bold text-gray-900">ReciclaMT</h1>
          </div>
          <Button variant="outline" onClick={onLogout}>
            Sair
          </Button>
        </div>
        <Dashboard />
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-syntiro-50 w-full">
      {/* Navigation */}
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

          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => handleScroll("hero")}
              className={`text-sm font-medium ${activeSection === "hero" ? "text-syntiro-600" : "text-gray-600 hover:text-syntiro-600"}`}
            >
              Início
            </button>
            <button
              onClick={() => handleScroll("how-it-works")}
              className={`text-sm font-medium ${activeSection === "how-it-works" ? "text-syntiro-600" : "text-gray-600 hover:text-syntiro-600"}`}
            >
              Como Funciona
            </button>
            <button
              onClick={() => handleScroll("benefits")}
              className={`text-sm font-medium ${activeSection === "benefits" ? "text-syntiro-600" : "text-gray-600 hover:text-syntiro-600"}`}
            >
              Benefícios
            </button>
            <button
              onClick={() => handleScroll("quem-somos")}
              className={`text-sm font-medium ${activeSection === "quem-somos" ? "text-syntiro-600" : "text-gray-600 hover:text-syntiro-600"}`}
            >
              Quem Somos
            </button>
            <a
              href="/oprojeto"
              className="text-sm font-medium text-gray-600 hover:text-syntiro-600"
            >
              O Projeto
            </a>
            <button
              onClick={() => handleScroll("ecopoints")}
              className={`text-sm font-medium ${activeSection === "ecopoints" ? "text-syntiro-600" : "text-gray-600 hover:text-syntiro-600"}`}
            >
              Ecopontos
            </button>
            <button
              onClick={() => handleScroll("fale-conosco")}
              className={`text-sm font-medium ${activeSection === "fale-conosco" ? "text-syntiro-600" : "text-gray-600 hover:text-syntiro-600"}`}
            >
              Fale Conosco
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/reciclamt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-syntiro-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://tiktok.com/@reciclamt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-syntiro-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="tiktok-icon"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
            <Button
              onClick={() => handleScroll("join")}
              className="bg-syntiro-500 hover:bg-syntiro-600 text-white rounded-xl"
            >
              Participar
            </Button>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section id="hero" className="pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Reciclar é simples.{" "}
                  <span className="text-syntiro-500">
                    E faz toda a diferença.
                  </span>
                </h2>
                <p className="text-gray-600 text-lg max-w-lg">
                  Cada resíduo tem destino certo e seu gesto gera impacto
                  positivo. Juntos, conectamos tecnologia, sustentabilidade e
                  bem-estar social.{" "}
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Button
                    onClick={() => handleScroll("join")}
                    className="bg-syntiro-500 hover:bg-syntiro-600 text-white rounded-xl px-6 py-3 text-lg"
                  >
                    Começar agora <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    onClick={() => handleScroll("how-it-works")}
                    variant="outline"
                    className="border-syntiro-300 text-syntiro-700 hover:bg-syntiro-50 rounded-xl px-6 py-3 text-lg"
                  >
                    Como funciona
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="w-full md:w-5/12 lg:w-5/12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img
                src="/images/container-image.png"
                alt="Containers de reciclagem ReciclaMT"
                className="w-full h-auto rounded-2xl shadow-syntiro-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>
      {/* Rewards Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Ganhe recompensas por reciclar! ♻️
            </h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              Em poucos passos, você ajuda o meio ambiente e recebe prêmios.
            </p>
          </div>

          {/* 3 Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              className="bg-syntiro-50 p-8 rounded-2xl shadow-syntiro text-center border-t-4 border-syntiro-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="h-16 w-16 rounded-full bg-syntiro-100 flex items-center justify-center text-syntiro-600 mb-4 mx-auto">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                🗑️ Leve até um Ecoponto
              </h3>
              <p className="text-gray-600">
                Encontre o ecoponto mais próximo e leve seus materiais
                recicláveis.
              </p>
            </motion.div>

            <motion.div
              className="bg-syntiro-50 p-8 rounded-2xl shadow-syntiro text-center border-t-4 border-blue-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-camera"
                >
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                📸 Registre seu descarte
              </h3>
              <p className="text-gray-600">
                Tire uma foto do seu descarte e envie pelo WhatsApp para
                validação.
              </p>
            </motion.div>

            <motion.div
              className="bg-syntiro-50 p-8 rounded-2xl shadow-syntiro text-center border-t-4 border-green-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4 mx-auto">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                🎁 Ganhe pontos e troque por prêmios
              </h3>
              <p className="text-gray-600">
                Acumule pontos e troque por produtos, descontos e benefícios
                exclusivos.
              </p>
            </motion.div>
          </div>

          {/* CTA Button */}
          <div className="text-center mb-12">
            <Button
              onClick={() => handleScroll("join")}
              className="bg-syntiro-500 hover:bg-syntiro-600 text-white rounded-xl px-8 py-4 text-lg font-semibold"
            >
              Quero participar agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Materials Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Quais materiais o ReciclaMT recolhe?
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8 text-center">
              Os materiais abaixo são os principais itens que coletamos:
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-package"
                  >
                    <path d="m7.5 4.27 9 5.15" />
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                    <path d="m3.3 7 8.7 5 8.7-5" />
                    <path d="M12 22V12" />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  Plástico
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-file"
                  >
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  Papel e Papelão
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-beer"
                  >
                    <path d="M17 11h1a3 3 0 0 1 0 6h-1" />
                    <path d="M9 12v6" />
                    <path d="M13 12v6" />
                    <path d="M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5s2-.5 3-.5 2 .5 3 .5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z" />
                    <path d="M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  Metal
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-bottle"
                  >
                    <path d="M14.7 3h-5.4a.6.6 0 0 0-.6.6v1.8c0 .3.2.6.5.6h5.6c.3 0 .5-.3.5-.6V3.6a.6.6 0 0 0-.6-.6Z" />
                    <path d="M9.8 5.9 7 11v9.6c0 .8.7 1.4 1.5 1.4h7c.8 0 1.5-.6 1.5-1.4V11l-2.8-5.1" />
                    <path d="M13 14.5a2 2 0 0 1-2 0" />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  Vidro
                </span>
              </div>
            </div>
          </div>

          {/* E-book Section */}
          <div className="mt-16 bg-gradient-to-r from-syntiro-500 to-syntiro-600 rounded-2xl p-8 text-white text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                📚 E-book Gratuito: Guia Completo de Reciclagem
              </h3>
              <p className="text-syntiro-100 text-lg mb-6">
                Baixe nosso guia completo com dicas práticas, curiosidades e
                tudo que você precisa saber para reciclar de forma eficiente e
                fazer a diferença no meio ambiente.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center gap-2 text-syntiro-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-check"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>Dicas práticas de separação</span>
                </div>
                <div className="flex items-center gap-2 text-syntiro-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-check"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>Mitos e verdades</span>
                </div>
                <div className="flex items-center gap-2 text-syntiro-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-check"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>Curiosidades sobre reciclagem</span>
                </div>
              </div>
              <Button
                className="mt-6 bg-white text-syntiro-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl"
                onClick={() =>
                  window.open(
                    "https://drive.google.com/file/d/178mw3jgLN9C-857Bh7F-MGyGScBM0Irx/view?usp=sharing",
                    "_blank",
                  )
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-download mr-2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7,10 12,15 17,10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Baixar E-book Gratuito
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Benefits Section */}
      <section id="benefits" className="py-16 md:py-24 bg-syntiro-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que participar do ReciclaMT?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-syntiro text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-6xl mb-4">🎁</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Recompensas Exclusivas
              </h3>
              <p className="text-gray-600 text-lg">
                Troque pontos por prêmios e descontos.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-2xl shadow-syntiro text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Ajuda ao Meio Ambiente
              </h3>
              <p className="text-gray-600 text-lg">
                Reduza o lixo e ajude a preservar Cuiabá.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-2xl shadow-syntiro text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Comunidade Engajada
              </h3>
              <p className="text-gray-600 text-lg">
                Ensine boas práticas aos seus filhos e netos.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-2xl shadow-syntiro text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-6xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Acompanhamento dos seus impactos
              </h3>
              <p className="text-gray-600 text-lg">
                Veja quantos kg reciclou e seu impacto positivo.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Quem Somos Section */}
      <section id="quem-somos" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quem Somos
            </h2>
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Propósito
              </h3>
              <p className="text-gray-600 text-lg mb-8 text-justify">
                No ReciclaMT, acreditamos que a transformação ambiental começa
                por atitudes simples. Queremos revolucionar o gerenciamento de
                resíduos por meio de tecnologia e inovação. Nosso propósito é
                facilitar a reciclagem urbana com soluções acessíveis,
                educativas e conectadas com a realidade das pessoas e do
                planeta.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              className="bg-syntiro-50 p-6 rounded-2xl shadow-syntiro border-t-4 border-syntiro-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <Leaf className="mr-2 h-5 w-5 text-syntiro-500" />
                Missão
              </h3>
              <p className="text-gray-600">
                Gerar valor para pessoas, empresas e instituições públicas
                através do engajamento do descarte correto.
              </p>
            </motion.div>

            <motion.div
              className="bg-syntiro-50 p-6 rounded-2xl shadow-syntiro border-t-4 border-blue-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-blue-500" />
                Visão
              </h3>
              <p className="text-gray-600">
                Ser uma referência em soluções tecnológicas para reciclagem
                urbana no Brasil, promovendo inclusão, circularidade e inovação
                na gestão de resíduos.
              </p>
            </motion.div>

            <motion.div
              className="bg-syntiro-50 p-6 rounded-2xl shadow-syntiro border-t-4 border-green-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <Award className="mr-2 h-5 w-5 text-green-500" />
                Valores
              </h3>
              <p className="text-gray-600">
                Responsabilidade socioambiental e impacto positivo;
                Democratização do acesso à destinação correta de resíduos com
                tecnologia; Acessibilidade/inclusão; Simplificação de processos;
                Inovação; Diversidade.
              </p>
            </motion.div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Nossa História
            </h3>
            <div className="bg-gradient-to-br from-syntiro-50 to-white p-8 rounded-2xl shadow-syntiro max-w-4xl mx-auto border-l-4 border-syntiro-500">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">💬</div>
              </div>
              <blockquote className="text-gray-700 text-lg leading-relaxed italic space-y-4">
                <p className="mb-4">
                  &quot;Sempre me incomodou ver tanto material reciclável indo
                  pro lixo em Cuiabá. A cidade é quente, os ecopontos são
                  distantes, e reciclar acaba sendo difícil pra muita gente.
                </p>
                <p className="mb-4">
                  O ReciclaMT nasceu da vontade de facilitar isso. Criamos uma
                  forma simples de reciclar e ainda ser recompensado por isso —
                  sem precisar instalar nada, só usando o WhatsApp.
                </p>
                <p className="mb-6">
                  Mais do que reciclagem, queremos criar uma rede de pessoas que
                  se importam com o futuro, que valorizam os catadores e que
                  acreditam que cada atitude conta.
                </p>
                <footer className="text-right not-italic">
                  <cite className="text-syntiro-600 font-semibold text-xl">
                    — Thiago, fundador do ReciclaMT.
                  </cite>
                </footer>
              </blockquote>
              <div className="text-center mt-8">
                <a
                  href="/quemsomos"
                  className="inline-flex items-center text-syntiro-600 hover:text-syntiro-700 font-medium text-lg transition-colors"
                >
                  Conheça mais sobre nossa história
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2 lucide lucide-arrow-right"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="text-center">
              <a
                href="/oprojeto"
                className="inline-flex items-center text-syntiro-600 hover:text-syntiro-700 font-medium text-lg transition-colors"
              >
                Conheça mais sobre o projeto e os ODS
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2 lucide lucide-arrow-right"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Ecopoints Section */}
      <section id="ecopoints" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ecopontos
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Em breve, divulgaremos os primeiros locais de instalação dos
              ecopontos.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <EcoPointsMap />
          </motion.div>
        </div>
      </section>
      {/* Join Section */}
      <section id="join" className="py-16 md:py-24 bg-syntiro-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Junte-se ao ReciclaMT
                </h2>
                <p className="text-gray-600 text-lg max-w-lg">
                  Cadastre-se agora e comece a transformar suas ações de
                  reciclagem em recompensas valiosas. É rápido, fácil e
                  gratuito!
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-syntiro">
                    <div className="h-12 w-12 rounded-full bg-syntiro-100 flex items-center justify-center text-syntiro-600">
                      <span className="text-xl font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Rápido</h3>
                      <p className="text-sm text-gray-600">
                        Cadastro em segundos
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-syntiro">
                    <div className="h-12 w-12 rounded-full bg-syntiro-100 flex items-center justify-center text-syntiro-600">
                      <span className="text-xl font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Simples</h3>
                      <p className="text-sm text-gray-600">
                        Interface intuitiva
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-syntiro">
                    <div className="h-12 w-12 rounded-full bg-syntiro-100 flex items-center justify-center text-syntiro-600">
                      <span className="text-xl font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Gratuito</h3>
                      <p className="text-sm text-gray-600">
                        Sem custos para participar
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl shadow-syntiro-lg p-6 w-full max-w-md mx-auto">
                <AuthForms
                  onLogin={(data) => {
                    console.log("Login callback triggered with data:", data);
                    setUserAuthenticated(true);
                    if (onLogin) onLogin(data);
                  }}
                  onRegister={(data) => {
                    console.log("Register callback triggered with data:", data);
                    setUserAuthenticated(true);
                    if (onRegister) onRegister(data);
                  }}
                  defaultTab="register"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Fale Conosco Section */}
      <section id="fale-conosco" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Fale Conosco
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Surgiu alguma dúvida? Entre em contato e nos diga como podemos te
              ajudar. Caso prefira, ligue para o nosso atendimento ou utilize o
              endereço de e-mail abaixo para registrar sua dúvida, consideração,
              reclamação e/ou opinião.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-syntiro border-t-4 border-syntiro-500 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="h-16 w-16 rounded-full bg-syntiro-100 flex items-center justify-center text-syntiro-600 mb-4">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                Email
              </h3>
              <a
                href="mailto:contato@reciclamt.com.br"
                className="text-syntiro-600 hover:text-syntiro-700 font-medium text-lg"
              >
                contato@reciclamt.com.br
              </a>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-2xl shadow-syntiro border-t-4 border-green-500 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
                <Phone className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                WhatsApp
              </h3>
              <a
                href="https://wa.me/5565984424273"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 font-medium text-lg"
              >
                +55 65 98442-4273
              </a>
            </motion.div>
          </div>
        </div>
      </section>
       {/* Seção de parceiros/apoio - acima do footer de navegação */}
      <section className="w-full bg-white py-6 border-t mt-12">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h3 className="text-sm font-semibold text-gray-600 mb-3">Apoio:</h3>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {parceiros.map((p) => (
              <img
                key={p.alt}
                src={p.src}
                alt={p.alt}
                className="h-12 md:h-16 object-contain"
                style={{ maxWidth: 207 }}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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
            <div className="flex flex-wrap gap-6">
              <button
                onClick={() => handleScroll("hero")}
                className="text-gray-300 hover:text-white"
              >
                Início
              </button>
              <button
                onClick={() => handleScroll("how-it-works")}
                className="text-gray-300 hover:text-white"
              >
                Como Funciona
              </button>
              <button
                onClick={() => handleScroll("benefits")}
                className="text-gray-300 hover:text-white"
              >
                Benefícios
              </button>
              <button
                onClick={() => handleScroll("quem-somos")}
                className="text-gray-300 hover:text-white"
              >
                Quem Somos
              </button>
              <a href="/oprojeto" className="text-gray-300 hover:text-white">
                O Projeto
              </a>
              <button
                onClick={() => handleScroll("ecopoints")}
                className="text-gray-300 hover:text-white"
              >
                Ecopontos
              </button>
              <button
                onClick={() => handleScroll("fale-conosco")}
                className="text-gray-300 hover:text-white"
              >
                Fale Conosco
              </button>
              <button
                onClick={() => handleScroll("join")}
                className="text-gray-300 hover:text-white"
              >
                Participar
              </button>
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

export default Home;
