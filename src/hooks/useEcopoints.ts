import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Tables } from "../types/supabase";

type Ecopoint = Tables<"ecopoints">;

export function useEcopoints() {
  const [ecopoints, setEcopoints] = useState<Ecopoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEcopoints = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("ecopoints")
        .select("*")
        .eq("active", true)
        .order("name", { ascending: true });

      if (error) throw error;
      setEcopoints(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getNearbyEcopoints = (
    userLat: number,
    userLng: number,
    radiusKm: number = 10,
  ) => {
    return ecopoints
      .filter((ecopoint) => {
        const distance = calculateDistance(
          userLat,
          userLng,
          ecopoint.latitude,
          ecopoint.longitude,
        );
        return distance <= radiusKm;
      })
      .sort((a, b) => {
        const distanceA = calculateDistance(
          userLat,
          userLng,
          a.latitude,
          a.longitude,
        );
        const distanceB = calculateDistance(
          userLat,
          userLng,
          b.latitude,
          b.longitude,
        );
        return distanceA - distanceB;
      });
  };

  const calculateDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    fetchEcopoints();
  }, []);

  return {
    ecopoints,
    loading,
    error,
    getNearbyEcopoints,
    calculateDistance,
    refetchEcopoints: fetchEcopoints,
  };
}
