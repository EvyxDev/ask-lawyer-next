export interface FooterData {
    id: number;
    created_at: string | null;
    updated_at: string | null;
    mobile: string | null;
    email: string | null;
    logo: string | null;
    whats: string | null;
    insta: string | null;
    facebook: string | null;
    app_url: string | null;
    location: string | null;
    deleted_at: string | null;
    is_activate: number;
    report_id: number;
  }
  
  export interface FooterResponse {
    success: boolean;
    data: FooterData;
  }