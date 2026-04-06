import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PageHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
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
          onClick={() => navigate("/")}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao Início
        </Button>
      </div>
    </header>
  );
};

export default PageHeader;
