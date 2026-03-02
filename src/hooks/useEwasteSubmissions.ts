import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { Tables } from "../types/supabase";

export type EwasteSubmission = Tables<"ewaste_submissions">;

export type EwasteStatus = "pending" | "approved" | "rejected";

interface EwasteStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  totalPointsAwarded: number;
}

/**
 * Hook para gerenciar submissions de lixo eletrônico.
 * Usado tanto no AdminPanel (todas as submissions) quanto no Dashboard (do usuário).
 */
export function useEwasteSubmissions(options?: {
  userId?: string;
  userPhone?: string;
  adminMode?: boolean;
}) {
  const [submissions, setSubmissions] = useState<EwasteSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from("ewaste_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      // Se não é admin, filtra apenas as submissions do usuário
      if (!options?.adminMode) {
        if (options?.userId) {
          query = query.eq("user_id", options.userId);
        } else if (options?.userPhone) {
          query = query.eq("user_phone", options.userPhone);
        } else {
          setSubmissions([]);
          setLoading(false);
          return;
        }
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setSubmissions(data || []);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar submissions");
      console.error("Erro ao buscar ewaste submissions:", err);
    } finally {
      setLoading(false);
    }
  }, [options?.userId, options?.userPhone, options?.adminMode]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  /**
   * Aprova uma submission e credita pontos ao usuário.
   */
  const approveSubmission = async (
    submissionId: string,
    points: number,
    adminEmail: string,
  ) => {
    try {
      // 1. Atualizar a submission
      const { error: updateError } = await supabase
        .from("ewaste_submissions")
        .update({
          status: "approved",
          points_awarded: points,
          reviewed_by: adminEmail,
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", submissionId);

      if (updateError) throw updateError;

      // 2. Buscar a submission para pegar o user_id
      const submission = submissions.find((s) => s.id === submissionId);

      // 3. Se tem user_id vinculado, creditar pontos
      if (submission?.user_id) {
        const { data: userData } = await supabase
          .from("users")
          .select("points")
          .eq("id", submission.user_id)
          .single();

        if (userData) {
          await supabase
            .from("users")
            .update({ points: userData.points + points })
            .eq("id", submission.user_id);
        }
      }

      // 4. Atualizar estado local
      setSubmissions((prev) =>
        prev.map((s) =>
          s.id === submissionId
            ? {
                ...s,
                status: "approved",
                points_awarded: points,
                reviewed_by: adminEmail,
                reviewed_at: new Date().toISOString(),
              }
            : s,
        ),
      );

      return { success: true };
    } catch (err: any) {
      console.error("Erro ao aprovar submission:", err);
      return { success: false, error: err.message };
    }
  };

  /**
   * Rejeita uma submission com motivo.
   */
  const rejectSubmission = async (
    submissionId: string,
    reason: string,
    adminEmail: string,
  ) => {
    try {
      const { error: updateError } = await supabase
        .from("ewaste_submissions")
        .update({
          status: "rejected",
          admin_notes: reason,
          reviewed_by: adminEmail,
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", submissionId);

      if (updateError) throw updateError;

      setSubmissions((prev) =>
        prev.map((s) =>
          s.id === submissionId
            ? {
                ...s,
                status: "rejected",
                admin_notes: reason,
                reviewed_by: adminEmail,
                reviewed_at: new Date().toISOString(),
              }
            : s,
        ),
      );

      return { success: true };
    } catch (err: any) {
      console.error("Erro ao rejeitar submission:", err);
      return { success: false, error: err.message };
    }
  };

  /**
   * Calcula estatísticas das submissions.
   */
  const getStats = useCallback((): EwasteStats => {
    return {
      total: submissions.length,
      pending: submissions.filter((s) => s.status === "pending").length,
      approved: submissions.filter((s) => s.status === "approved").length,
      rejected: submissions.filter((s) => s.status === "rejected").length,
      totalPointsAwarded: submissions
        .filter((s) => s.status === "approved")
        .reduce((sum, s) => sum + s.points_awarded, 0),
    };
  }, [submissions]);

  return {
    submissions,
    loading,
    error,
    fetchSubmissions,
    approveSubmission,
    rejectSubmission,
    getStats,
  };
}
