//home.d.ts
interface Image {
  id: number;
  title: string;
  imgUrl: string;
}
interface HereData {
  title: string;
  description: string;
  images: Image[];
}
declare type ContactFormData = {
  name: string;
  mobile: string;
  email: string;
  subject: string;
  content: string;
};
declare interface AboutDetails {
  content: string;
}
declare interface AboutResponse {
  success: boolean;
  data: AboutDetails;
}
declare interface PrivacyPolicy {
  id: number;
  content_ar: string;
  content_en: string;
}
declare interface PrivacyPolicyResponse {
  success: boolean;
  data: PrivacyPolicy;
  error?: string;
}
declare interface HowProcessWorks {
  id: number;
  description_ar: string;
  description_en: string;
}
declare interface HowProcessWorksResponse {
  success: boolean;
  data: HowProcessWorks;
  error?: string;
}
declare interface heroSectionTypes {
  id: number;
  title: string;
  description: string;
  images: string[];
}
declare interface HeroResponse {
  success?: boolean;
  data: HeroSectionType | null;
  error?: string;
}
declare interface FetchSearchResultsParams {
  keyword?: string;
  legal_field_id?: number;
  arrange_by_rate?: boolean;
  arrange_by_score_point?: boolean;
  category?: number;
  page?: number;
  per_page?: number;
}

declare interface SearchResult {
  id: number;
  name: string;
  title?: string;
  img?: string | null;
  rate?: string;
  score_points?: string;
  country?: string | null;
  legal_fields: string[];
  languages: string[];
  description?: string;
  image?: string;
  created_at?: string;
  views?: number;
  country_id?: number;
  total?: number;
  email: string;
  type: string;
  rating_count: number;
  is_payment: number;
  medals: string;
  education: string;
}

interface ApiResponse {
  success: boolean;
  data: SearchResult[] | null;
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}



declare interface Notification {
  id: number;
  title: string;
  body: string;
  created_at: string;
  is_read: number;
  user_request_id: number;
  sender_id: number;
  sender_type: string;
  receiver_id: number;
  receiver_type: string;
  user_request_type: string;
  type: string;
}

declare interface NotificationResponse {
  success: boolean;
  message: string;
  data: {
    current_page: number;
    total: number; // Added total property
    data: Notification[];
  } | null;
}