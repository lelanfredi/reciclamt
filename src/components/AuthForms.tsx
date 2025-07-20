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
import { Leaf, Phone, Mail, Check, AlertCircle, Lock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";

const loginSchema = z.object({
  identifier: z.string().min(1, "WhatsApp ou email é obrigatório"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

const registerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  phone: z
    .string()
    .min(10, "Número de WhatsApp deve ter pelo menos 10 dígitos")
    .regex(/^\d+$/, "Apenas números são permitidos"),
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, "Você deve aceitar os termos"),
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

  const [authError, setAuthError] = useState<string | null>(null);

  const { login, register, loading } = useAuth();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      acceptTerms: false,
    },
  });

  const handleLoginSubmit = async (data: LoginFormValues) => {
    console.log("Login data:", data);
    setAuthError(null);

    // Try to login with identifier (phone or email) and password
    const { user, error } = await login(data.identifier, data.password);

    if (error) {
      setAuthError(error.message);
      return;
    }

    if (user && onLogin) {
      onLogin(data);
    }
  };

  const handleRegisterSubmit = async (data: RegisterFormValues) => {
    console.log("Register data:", data);
    setAuthError(null);

    // Try to register with Supabase
    const { user, error } = await register({
      name: data.name,
      phone: data.phone,
      email: data.email,
      password: data.password,
    });

    if (error) {
      setAuthError(error.message);
      return;
    }

    if (user && onRegister) {
      onRegister(data);
    }
  };

  const handleVerifyCode = () => {
    setIsVerifying(true);

    setTimeout(() => {
      const currentPhone =
        activeTab === "login"
          ? loginForm.getValues().phone
          : registerForm.getValues().phone;

      // Check if it's the test user with specific code validation
      if (currentPhone === "12996811965") {
        if (verificationCode === "123456") {
          setVerificationSuccess(true);
          setVerificationError(false);
        } else {
          setVerificationSuccess(false);
          setVerificationError(true);
        }
      } else {
        // For other users, any code is valid for testing
        setVerificationSuccess(true);
        setVerificationError(false);
      }

      setIsVerifying(false);

      // Auto-login after successful verification
      if (
        verificationSuccess ||
        (currentPhone === "12996811965" && verificationCode === "123456") ||
        currentPhone !== "12996811965"
      ) {
        setTimeout(() => {
          if (activeTab === "login" && onLogin) {
            console.log("Auto-login: Calling onLogin callback");
            onLogin({
              phone: loginForm.getValues().phone,
              email: loginForm.getValues().email,
            });
          } else if (activeTab === "register" && onRegister) {
            console.log("Auto-login: Calling onRegister callback");
            onRegister({
              name: registerForm.getValues().name,
              phone: registerForm.getValues().phone,
              email: registerForm.getValues().email,
              acceptTerms: registerForm.getValues().acceptTerms,
            });
          }
        }, 1000); // Wait 1 second before redirecting to show the success message
      }
    }, 300);
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
          {authError && (
            <Alert className="mb-4 bg-red-50 border-red-200 rounded-xl">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-800 font-semibold">
                Erro
              </AlertTitle>
              <AlertDescription className="text-red-700">
                {authError}
              </AlertDescription>
            </Alert>
          )}

          <TabsContent value="login">
            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(handleLoginSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={loginForm.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        WhatsApp ou Email
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-syntiro-500 h-4 w-4" />
                          <Input
                            placeholder="12996811965 ou seu@email.com"
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
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Senha
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-syntiro-500 h-4 w-4" />
                          <Input
                            type="password"
                            placeholder="Sua senha"
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
                  disabled={loading}
                  className="w-full bg-syntiro-500 hover:bg-syntiro-600 text-white rounded-xl py-3"
                >
                  {loading ? "Entrando..." : "Entrar"}
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
                            placeholder="12996811965"
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
                        Email
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Senha
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-syntiro-500 h-4 w-4" />
                          <Input
                            type="password"
                            placeholder="Mínimo 6 caracteres"
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
                          Ao aceitar, você concorda em receber mensagens sobre
                          reciclagem e recompensas.
                        </p>
                      </div>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-syntiro-500 hover:bg-syntiro-600 text-white rounded-xl py-3"
                >
                  {loading ? "Cadastrando..." : "Cadastrar"}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </CardContent>

        <CardFooter className="p-6 pt-0 text-center text-sm text-gray-500">
          {activeTab === "login" ? (
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
          )}
        </CardFooter>
      </Tabs>
    </div>
  );
};

export default AuthForms;
