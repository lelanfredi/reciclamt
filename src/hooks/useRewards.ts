import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Tables } from "../types/supabase";

type Reward = Tables<"rewards">;
type RewardRedemption = Tables<"reward_redemptions">;

export function useRewards() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRewards = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("rewards")
        .select("*")
        .eq("available", true)
        .order("points_required", { ascending: true });

      if (error) throw error;
      setRewards(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const redeemReward = async (
    userId: string,
    rewardId: string,
    userPoints: number,
  ) => {
    try {
      const reward = rewards.find((r) => r.id === rewardId);
      if (!reward) {
        throw new Error("Recompensa não encontrada");
      }

      if (userPoints < reward.points_required) {
        throw new Error("Pontos insuficientes");
      }

      // Generate redemption code
      const redemptionCode = `REC${Date.now().toString().slice(-6)}`;

      // Create redemption record
      const { error: redemptionError } = await supabase
        .from("reward_redemptions")
        .insert({
          user_id: userId,
          reward_id: rewardId,
          points_used: reward.points_required,
          redemption_code: redemptionCode,
          status: "pending",
        });

      if (redemptionError) throw redemptionError;

      // Update user points
      const newPoints = userPoints - reward.points_required;
      const { error: updateError } = await supabase
        .from("users")
        .update({ points: newPoints })
        .eq("id", userId);

      if (updateError) throw updateError;

      return {
        success: true,
        redemptionCode,
        newPoints,
        error: null,
      };
    } catch (err: any) {
      return {
        success: false,
        redemptionCode: null,
        newPoints: null,
        error: err.message,
      };
    }
  };

  const getUserRedemptions = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("reward_redemptions")
        .select(
          `
          *,
          rewards (
            name,
            description,
            image_url
          )
        `,
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  return {
    rewards,
    loading,
    error,
    redeemReward,
    getUserRedemptions,
    refetchRewards: fetchRewards,
  };
}
