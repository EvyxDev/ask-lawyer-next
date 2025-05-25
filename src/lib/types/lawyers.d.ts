declare interface Lawyers {
  id: number;
  name: string;
  email: string;
  title: string;
  type: string;
  rate: string;
  score_points: string;
  img: string | null;
  country: string;
  is_payment: number;
  languages: string[];
  legal_fields: string[];
}

declare interface ApiResponseLawyers {
  success: boolean;
  message: string;
  data: Lawyer[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

interface Lawyer {
  id: number;
  name: string;
  email: string;
  title: string;
  type: string;
  rate: string;
  rating_count: number;
  score_points: string;
  img: string | null;
  country: string;
  is_payment: number;
  medals: string;
  education: string;
  languages: string[];
  legal_fields: string[];
}

interface LawyerApiResponse {
  success: boolean;
  message: string;
  data?: Lawyer | null; 
  error?: string;
}