export type UserType = {
  uuid: string;
  name: string;
  email: string;
  avatar: string | null;
  phone_number: string | null;
  address: string | null;
  bio: string | null;
  gender: string | null;
  date_of_birth: string | null;
  country: string | null;
  is_verified: number; // Assuming 1 = true, 0 = false
  is_blocked: number; // Assuming 1 = true, 0 = false
  created_at: string; // ISO Date string
  updated_at: string; // ISO Date string
};
