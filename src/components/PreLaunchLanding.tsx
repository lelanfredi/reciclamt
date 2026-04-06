import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Clock, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { applyPhoneMask, removePhoneMask, normalizePhoneForStorage } from "@/lib/masks";

const PreLaunchLanding = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    neighborhood: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const { toast } = useToast();

  // Simular contador de registros (em produção seria buscado do banco)
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalRegistrations(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'phone' ? applyPhoneMask(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.neighborhood) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('pre_cadastro')
        .insert([
          {
            name: formData.name,
            phone: normalizePhoneForStorage(removePhoneMask(formData.phone)), // Normaliza com código do país
            neighborhood: formData.neighborhood,
            status: 'active'
          }
        ]);

      if (error) throw error;

      toast({
        title: "Cadastro realizado com sucesso! 🎉",
        description: "Vamos te avisar quando tudo estiver funcionando!",
      });

      // Limpar formulário
      setFormData({ name: "", phone: "", neighborhood: "" });
      
      // Atualizar contador
      setTotalRegistrations(prev => prev + 1);

    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      toast({
        title: "Erro no cadastro",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md z-50 shadow-sm border-b border-green-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="/images/reciclamt-logo.png"
              alt="ReciclaMT Logo"
              className="h-10 w-auto"
            />
            <h1 className="text-2xl font-bold text-green-700">ReciclaMT</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm text-green-600">
              <Users className="h-4 w-4" />
              <span>{totalRegistrations}+ cuiabanos cadastrados</span>
            </div>
            <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
              Saiba Mais
            </Button>
          </div>
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
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Clock className="h-4 w-4" />
                Pré-lançamento exclusivo
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Cuiabá recicla apenas{" "}
                <span className="text-red-500">5%</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-green-700 mb-8">
                Vamos mudar isso juntos?
              </h2>
              
                              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                  Com o ReciclaMT, você vai poder trocar seus materiais recicláveis por prêmios e ainda ajudar o meio ambiente.
                  <strong className="text-green-700"> Quer ser um dos primeiros a usar quando estiver pronto?</strong>
                </p>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            className="max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card className="border-2 border-green-200 shadow-xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 font-medium">
                      Nome completo
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Digite seu nome completo"
                      className="mt-2 border-green-200 focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-gray-700 font-medium">
                      WhatsApp
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(65) 99999-9999"
                      className="mt-2 border-green-200 focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="neighborhood" className="text-gray-700 font-medium">
                      Bairro
                    </Label>
                    <Input
                      id="neighborhood"
                      name="neighborhood"
                      type="text"
                      value={formData.neighborhood}
                      onChange={handleInputChange}
                      placeholder="Digite seu bairro"
                      className="mt-2 border-green-200 focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 text-lg rounded-xl transition-all duration-200 transform hover:scale-105"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Cadastrando...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Quero participar
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    )}
                  </Button>
                </form>
                
                <p className="text-center text-gray-600 text-sm mt-4">
                  Vamos te avisar quando tudo estiver funcionando e você poderá começar a ganhar pontos reciclando.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default PreLaunchLanding;