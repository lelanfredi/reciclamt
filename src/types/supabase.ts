export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          phone: string;
          email: string | null;
          points: number;
          avatar_seed: string | null;
          role?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          phone: string;
          email?: string | null;
          points?: number;
          avatar_seed?: string | null;
          role?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          phone?: string;
          email?: string | null;
          points?: number;
          avatar_seed?: string | null;
          role?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      recycling_activities: {
        Row: {
          id: string;
          user_id: string;
          material_type: string;
          weight_kg: number;
          points_earned: number;
          location: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          material_type: string;
          weight_kg: number;
          points_earned: number;
          location?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          material_type?: string;
          weight_kg?: number;
          points_earned?: number;
          location?: string | null;
          created_at?: string;
        };
      };
      rewards: {
        Row: {
          id: string;
          name: string;
          description: string;
          points_required: number;
          category: string;
          image_url: string | null;
          available: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          points_required: number;
          category: string;
          image_url?: string | null;
          available?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          points_required?: number;
          category?: string;
          image_url?: string | null;
          available?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      reward_redemptions: {
        Row: {
          id: string;
          user_id: string;
          reward_id: string;
          points_used: number;
          redemption_code: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          reward_id: string;
          points_used: number;
          redemption_code: string;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          reward_id?: string;
          points_used?: number;
          redemption_code?: string;
          status?: string;
          created_at?: string;
        };
      };
      ecopoints: {
        Row: {
          id: string;
          name: string;
          address: string;
          latitude: number;
          longitude: number;
          accepted_materials: string[];
          operating_hours: string | null;
          contact_info: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          address: string;
          latitude: number;
          longitude: number;
          accepted_materials: string[];
          operating_hours?: string | null;
          contact_info?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          address?: string;
          latitude?: number;
          longitude?: number;
          accepted_materials?: string[];
          operating_hours?: string | null;
          contact_info?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      pre_cadastro: {
        Row: {
          id: number;
          name: string;
          phone: string;
          neighborhood: string;
          created_at: string;
          status: string;
        };
        Insert: {
          id?: number;
          name: string;
          phone: string;
          neighborhood: string;
          created_at?: string;
          status?: string;
        };
        Update: {
          id?: number;
          name?: string;
          phone?: string;
          neighborhood?: string;
          created_at?: string;
          status?: string;
        };
      };
      campaigns: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          slug: string;
          points_per_kg: number;
          status: string;
          materials_accepted: string[];
          start_date: string;
          end_date: string | null;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          slug: string;
          points_per_kg?: number;
          status?: string;
          materials_accepted?: string[];
          start_date?: string;
          end_date?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          slug?: string;
          points_per_kg?: number;
          status?: string;
          materials_accepted?: string[];
          start_date?: string;
          end_date?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      campaign_submissions: {
        Row: {
          id: string;
          campaign_id: string;
          user_id: string;
          photo_url: string;
          description: string | null;
          estimated_weight_kg: number | null;
          status: string;
          points_awarded: number;
          rejection_reason: string | null;
          reviewed_by: string | null;
          reviewed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          campaign_id: string;
          user_id: string;
          photo_url: string;
          description?: string | null;
          estimated_weight_kg?: number | null;
          status?: string;
          points_awarded?: number;
          rejection_reason?: string | null;
          reviewed_by?: string | null;
          reviewed_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          campaign_id?: string;
          user_id?: string;
          photo_url?: string;
          description?: string | null;
          estimated_weight_kg?: number | null;
          status?: string;
          points_awarded?: number;
          rejection_reason?: string | null;
          reviewed_by?: string | null;
          reviewed_at?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      increment_user_points: {
        Args: {
          target_user_id: string;
          points_to_add: number;
        };
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never;
