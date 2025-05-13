/* eslint-disable @typescript-eslint/no-unused-vars */
interface FooterData {
  data: FooterData | null;
  id: number;
  created_at: string | null;
  updated_at: string | null;
  mobile: string;
  email: string;
  logo: string;
  whats: string | null;
  insta: string | null;
  facebook: string | null;
  app_url: string | null;
  location: string;
  deleted_at: string | null;
  is_activate: number;
  report_id: number;
}

interface FooterResponse {
  success: boolean;
  data: FooterData | null;
  error?: string;
}