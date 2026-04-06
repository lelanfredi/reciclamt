import React from "react";
import { CNPJ, LINKS } from "@/config/constants";

const PageFooter: React.FC = () => {
  return (
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
              direitos reservados I CNPJ {CNPJ}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={LINKS.ebook}
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
                href={LINKS.termosDeUso}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                Termos de Uso
              </a>
              <a
                href={LINKS.politicaPrivacidade}
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
  );
};

export default PageFooter;
