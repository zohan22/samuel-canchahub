export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: '14.4';
  };
  public: {
    Tables: {
      bookings: {
        Row: {
          amount_total: number;
          court_id: string;
          created_at: string;
          end_at: string;
          id: string;
          penalty_amount: number;
          player_id: string;
          refund_amount: number;
          start_at: string;
          status: string;
          updated_at: string;
        };
        Insert: {
          amount_total: number;
          court_id: string;
          created_at?: string;
          end_at: string;
          id?: string;
          penalty_amount?: number;
          player_id: string;
          refund_amount?: number;
          start_at: string;
          status?: string;
          updated_at?: string;
        };
        Update: {
          amount_total?: number;
          court_id?: string;
          created_at?: string;
          end_at?: string;
          id?: string;
          penalty_amount?: number;
          player_id?: string;
          refund_amount?: number;
          start_at?: string;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'bookings_court_id_fkey';
            columns: ['court_id'];
            isOneToOne: false;
            referencedRelation: 'courts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'bookings_player_id_fkey';
            columns: ['player_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      court_availability: {
        Row: {
          court_id: string;
          created_at: string;
          day_of_week: number;
          end_time: string;
          id: string;
          price_override: number | null;
          start_time: string;
          updated_at: string;
        };
        Insert: {
          court_id: string;
          created_at?: string;
          day_of_week: number;
          end_time: string;
          id?: string;
          price_override?: number | null;
          start_time: string;
          updated_at?: string;
        };
        Update: {
          court_id?: string;
          created_at?: string;
          day_of_week?: number;
          end_time?: string;
          id?: string;
          price_override?: number | null;
          start_time?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'court_availability_court_id_fkey';
            columns: ['court_id'];
            isOneToOne: false;
            referencedRelation: 'courts';
            referencedColumns: ['id'];
          },
        ];
      };
      courts: {
        Row: {
          complex_id: string;
          created_at: string;
          id: string;
          name: string;
          price_per_hour: number;
          sport: string;
          status: string;
          updated_at: string;
        };
        Insert: {
          complex_id: string;
          created_at?: string;
          id?: string;
          name: string;
          price_per_hour: number;
          sport: string;
          status?: string;
          updated_at?: string;
        };
        Update: {
          complex_id?: string;
          created_at?: string;
          id?: string;
          name?: string;
          price_per_hour?: number;
          sport?: string;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'courts_complex_id_fkey';
            columns: ['complex_id'];
            isOneToOne: false;
            referencedRelation: 'sports_complexes';
            referencedColumns: ['id'];
          },
        ];
      };
      email_notifications: {
        Row: {
          booking_id: string;
          created_at: string;
          delivery_status: string;
          event_type: string;
          id: string;
          recipient_email: string;
          sent_at: string | null;
        };
        Insert: {
          booking_id: string;
          created_at?: string;
          delivery_status?: string;
          event_type: string;
          id?: string;
          recipient_email: string;
          sent_at?: string | null;
        };
        Update: {
          booking_id?: string;
          created_at?: string;
          delivery_status?: string;
          event_type?: string;
          id?: string;
          recipient_email?: string;
          sent_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'email_notifications_booking_id_fkey';
            columns: ['booking_id'];
            isOneToOne: false;
            referencedRelation: 'bookings';
            referencedColumns: ['id'];
          },
        ];
      };
      owner_onboarding_requests: {
        Row: {
          created_at: string;
          id: string;
          notes: string | null;
          requested_by: string;
          reviewed_at: string | null;
          reviewed_by: string | null;
          status: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          notes?: string | null;
          requested_by: string;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          status?: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          notes?: string | null;
          requested_by?: string;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'owner_onboarding_requests_requested_by_fkey';
            columns: ['requested_by'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'owner_onboarding_requests_reviewed_by_fkey';
            columns: ['reviewed_by'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      payments: {
        Row: {
          amount: number;
          booking_id: string;
          created_at: string;
          currency: string;
          id: string;
          paid_at: string | null;
          provider: string;
          provider_reference: string | null;
          status: string;
          updated_at: string;
        };
        Insert: {
          amount: number;
          booking_id: string;
          created_at?: string;
          currency?: string;
          id?: string;
          paid_at?: string | null;
          provider: string;
          provider_reference?: string | null;
          status?: string;
          updated_at?: string;
        };
        Update: {
          amount?: number;
          booking_id?: string;
          created_at?: string;
          currency?: string;
          id?: string;
          paid_at?: string | null;
          provider?: string;
          provider_reference?: string | null;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'payments_booking_id_fkey';
            columns: ['booking_id'];
            isOneToOne: false;
            referencedRelation: 'bookings';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          created_at: string;
          email: string;
          full_name: string;
          id: string;
          role: string;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          full_name: string;
          id?: string;
          role?: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          full_name?: string;
          id?: string;
          role?: string;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
      sports_complexes: {
        Row: {
          address: string;
          created_at: string;
          id: string;
          lat: number | null;
          lng: number | null;
          name: string;
          owner_id: string;
          status: string;
          updated_at: string;
        };
        Insert: {
          address: string;
          created_at?: string;
          id?: string;
          lat?: number | null;
          lng?: number | null;
          name: string;
          owner_id: string;
          status?: string;
          updated_at?: string;
        };
        Update: {
          address?: string;
          created_at?: string;
          id?: string;
          lat?: number | null;
          lng?: number | null;
          name?: string;
          owner_id?: string;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'sports_complexes_owner_id_fkey';
            columns: ['owner_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_admin: {
        Args: never;
        Returns: boolean;
      };
      is_owner_of_complex: {
        Args: {
          target_complex_id: string;
        };
        Returns: boolean;
      };
      is_owner_of_court: {
        Args: {
          target_court_id: string;
        };
        Returns: boolean;
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

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;
type DefaultSchema = DatabaseWithoutInternals[Extract<keyof DatabaseWithoutInternals, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer Row;
    }
    ? Row
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer Row;
      }
      ? Row
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer Insert;
    }
    ? Insert
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer Insert;
      }
      ? Insert
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer Update;
    }
    ? Update
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer Update;
      }
      ? Update
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
