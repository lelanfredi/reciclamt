import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";

export interface Campaign {
  id: string;
  name: string;
  description: string;
  slug: string;
  points_per_kg: number;
  status: "active" | "paused" | "finished";
  materials_accepted: string[];
  start_date: string;
  end_date: string | null;
  image_url: string | null;
  created_at: string;
}

export interface CampaignSubmission {
  id: string;
  campaign_id: string;
  user_id: string;
  photo_url: string;
  description: string | null;
  estimated_weight_kg: number | null;
  status: "pending" | "approved" | "rejected";
  points_awarded: number;
  rejection_reason: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
  // Joined user data
  user_name?: string;
  user_email?: string;
}

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [submissions, setSubmissions] = useState<CampaignSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [submissionsLoading, setSubmissionsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all campaigns
  const fetchCampaigns = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from("campaigns")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) {
        setError(fetchError.message);
        return;
      }
      setCampaigns((data || []) as Campaign[]);
    } catch (err) {
      setError("Erro ao carregar campanhas");
      console.error("Erro ao carregar campanhas:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch submissions for a specific campaign (or all if no campaignId)
  const fetchSubmissions = useCallback(
    async (campaignId?: string, statusFilter?: string) => {
      setSubmissionsLoading(true);
      try {
        let query = supabase
          .from("campaign_submissions")
          .select(
            `
            *,
            users:user_id (name, email)
          `,
          )
          .order("created_at", { ascending: false });

        if (campaignId) {
          query = query.eq("campaign_id", campaignId);
        }
        if (statusFilter && statusFilter !== "all") {
          query = query.eq("status", statusFilter);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) {
          console.error("Erro ao carregar submissions:", fetchError);
          return;
        }

        // Map joined user data to flat structure
        const mapped = (data || []).map((sub: any) => ({
          ...sub,
          user_name: sub.users?.name || "Usuário desconhecido",
          user_email: sub.users?.email || "",
        }));

        setSubmissions(mapped);
      } catch (err) {
        console.error("Erro ao carregar submissions:", err);
      } finally {
        setSubmissionsLoading(false);
      }
    },
    [],
  );

  // Approve a submission
  const approveSubmission = useCallback(
    async (
      submissionId: string,
      pointsToAward: number,
      reviewerId: string,
    ) => {
      try {
        // 1. Update submission status
        const { error: updateError } = await supabase
          .from("campaign_submissions")
          .update({
            status: "approved",
            points_awarded: pointsToAward,
            reviewed_by: reviewerId,
            reviewed_at: new Date().toISOString(),
          })
          .eq("id", submissionId);

        if (updateError) {
          alert("Erro ao aprovar: " + updateError.message);
          return false;
        }

        // 2. Get the submission to find user_id
        const submission = submissions.find((s) => s.id === submissionId);
        if (submission) {
          // 3. Credit points to user
          const { error: pointsError } = await supabase.rpc(
            "increment_user_points",
            {
              target_user_id: submission.user_id,
              points_to_add: pointsToAward,
            },
          );

          // Fallback if RPC doesn't exist: manual update
          if (pointsError) {
            console.warn(
              "RPC increment_user_points não disponível, usando update direto",
            );
            const { data: userData } = await supabase
              .from("users")
              .select("points")
              .eq("id", submission.user_id)
              .single();

            if (userData) {
              await supabase
                .from("users")
                .update({ points: (userData.points || 0) + pointsToAward })
                .eq("id", submission.user_id);
            }
          }
        }

        // 4. Update local state
        setSubmissions((prev) =>
          prev.map((s) =>
            s.id === submissionId
              ? {
                  ...s,
                  status: "approved" as const,
                  points_awarded: pointsToAward,
                  reviewed_at: new Date().toISOString(),
                }
              : s,
          ),
        );

        return true;
      } catch (err) {
        console.error("Erro ao aprovar submission:", err);
        return false;
      }
    },
    [submissions],
  );

  // Reject a submission
  const rejectSubmission = useCallback(
    async (submissionId: string, reason: string, reviewerId: string) => {
      try {
        const { error: updateError } = await supabase
          .from("campaign_submissions")
          .update({
            status: "rejected",
            rejection_reason: reason,
            reviewed_by: reviewerId,
            reviewed_at: new Date().toISOString(),
          })
          .eq("id", submissionId);

        if (updateError) {
          alert("Erro ao rejeitar: " + updateError.message);
          return false;
        }

        // Update local state
        setSubmissions((prev) =>
          prev.map((s) =>
            s.id === submissionId
              ? {
                  ...s,
                  status: "rejected" as const,
                  rejection_reason: reason,
                  reviewed_at: new Date().toISOString(),
                }
              : s,
          ),
        );

        return true;
      } catch (err) {
        console.error("Erro ao rejeitar submission:", err);
        return false;
      }
    },
    [],
  );

  // Get stats for a campaign
  const getCampaignStats = useCallback(
    (campaignId: string) => {
      const campaignSubs = submissions.filter(
        (s) => s.campaign_id === campaignId,
      );
      return {
        total: campaignSubs.length,
        pending: campaignSubs.filter((s) => s.status === "pending").length,
        approved: campaignSubs.filter((s) => s.status === "approved").length,
        rejected: campaignSubs.filter((s) => s.status === "rejected").length,
        totalPointsAwarded: campaignSubs
          .filter((s) => s.status === "approved")
          .reduce((sum, s) => sum + s.points_awarded, 0),
      };
    },
    [submissions],
  );

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  return {
    campaigns,
    submissions,
    loading,
    submissionsLoading,
    error,
    fetchCampaigns,
    fetchSubmissions,
    approveSubmission,
    rejectSubmission,
    getCampaignStats,
  };
}
