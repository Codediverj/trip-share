export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Moment: {
        Row: {
          id: number
          memo: string
          moment_date: string
          moment_image: string | null
          plan_id: string
          title: string
          writer: string
        }
        Insert: {
          id?: number
          memo: string
          moment_date: string
          moment_image?: string | null
          plan_id: string
          title: string
          writer: string
        }
        Update: {
          id?: number
          memo?: string
          moment_date?: string
          moment_image?: string | null
          plan_id?: string
          title?: string
          writer?: string
        }
        Relationships: [
          {
            foreignKeyName: "Moment_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "Plan"
            referencedColumns: ["plan_id"]
          },
          {
            foreignKeyName: "Moment_writer_fkey"
            columns: ["writer"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["user_id"]
          }
        ]
      }
      People_Join: {
        Row: {
          plan_id: string
          user_id: string
        }
        Insert: {
          plan_id: string
          user_id: string
        }
        Update: {
          plan_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "People_Join_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "Plan"
            referencedColumns: ["plan_id"]
          },
          {
            foreignKeyName: "People_Join_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["user_id"]
          }
        ]
      }
      Plan: {
        Row: {
          background_image: string | null
          currency: Database["public"]["Enums"]["Currency"]
          end_date: string
          plan_id: string
          start_date: string
          title: string
        }
        Insert: {
          background_image?: string | null
          currency?: Database["public"]["Enums"]["Currency"]
          end_date: string
          plan_id?: string
          start_date: string
          title: string
        }
        Update: {
          background_image?: string | null
          currency?: Database["public"]["Enums"]["Currency"]
          end_date?: string
          plan_id?: string
          start_date?: string
          title?: string
        }
        Relationships: []
      }
      Single_Plan: {
        Row: {
          created_at: string
          created_by: string
          date: string
          is_group_activity: boolean
          links: string | null
          note: string | null
          order: number
          place_from_id: string
          place_from_name: string
          place_to_id: string | null
          place_to_name: string | null
          plan_id: string
          single_plan_id: string
          updated_at: string
          updated_by: string
        }
        Insert: {
          created_at?: string
          created_by: string
          date: string
          is_group_activity?: boolean
          links?: string | null
          note?: string | null
          order: number
          place_from_id: string
          place_from_name: string
          place_to_id?: string | null
          place_to_name?: string | null
          plan_id: string
          single_plan_id?: string
          updated_at?: string
          updated_by: string
        }
        Update: {
          created_at?: string
          created_by?: string
          date?: string
          is_group_activity?: boolean
          links?: string | null
          note?: string | null
          order?: number
          place_from_id?: string
          place_from_name?: string
          place_to_id?: string | null
          place_to_name?: string | null
          plan_id?: string
          single_plan_id?: string
          updated_at?: string
          updated_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "Single_Plan_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "Single_Plan_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "Plan"
            referencedColumns: ["plan_id"]
          },
          {
            foreignKeyName: "Single_Plan_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["user_id"]
          }
        ]
      }
      Single_Plan_Expense: {
        Row: {
          attended_user_id: string
          expense: number
          expense_id: number
          is_paid_back: boolean
          paid_user_id: string | null
          single_plan_id: string
        }
        Insert: {
          attended_user_id: string
          expense: number
          expense_id?: number
          is_paid_back?: boolean
          paid_user_id?: string | null
          single_plan_id: string
        }
        Update: {
          attended_user_id?: string
          expense?: number
          expense_id?: number
          is_paid_back?: boolean
          paid_user_id?: string | null
          single_plan_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Single_Plan_Expense_attended_user_id_fkey"
            columns: ["attended_user_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "Single_Plan_Expense_paid_user_id_fkey"
            columns: ["paid_user_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "Single_Plan_Expense_single_plan_id_fkey"
            columns: ["single_plan_id"]
            isOneToOne: false
            referencedRelation: "Single_Plan"
            referencedColumns: ["single_plan_id"]
          }
        ]
      }
      UpdateCheck: {
        Row: {
          check_time: string
          single_plan_id: string
          user_id: string
        }
        Insert: {
          check_time?: string
          single_plan_id: string
          user_id?: string
        }
        Update: {
          check_time?: string
          single_plan_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "UpdateCheck_single_plan_id_fkey"
            columns: ["single_plan_id"]
            isOneToOne: false
            referencedRelation: "Single_Plan"
            referencedColumns: ["single_plan_id"]
          },
          {
            foreignKeyName: "UpdateCheck_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["user_id"]
          }
        ]
      }
      User: {
        Row: {
          created_at: string
          email: string
          nickname: string
          profile_image: string | null
          traveler_code: string
          user_id: string
        }
        Insert: {
          created_at: string
          email: string
          nickname: string
          profile_image?: string | null
          traveler_code: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          nickname?: string
          profile_image?: string | null
          traveler_code?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "User_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      currency_options: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      swap_single_plan_order: {
        Args: {
          from_order: number
          to_order: number
          plan_id: string
          plan_date: string
        }
        Returns: undefined
      }
    }
    Enums: {
      Currency:
        | "USD"
        | "CAD"
        | "KRW"
        | "EUR"
        | "GBP"
        | "CHF"
        | "AUD"
        | "JPY"
        | "NZD"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
