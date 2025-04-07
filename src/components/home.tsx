import React from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import AuthForms from "./AuthForms";
import Dashboard from "./Dashboard";

interface HomeProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

const Home = ({ isAuthenticated = false, onLogout = () => {} }: HomeProps) => {
  return (
    <div className="min-h-screen bg-syntiro-50 flex flex-col items-center justify-center p-4 md:p-8">
      {!isAuthenticated ? (
        <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-syntiro-500 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 19l5-5 5 5" />
                    <path d="M12 14V5" />
                    <path d="M7 10l5-5 5 5" />
                  </svg>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
                  ReciclaMT
                </h1>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
                  Transforme{" "}
                  <span className="text-syntiro-500">reciclagem</span> em{" "}
                  <span className="text-syntiro-500">recompensas</span>
                </h2>
                <p className="text-gray-600 text-lg max-w-lg">
                  Junte-se à comunidade de reciclagem em Cuiabá, acumule pontos
                  e troque por recompensas exclusivas. Cada ação sustentável
                  conta!
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-syntiro">
                  <div className="h-12 w-12 rounded-full bg-syntiro-100 flex items-center justify-center text-syntiro-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Simples</h3>
                    <p className="text-sm text-gray-600">Interface intuitiva</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-syntiro">
                  <div className="h-12 w-12 rounded-full bg-syntiro-100 flex items-center justify-center text-syntiro-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Recompensas</h3>
                    <p className="text-sm text-gray-600">Prêmios exclusivos</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="w-full md:w-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-syntiro-lg p-6 w-full max-w-md mx-auto">
              <AuthForms />
            </div>
          </motion.div>
        </div>
      ) : (
        <motion.div
          className="w-full max-w-7xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-syntiro-500 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 19l5-5 5 5" />
                  <path d="M12 14V5" />
                  <path d="M7 10l5-5 5 5" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">ReciclaMT</h1>
            </div>
            <Button variant="outline" onClick={onLogout}>
              Sair
            </Button>
          </div>
          <Dashboard />
        </motion.div>
      )}

      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>© 2023 ReciclaMT - Plataforma de Gamificação para Reciclagem</p>
        <p className="mt-1">Cuiabá, Mato Grosso</p>
      </footer>
    </div>
  );
};

export default Home;
