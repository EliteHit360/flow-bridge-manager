export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Capacity_Constraints: {
        Row: {
          capacity_value: number | null
          constraint_id: string
          constraint_type: string | null
          date_effective: string | null
          location_code: string | null
          notes: string | null
          unit_of_measure: string | null
        }
        Insert: {
          capacity_value?: number | null
          constraint_id: string
          constraint_type?: string | null
          date_effective?: string | null
          location_code?: string | null
          notes?: string | null
          unit_of_measure?: string | null
        }
        Update: {
          capacity_value?: number | null
          constraint_id?: string
          constraint_type?: string | null
          date_effective?: string | null
          location_code?: string | null
          notes?: string | null
          unit_of_measure?: string | null
        }
        Relationships: []
      }
      Inbound_Shipments: {
        Row: {
          date_created: string | null
          description: string | null
          flow_eligible: boolean | null
          inbound_eta: string | null
          inbound_id: string
          location_from: string | null
          location_to: string | null
          notes: string | null
          quantity: number | null
          sku_code: string | null
          status: string | null
          unit_of_measure: string | null
        }
        Insert: {
          date_created?: string | null
          description?: string | null
          flow_eligible?: boolean | null
          inbound_eta?: string | null
          inbound_id: string
          location_from?: string | null
          location_to?: string | null
          notes?: string | null
          quantity?: number | null
          sku_code?: string | null
          status?: string | null
          unit_of_measure?: string | null
        }
        Update: {
          date_created?: string | null
          description?: string | null
          flow_eligible?: boolean | null
          inbound_eta?: string | null
          inbound_id?: string
          location_from?: string | null
          location_to?: string | null
          notes?: string | null
          quantity?: number | null
          sku_code?: string | null
          status?: string | null
          unit_of_measure?: string | null
        }
        Relationships: []
      }
      items: {
        Row: {
          category: string
          id: number
          item_name: string
          item_sku: string
        }
        Insert: {
          category: string
          id?: number
          item_name: string
          item_sku: string
        }
        Update: {
          category?: string
          id?: number
          item_name?: string
          item_sku?: string
        }
        Relationships: []
      }
      "Product Roadmap": {
        Row: {
          "Area Path": string | null
          "Assigned To": string | null
          "Business Value": string | null
          "Closed Date": string | null
          "Created Date": string | null
          "Customer Problem": string | null
          Description: string | null
          Drivers: string | null
          Echelon: string | null
          ID: number
          "Industry Verticals": string | null
          "Priority Label": string | null
          State: string | null
          Title: string | null
          "Value Area": string | null
          "Value Label": string | null
          "Work Item Type": string | null
        }
        Insert: {
          "Area Path"?: string | null
          "Assigned To"?: string | null
          "Business Value"?: string | null
          "Closed Date"?: string | null
          "Created Date"?: string | null
          "Customer Problem"?: string | null
          Description?: string | null
          Drivers?: string | null
          Echelon?: string | null
          ID: number
          "Industry Verticals"?: string | null
          "Priority Label"?: string | null
          State?: string | null
          Title?: string | null
          "Value Area"?: string | null
          "Value Label"?: string | null
          "Work Item Type"?: string | null
        }
        Update: {
          "Area Path"?: string | null
          "Assigned To"?: string | null
          "Business Value"?: string | null
          "Closed Date"?: string | null
          "Created Date"?: string | null
          "Customer Problem"?: string | null
          Description?: string | null
          Drivers?: string | null
          Echelon?: string | null
          ID?: number
          "Industry Verticals"?: string | null
          "Priority Label"?: string | null
          State?: string | null
          Title?: string | null
          "Value Area"?: string | null
          "Value Label"?: string | null
          "Work Item Type"?: string | null
        }
        Relationships: []
      }
      SKU_Master: {
        Row: {
          category: string | null
          date_added: string | null
          description: string | null
          dimensions: string | null
          flow_eligible: boolean | null
          notes: string | null
          sku_code: string
          unit_of_measure: string | null
        }
        Insert: {
          category?: string | null
          date_added?: string | null
          description?: string | null
          dimensions?: string | null
          flow_eligible?: boolean | null
          notes?: string | null
          sku_code: string
          unit_of_measure?: string | null
        }
        Update: {
          category?: string | null
          date_added?: string | null
          description?: string | null
          dimensions?: string | null
          flow_eligible?: boolean | null
          notes?: string | null
          sku_code?: string
          unit_of_measure?: string | null
        }
        Relationships: []
      }
      store_item_stock: {
        Row: {
          forecast: number
          id: number
          item_id: number
          on_hand_qty: number
          store_id: number
          target_wos: number
        }
        Insert: {
          forecast: number
          id?: number
          item_id: number
          on_hand_qty: number
          store_id: number
          target_wos: number
        }
        Update: {
          forecast?: number
          id?: number
          item_id?: number
          on_hand_qty?: number
          store_id?: number
          target_wos?: number
        }
        Relationships: [
          {
            foreignKeyName: "store_item_stock_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "store_item_stock_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      Store_Orders: {
        Row: {
          date_created: string | null
          description: string | null
          due_date: string | null
          flow_eligible: boolean | null
          location_to: string | null
          notes: string | null
          order_id: string
          priority_level: number | null
          quantity: number | null
          sku_code: string | null
          status: string | null
        }
        Insert: {
          date_created?: string | null
          description?: string | null
          due_date?: string | null
          flow_eligible?: boolean | null
          location_to?: string | null
          notes?: string | null
          order_id: string
          priority_level?: number | null
          quantity?: number | null
          sku_code?: string | null
          status?: string | null
        }
        Update: {
          date_created?: string | null
          description?: string | null
          due_date?: string | null
          flow_eligible?: boolean | null
          location_to?: string | null
          notes?: string | null
          order_id?: string
          priority_level?: number | null
          quantity?: number | null
          sku_code?: string | null
          status?: string | null
        }
        Relationships: []
      }
      stores: {
        Row: {
          id: number
          location: string | null
          store_name: string
        }
        Insert: {
          id?: number
          location?: string | null
          store_name: string
        }
        Update: {
          id?: number
          location?: string | null
          store_name?: string
        }
        Relationships: []
      }
      transfer_recommendations: {
        Row: {
          created_at: string | null
          id: number
          item_id: number
          store_id_from: number
          store_id_to: number
          transfer_qty: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          item_id: number
          store_id_from: number
          store_id_to: number
          transfer_qty: number
        }
        Update: {
          created_at?: string | null
          id?: number
          item_id?: number
          store_id_from?: number
          store_id_to?: number
          transfer_qty?: number
        }
        Relationships: [
          {
            foreignKeyName: "transfer_recommendations_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transfer_recommendations_store_id_from_fkey"
            columns: ["store_id_from"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transfer_recommendations_store_id_to_fkey"
            columns: ["store_id_to"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
