import type { Database } from '@/types/supabase';

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type SportsComplex = Database['public']['Tables']['sports_complexes']['Row'];
export type Court = Database['public']['Tables']['courts']['Row'];
export type CourtAvailability = Database['public']['Tables']['court_availability']['Row'];
export type Booking = Database['public']['Tables']['bookings']['Row'];
export type Payment = Database['public']['Tables']['payments']['Row'];
export type EmailNotification = Database['public']['Tables']['email_notifications']['Row'];
export type OwnerOnboardingRequest = Database['public']['Tables']['owner_onboarding_requests']['Row'];
