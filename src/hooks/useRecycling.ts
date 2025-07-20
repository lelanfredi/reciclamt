import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Tables } from "../types/supabase";

type RecyclingActivity = Tables<"recycling_activities">;

export function useRecycling(userId?: string) {
  const [activities, setActivities] = useState<RecyclingActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("recycling_activities")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setActivities(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addRecyclingActivity = async (activity: {
    material_type: string;
    weight_kg: number;
    location?: string;
  }) => {
    if (!userId) {
      return { success: false, error: "Usuário não autenticado" };
    }

    try {
      // Calculate points based on material type and weight
      const pointsPerKg = {
        Plástico: 10,
        Papel: 8,
        Vidro: 12,
        Metal: 15,
        Eletrônicos: 25,
      };

      const points = Math.round(
        (pointsPerKg[activity.material_type as keyof typeof pointsPerKg] ||
          10) * activity.weight_kg,
      );

      // Add recycling activity
      const { data: newActivity, error: activityError } = await supabase
        .from("recycling_activities")
        .insert({
          user_id: userId,
          material_type: activity.material_type,
          weight_kg: activity.weight_kg,
          points_earned: points,
          location: activity.location || null,
        })
        .select()
        .single();

      if (activityError) throw activityError;

      // Update user points
      const { data: user, error: userError } = await supabase
        .from("users")
        .select("points")
        .eq("id", userId)
        .single();

      if (userError) throw userError;

      const newPoints = (user.points || 0) + points;
      const { error: updateError } = await supabase
        .from("users")
        .update({ points: newPoints })
        .eq("id", userId);

      if (updateError) throw updateError;

      // Refresh activities
      await fetchActivities();

      return {
        success: true,
        activity: newActivity,
        pointsEarned: points,
        newTotalPoints: newPoints,
        error: null,
      };
    } catch (err: any) {
      return {
        success: false,
        activity: null,
        pointsEarned: 0,
        newTotalPoints: 0,
        error: err.message,
      };
    }
  };

  const getRecyclingStats = () => {
    const totalActivities = activities.length;
    const totalPoints = activities.reduce(
      (sum, activity) => sum + activity.points_earned,
      0,
    );
    const totalWeight = activities.reduce(
      (sum, activity) => sum + activity.weight_kg,
      0,
    );

    const materialStats = activities.reduce(
      (stats, activity) => {
        const material = activity.material_type;
        if (!stats[material]) {
          stats[material] = { count: 0, weight: 0, points: 0 };
        }
        stats[material].count += 1;
        stats[material].weight += activity.weight_kg;
        stats[material].points += activity.points_earned;
        return stats;
      },
      {} as Record<string, { count: number; weight: number; points: number }>,
    );

    return {
      totalActivities,
      totalPoints,
      totalWeight,
      materialStats,
    };
  };

  useEffect(() => {
    fetchActivities();
  }, [userId]);

  return {
    activities,
    loading,
    error,
    addRecyclingActivity,
    getRecyclingStats,
    refetchActivities: fetchActivities,
  };
}
