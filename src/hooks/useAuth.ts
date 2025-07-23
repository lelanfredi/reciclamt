import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Tables } from "../types/supabase";

type User = Tables<"users"> & { role?: string };

// Função utilitária para traduzir mensagens de erro do Supabase
function traduzirErroSupabase(mensagem: string): string {
  if (!mensagem) return "Erro desconhecido. Tente novamente.";
  if (mensagem.includes("429") || mensagem.includes("Too Many Requests") || mensagem.includes("For security purposes")) {
    return "Você está tentando se cadastrar muito rápido. Aguarde 15 segundos e tente novamente.";
  }
  if (mensagem.includes("User already registered") || mensagem.includes("Usuário já existe")) {
    return "Usuário já existe com este email ou telefone.";
  }
  if (mensagem.includes("Invalid login credentials") || mensagem.includes("Credenciais inválidas")) {
    return "E-mail ou senha incorretos.";
  }
  if (mensagem.includes("Password should be at least 6 characters")) {
    return "A senha deve ter pelo menos 6 caracteres.";
  }
  if (mensagem.includes("Signup is disabled")) {
    return "Cadastro temporariamente indisponível.";
  }
  if (mensagem.includes("Invalid email")) {
    return "E-mail inválido.";
  }
  if (mensagem.includes("400") || mensagem.includes("406")) {
    return "Dados inválidos ou já cadastrados.";
  }
  if (mensagem.includes("401") || mensagem.includes("Unauthorized")) {
    return "Erro de autorização. Verifique sua conexão e tente novamente.";
  }
  if (mensagem.includes("duplicate key value") || mensagem.includes("23505")) {
    return "Usuário já existe com este email ou telefone.";
  }
  return "Erro: " + mensagem;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("reciclamt_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (identifier: string, password?: string) => {
    try {
      setLoading(true);
      console.log("[ReciclaMT][DEBUG] Login attempt for:", identifier);

      // Clean up identifier (remove extra spaces)
      const cleanIdentifier = identifier.trim();

      // Check if identifier is email or phone
      const isEmail = cleanIdentifier.includes("@");

      if (isEmail) {
        // Try Supabase Auth for email login first
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: cleanIdentifier,
            password: password || "defaultpassword",
          });

          if (!error && data.user) {
            // Get user profile from database
            const { data: userProfile, error: profileError } = await supabase
              .from("users")
              .select("*")
              .eq("email", cleanIdentifier)
              .single();

            if (!profileError && userProfile) {
              const userData = {
                ...userProfile,
                role: userProfile.role || (["reciclamt.projeto@gmail.com", "admin@reciclamt.com", "admin@example.com"].includes(userProfile.email) ? "admin" : "user"),
              };

              setUser(userData);
              localStorage.setItem("reciclamt_user", JSON.stringify(userData));
              return { user: userData, error: null };
            }
          }
        } catch (authError) {
          console.log("[ReciclaMT][DEBUG] Auth login failed, trying database login");
        }

        // Fallback: try to find user in database directly
        const { data: userProfile, error: profileError } = await supabase
          .from("users")
          .select("*")
          .eq("email", cleanIdentifier)
          .single();

        if (profileError || !userProfile) {
          return { user: null, error: { message: traduzirErroSupabase("E-mail ou senha incorretos") } };
        }

        const userData = {
          ...userProfile,
          role: userProfile.role || (["reciclamt.projeto@gmail.com", "admin@reciclamt.com", "admin@example.com"].includes(userProfile.email) ? "admin" : "user"),
        };

        setUser(userData);
        localStorage.setItem("reciclamt_user", JSON.stringify(userData));
        return { user: userData, error: null };

      } else {
        // For phone login, try to find user in database
        const { data: userProfile, error: profileError } = await supabase
          .from("users")
          .select("*")
          .eq("phone", cleanIdentifier)
          .single();

        if (profileError || !userProfile) {
          console.error("[ReciclaMT][ERROR] Phone login error:", profileError);
          return { user: null, error: { message: traduzirErroSupabase("Usuário não encontrado") } };
        }

        const userData = {
          ...userProfile,
          role: userProfile.role || "user",
        };

        setUser(userData);
        localStorage.setItem("reciclamt_user", JSON.stringify(userData));
        return { user: userData, error: null };
      }
    } catch (error: any) {
      console.error("[ReciclaMT][ERROR] Login exception:", error);
      return { user: null, error: { message: traduzirErroSupabase(error?.message || "Erro no login") } };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: {
    name: string;
    phone: string;
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      console.log("[ReciclaMT][DEBUG] Registration attempt for:", userData.email);

      // Gerar um ID único para o usuário
      const userId = crypto.randomUUID();
      const createdAt = new Date().toISOString();

      console.log("[ReciclaMT][DEBUG] Creating user directly in database with ID:", userId);

      // Criar usuário diretamente no banco de dados
      // As políticas RLS já permitem INSERT para anon, então isso deve funcionar
      const { data: newUserData, error: dbError } = await supabase
        .from("users")
        .insert({
          id: userId,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          points: 0,
          avatar_seed: "felix",
          role: ["reciclamt.projeto@gmail.com", "admin@reciclamt.com", "admin@example.com"].includes(userData.email) ? "admin" : "user",
        })
        .select()
        .single();

      if (dbError) {
        console.error("[ReciclaMT][ERROR] Database insert error:", dbError);
        
        // Se o erro é de conflito (usuário já existe)
        if (dbError.code === "23505" || dbError.message.includes("duplicate key")) {
          return {
            user: null,
            error: { message: traduzirErroSupabase("Usuário já existe com este email ou telefone") },
          };
        }
        
        return {
          user: null,
          error: { message: traduzirErroSupabase(dbError.message || "Erro ao criar conta") },
        };
      }

      console.log("[ReciclaMT][DEBUG] User created successfully:", newUserData);

      // Tentar criar no Supabase Auth também (mas não falhar se der erro)
      try {
        await supabase.auth.signUp({
          email: userData.email,
          password: userData.password,
          options: {
            data: {
              name: userData.name,
              phone: userData.phone,
              user_id: userId, // Link para o registro na tabela users
            },
          },
        });
        console.log("[ReciclaMT][DEBUG] Auth user created successfully");
      } catch (authError) {
        console.log("[ReciclaMT][DEBUG] Auth signup failed, but user was created in database:", authError);
        // Não retornar erro aqui, pois o usuário foi criado no banco
      }

      // Criar objeto do usuário
      const newUser = {
        id: userId,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        points: newUserData?.points || 0,
        avatar_seed: newUserData?.avatar_seed || "felix",
        role: newUserData?.role || (["reciclamt.projeto@gmail.com", "admin@reciclamt.com", "admin@example.com"].includes(userData.email) ? "admin" : "user"),
        created_at: createdAt,
        updated_at: new Date().toISOString(),
      };

      setUser(newUser);
      localStorage.setItem("reciclamt_user", JSON.stringify(newUser));
      return { user: newUser, error: null };

    } catch (error: any) {
      console.error("[ReciclaMT][ERROR] Registration exception:", error);
      return { user: null, error: { message: traduzirErroSupabase(error?.message || "Erro ao criar conta") } };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.log("[ReciclaMT][DEBUG] Auth signout failed, but clearing local session");
    }
    setUser(null);
    localStorage.removeItem("reciclamt_user");
  };

  const updateUserPoints = async (points: number) => {
    if (!user) return;

    try {
      // Update points in database
      const { data, error } = await supabase
        .from("users")
        .update({ points, updated_at: new Date().toISOString() })
        .eq("id", user.id)
        .select()
        .single();

      if (error) {
        console.error("Error updating points:", error);
        // Fallback to local update if database update fails
      }

      const updatedUser = {
        ...user,
        points,
        updated_at: new Date().toISOString(),
      };

      setUser(updatedUser);
      localStorage.setItem("reciclamt_user", JSON.stringify(updatedUser));
      return { user: updatedUser, error: null };
    } catch (error: any) {
      return { user: null, error };
    }
  };

  const updateUserAvatar = async (avatarSeed: string) => {
    if (!user) return;

    try {
      // Update avatar in database
      const { data, error } = await supabase
        .from("users")
        .update({
          avatar_seed: avatarSeed,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)
        .select()
        .single();

      if (error) {
        console.error("Error updating avatar:", error);
        // Fallback to local update if database update fails
      }

      const updatedUser = {
        ...user,
        avatar_seed: avatarSeed,
        updated_at: new Date().toISOString(),
      };

      setUser(updatedUser);
      localStorage.setItem("reciclamt_user", JSON.stringify(updatedUser));
      return { user: updatedUser, error: null };
    } catch (error: any) {
      return { user: null, error };
    }
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    updateUserPoints,
    updateUserAvatar,
    isAuthenticated: !!user,
  };
}