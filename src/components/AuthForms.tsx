import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Leaf, Phone, Mail, Check, AlertCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const loginSchema = z.object({
  phone: z.string().min(11, { message: "Telefone inválido" }),
});

const registerSchema = z.object({
  name: z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  phone: z.string().min(11, { message: "Telefone inválido (inclua DDD)" }),
  email: z
    .string()
    .email({ message: "Email inválido" })
    .optional()
    .or(z.literal("")),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "Você precisa aceitar os termos de uso" }),
  }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

interface AuthFormsProps {
  onLogin?: (data: LoginFormValues) => void;
  onRegister?: (data: RegisterFormValues) => void;
  defaultTab?: "login" | "register";
}

const AuthForms = ({
  onLogin,
  onRegister,
  defaultTab = "register",
}: AuthFormsProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [verificationError, setVerificationError] = useState(false);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      acceptTerms: false,
    },
  });

  const handleLoginSubmit = (data: LoginFormValues) => {
    console.log("Login data:", data);
    // Simulate sending verification code via WhatsApp
    setVerificationSent(true);
    // In a real app, this would call an API to send a verification code
    if (onLogin) onLogin(data);
  };

  const handleRegisterSubmit = (data: RegisterFormValues) => {
    console.log("Register data:", data);
    // Simulate sending verification code via WhatsApp
    setVerificationSent(true);
    // In a real app, this would call an API to send a verification code
    if (onRegister) onRegister(data);
  };

  const handleVerifyCode = () => {
    setIsVerifying(true);
    // Simulate verification process
    setTimeout(() => {
      // For demo purposes, any 6-digit code is valid
      if (verificationCode.length === 6) {
        setVerificationSuccess(true);
        setVerificationError(false);
      } else {
        setVerificationError(true);
        setVerificationSuccess(false);
      }
      setIsVerifying(false);
    }, 1500);
  };

  const resetVerification = () => {
    setVerificationSent(false);
    setVerificationCode("");
    setVerificationSuccess(false);
    setVerificationError(false);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-syntiro overflow-hidden">
      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value as "login" | "register");
          resetVerification();
        }}
      >
        <div className="p-6 bg-syntiro-50">
          <div className="flex justify-center mb-4">
            <div className="bg-syntiro-500 p-3 rounded-full">
              <Leaf className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-gray-900 mb-2">
            ReciclaMT
          </CardTitle>
          <CardDescription className="text-center text-gray-600 mb-6">
            Transforme reciclagem em recompensas
          </CardDescription>
          <TabsList className="grid w-full grid-cols-2 mb-4 bg-syntiro-100">
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-white data-[state=active]:text-syntiro-700 data-[state=active]:shadow-sm"
            >
              Entrar
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="data-[state=active]:bg-white data-[state=active]:text-syntiro-700 data-[state=active]:shadow-sm"
            >
              Cadastrar
            </TabsTrigger>
          </TabsList>
        </div>

        <CardContent className="p-6">
          {!verificationSent ? (
            <>
              <TabsContent value="login">
                <Form {...loginForm}>
                  <form
                    onSubmit={loginForm.handleSubmit(handleLoginSubmit)}
                    className="space-y-5"
                  >
                    <FormField
                      control={loginForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">
                            WhatsApp
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-syntiro-500 h-4 w-4" />
                              <Input
                                placeholder="(00) 00000-0000"
                                className="pl-10 border-syntiro-200 focus:border-syntiro-500 focus:ring-syntiro-500 rounded-xl"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full bg-syntiro-500 hover:bg-syntiro-600 text-white rounded-xl py-3"
                    >
                      Receber código no WhatsApp
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="register">
                <Form {...registerForm}>
                  <form
                    onSubmit={registerForm.handleSubmit(handleRegisterSubmit)}
                    className="space-y-5"
                  >
                    <FormField
                      control={registerForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">
                            Nome completo
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Seu nome"
                              className="border-syntiro-200 focus:border-syntiro-500 focus:ring-syntiro-500 rounded-xl"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">
                            WhatsApp
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-syntiro-500 h-4 w-4" />
                              <Input
                                placeholder="(00) 00000-0000"
                                className="pl-10 border-syntiro-200 focus:border-syntiro-500 focus:ring-syntiro-500 rounded-xl"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-500" />
                          <p className="text-xs text-gray-500 mt-1">
                            Usaremos para enviar confirmações e notificações
                          </p>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">
                            Email (opcional)
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-syntiro-500 h-4 w-4" />
                              <Input
                                placeholder="seu@email.com"
                                className="pl-10 border-syntiro-200 focus:border-syntiro-500 focus:ring-syntiro-500 rounded-xl"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="acceptTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl p-4 border border-syntiro-200 bg-syntiro-50/50">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="border-syntiro-300 text-syntiro-500 focus:ring-syntiro-500"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-gray-700">
                              Aceito os termos de uso e política de privacidade
                            </FormLabel>
                            <p className="text-xs text-gray-500">
                              Ao aceitar, você concorda em receber mensagens
                              sobre reciclagem e recompensas.
                            </p>
                          </div>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full bg-syntiro-500 hover:bg-syntiro-600 text-white rounded-xl py-3"
                    >
                      Cadastrar com WhatsApp
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </>
          ) : (
            <div className="space-y-5">
              <h3 className="text-lg font-semibold text-gray-900">
                Verificação por WhatsApp
              </h3>
              <p className="text-sm text-gray-600">
                Enviamos um código de verificação para o seu WhatsApp. Por
                favor, insira o código abaixo para continuar.
              </p>

              {verificationSuccess && (
                <Alert className="bg-syntiro-50 border-syntiro-200 rounded-xl">
                  <Check className="h-4 w-4 text-syntiro-600" />
                  <AlertTitle className="text-syntiro-800 font-semibold">
                    Verificação concluída!
                  </AlertTitle>
                  <AlertDescription className="text-syntiro-700">
                    Seu número foi verificado com sucesso. Você será
                    redirecionado em instantes.
                  </AlertDescription>
                </Alert>
              )}

              {verificationError && (
                <Alert className="bg-red-50 border-red-200 rounded-xl">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertTitle className="text-red-800 font-semibold">
                    Código inválido
                  </AlertTitle>
                  <AlertDescription className="text-red-700">
                    O código informado não é válido. Por favor, verifique e
                    tente novamente.
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label
                  htmlFor="verification-code"
                  className="text-gray-700 font-medium"
                >
                  Código de verificação
                </Label>
                <Input
                  id="verification-code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Digite o código de 6 dígitos"
                  maxLength={6}
                  className="text-center text-lg tracking-widest border-syntiro-200 focus:border-syntiro-500 focus:ring-syntiro-500 rounded-xl"
                  disabled={verificationSuccess}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleVerifyCode}
                  className="flex-1 bg-syntiro-500 hover:bg-syntiro-600 text-white rounded-xl py-3"
                  disabled={
                    verificationCode.length !== 6 ||
                    isVerifying ||
                    verificationSuccess
                  }
                >
                  {isVerifying ? "Verificando..." : "Verificar código"}
                </Button>
                <Button
                  variant="outline"
                  onClick={resetVerification}
                  disabled={isVerifying || verificationSuccess}
                  className="border-syntiro-200 text-syntiro-700 hover:bg-syntiro-50 rounded-xl"
                >
                  Voltar
                </Button>
              </div>

              <p className="text-xs text-center text-gray-500 mt-4">
                Não recebeu o código?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-xs text-syntiro-600 hover:text-syntiro-700"
                  onClick={resetVerification}
                >
                  Tentar novamente
                </Button>
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter className="p-6 pt-0 text-center text-sm text-gray-500">
          {!verificationSent &&
            (activeTab === "login" ? (
              <p>
                Não tem uma conta?{" "}
                <Button
                  variant="link"
                  className="p-0 text-syntiro-600 hover:text-syntiro-700"
                  onClick={() => setActiveTab("register")}
                >
                  Cadastre-se
                </Button>
              </p>
            ) : (
              <p>
                Já tem uma conta?{" "}
                <Button
                  variant="link"
                  className="p-0 text-syntiro-600 hover:text-syntiro-700"
                  onClick={() => setActiveTab("login")}
                >
                  Faça login
                </Button>
              </p>
            ))}
        </CardFooter>
      </Tabs>
    </div>
  );
};

export default AuthForms;
