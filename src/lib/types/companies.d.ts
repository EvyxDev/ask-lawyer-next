declare interface companies {
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

declare interface ApiResponseCompanies {
  success: boolean;
  message: string;
  data: companies[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

interface company {
  id: number;
  name: string;
  email: string;
  title: string;
  bio_company:string;
  website_company:string;
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

interface CompanyApiResponse {
  success: boolean;
  message: string;
  data?: company | null; 
  error?: string;
}