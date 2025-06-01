interface Profile {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  token: string | null;
  deleted_at: string | null;
  report_id: number;
  is_activate: number;
  code: string;
  created_at: string;
  updated_at: string;
  title: string;
  mobile: string;
  country_id: string;
  city_id: string;
  address: string;
  img?: string;
  otp_expires_at: string;
  fcm_token: string;
  description?: string;
}
interface ProfileResponse {
  success?: boolean;
  data: Profile | null;
  message?: string;
  error?: string;
}
type ProfileFormData = {
  name: string;
  email: string;
  title: string;
  mobile: string;
  country_id: string;
  city_id: string;
  address: string;
  img?: File | string;
};
