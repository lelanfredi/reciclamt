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
  return "Erro: " + mensagem;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("reciclamt_user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      // Buscar dados mais recentes do usuário no Supabase
      (async () => {
        const { data, error } = await supabase.from("users").select("*").eq("id", parsedUser.id).single();
        if (!error && data) {
          setUser(data);
          localStorage.setItem("reciclamt_user", JSON.stringify(data));
        }
      })();
    }
    setLoading(false);
  }, []);

  const login = async (identifier: string, password?: string) => {
    try {
      setLoading(true);

      // Clean up identifier (remove extra spaces)
      const cleanIdentifier = identifier.trim();

      // Check if identifier is email or phone
      const isEmail = cleanIdentifier.includes("@");

      if (isEmail) {
        // Use Supabase Auth for email login
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanIdentifier,
          password: password || "defaultpassword",
        });

        if (error) {
          return { user: null, error: { message: traduzirErroSupabase("Credenciais inválidas") } };
        }

        // Get user profile from database
        const { data: userProfile, error: profileError } = await supabase
          .from("users")
          .select("*")
          .eq("id", data.user.id)
          .single();

        let userData;
        if (profileError || !userProfile) {
          // If no profile exists, create one from auth metadata
          userData = {
            id: data.user.id,
            name: data.user.user_metadata?.name || "Usuário",
            email: data.user.email || cleanIdentifier,
            phone: data.user.user_metadata?.phone || "",
            points: 0,
            avatar_seed: "felix",
            role: ["reciclamt.projeto@gmail.com", "admin@reciclamt.com", "admin@example.com"].includes(data.user.email) ? "admin" : "user",
            created_at: data.user.created_at,
            updated_at: new Date().toISOString(),
          };
        } else {
          // Use existing profile data
          userData = {
            ...userProfile,
            role: userProfile.role || (["reciclamt.projeto@gmail.com", "admin@reciclamt.com", "admin@example.com"].includes(userProfile.email) ? "admin" : "user"),
          };
        }

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
          return { user: null, error: { message: traduzirErroSupabase("Usuário não encontrado") } };
        }

        const userData = {
          ...userProfile,
          is_admin: userProfile.email === "reciclamt.projeto@gmail.com",
        };

        setUser(userData);
        localStorage.setItem("reciclamt_user", JSON.stringify(userData));
        return { user: userData, error: null };
      }
    } catch (error: any) {
      return { user: null, error };
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

      // Check if user already exists
      const { data: existingUser } = await supabase
        .from("users")
        .select("*")
        .or(`email.eq.${userData.email},phone.eq.${userData.phone}`)
        .single();

      if (existingUser) {
        return {
          user: null,
          error: { message: traduzirErroSupabase("Usuário já existe com este email ou telefone") },
        };
      }

      // Try Supabase Auth registration first
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            phone: userData.phone,
          },
        },
      });

      let userId: string;
      let createdAt: string;

      if (authError && authError.message.includes("Signup is disabled")) {
        // If signup is disabled, create user directly in database with generated ID
        userId = crypto.randomUUID();
        createdAt = new Date().toISOString();
        console.log("Auth signup disabled, creating user directly in database");
      } else if (authError) {
        return {
          user: null,
          error: { message: traduzirErroSupabase(authError.message || "Erro ao criar conta") },
        };
      } else if (authData.user) {
        userId = authData.user.id;
        createdAt = authData.user.created_at;
      } else {
        return {
          user: null,
          error: { message: traduzirErroSupabase("Erro inesperado no registro") },
        };
      }

      // Create user profile in database
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
        console.error("Error creating user profile:", dbError);
        return {
          user: null,
          error: { message: traduzirErroSupabase("Erro ao criar perfil do usuário") },
        };
      }

      // Create user object with admin check
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
      console.error("Registration error:", error);
      return { user: null, error: { message: traduzirErroSupabase(error?.message || "Erro ao criar conta") } };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
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
