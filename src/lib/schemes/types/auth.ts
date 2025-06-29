import { User, Session } from 'next-auth';

export interface ApiUser {
  id: number; 
  name: string | null;
  email: string | null;
  mobile: string | null;
  email_verified_at: string | null;
  token: string | null; 
  role: string | null; 
  deleted_at: string | null;
  report_id: number;
  is_activate: number;
  code: string | null;
  created_at: string | null;
  updated_at: string | null;
  title: string | null;
  country_id: number | null;
  city_id: number | null;
  address: string | null;
  img: string | null;
  otp_expires_at: string | null;
  fcm_token: string | null;
}

export interface CustomUser extends User {
  id: string; 
  phone: string | null; 
  name: string | null;
  email: string | null;
  token: string; 
  role:string | null; 
  fcm_token: string | null; 

}

export interface CustomSession extends Session {
  user: {
    id: string;
    phone: string | null;
    name: string | null;
    email: string | null;
    token: string;
    role:string | null;
    fcm_token: string | null; 
  };
}