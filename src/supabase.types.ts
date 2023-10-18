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
            referencedRelation: "Plan"
            referencedColumns: ["plan_id"]
          },
          {
            foreignKeyName: "Moment_writer_fkey"
            columns: ["writer"]
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
            referencedRelation: "Plan"
            referencedColumns: ["plan_id"]
          },
          {
            foreignKeyName: "People_Join_user_id_fkey"
            columns: ["user_id"]
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
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Single_Plan_plan_id_fkey"
            columns: ["plan_id"]
            referencedRelation: "Plan"
            referencedColumns: ["plan_id"]
          },
          {
            foreignKeyName: "Single_Plan_updated_by_fkey"
            columns: ["updated_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
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
            referencedRelation: "User"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "Single_Plan_Expense_paid_user_id_fkey"
            columns: ["paid_user_id"]
            referencedRelation: "User"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "Single_Plan_Expense_single_plan_id_fkey"
            columns: ["single_plan_id"]
            referencedRelation: "Single_Plan"
            referencedColumns: ["single_plan_id"]
          }
        ]
      }
      User: {
        Row: {
          created_at: string
          email: string
          nickname: string | null
          profile_image: string | null
          traveler_code: string
          user_id: string
        }
        Insert: {
          created_at: string
          email: string
          nickname?: string | null
          profile_image?: string | null
          traveler_code: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          nickname?: string | null
          profile_image?: string | null
          traveler_code?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "User_user_id_fkey"
            columns: ["user_id"]
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
      [_ in never]: never
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
