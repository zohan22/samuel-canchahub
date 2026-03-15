import type { Database } from '@/types/supabase';

export type TableRow<T extends keyof Database['public']['Tables']>
  = Database['public']['Tables'][T]['Row'];

export type TableInsert<T extends keyof Database['public']['Tables']>
  = Database['public']['Tables'][T]['Insert'];

export type TableUpdate<T extends keyof Database['public']['Tables']>
  = Database['public']['Tables'][T]['Update'];

export type Profile = TableRow<'profiles'>;
export type SportsComplex = TableRow<'sports_complexes'>;
export type Court = TableRow<'courts'>;
export type CourtAvailability = TableRow<'court_availability'>;
export type Booking = TableRow<'bookings'>;
export type Payment = TableRow<'payments'>;
export type OwnerOnboardingRequest = TableRow<'owner_onboarding_requests'>;

export type CourtWithComplex = Court & {
  complex: Pick<SportsComplex, 'id' | 'name' | 'address' | 'status'>
};

export interface DashboardMetric {
  id: string
  label: string
  value: string
  trend: string
}
