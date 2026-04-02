/**
 * Restaurants, restaurant admins, staff, and photos.
 * Source: docs/FUTURE_STATE_SCHEMA.md
 */

import type { UUID } from "./profiles";

export interface Restaurant {
  id: UUID;
  slug: string;
  safe_url: string | null;
  code: string | null;
  name: string;
  legal_name: string | null;
  admin_email: string | null;
  admin_phone: string | null;
  address_1: string | null;
  address_2: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  phone: string | null;
  latitude: number | null;
  longitude: number | null;
  why_should_visit: string | null;
  fine_print: string | null;
  website: string | null;
  menu_link: string | null;
  price_range: string | null;
  cuisine_1: string | null;
  cuisine_2: string | null;
  cuisine_3: string | null;
  dining_style: string | null;
  dietary: string | null;
  takes_reservation: boolean;
  good_for_groups: boolean;
  kid_friendly: string | null;
  dog_friendly: string | null;
  parking: string | null;
  wifi: boolean;
  featured: boolean;
  active: boolean;
  portal_enabled: boolean;
  logo_path: string | null;
  document_path: string | null;
  business_hours: string | null;
  attire: string | null;
  facebook_page: string | null;
  instagram_page: string | null;
  kdsadmin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface RestaurantAdmin {
  id: UUID;
  restaurant_id: UUID;
  profile_id: UUID | null;
  email: string;
  email_key: string | null;
  has_restaurant_plus: boolean;
  restaurant_portal_active: boolean;
  parent_admin_id: UUID | null;
  billing_customer_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface RestaurantStaff {
  id: UUID;
  restaurant_id: UUID;
  name: string | null;
  pin_hash: string | null;
  role: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface RestaurantPhoto {
  id: UUID;
  restaurant_id: UUID;
  path: string;
  ordering: number;
  created_at: string;
}
