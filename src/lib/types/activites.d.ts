// Interface for the overall response
interface ActivitiesResponse {
  success: boolean;
  message:string;
  data: {
    data: {
      current_page: number;
      data: HireRequest[];
      first_page_url: string;
      from: number;
      last_page: number;
      last_page_url: string;
      links: PaginationLink[];
      next_page_url: string | null;
      path: string;
      per_page: number;
      prev_page_url: string | null;
      to: number;
      total: number;
    } | null;
  } | null;

  error?: string;
}
interface Service {
  created_at: string;
  description: string;
  icon: string;
  id: number;
  name: string;
  price: string;
  translations: ServiceTranslation[];
  updated_at: string;
}

interface HireRequest {
    id: number;
    created_at: string;
    first_name: string;
    last_name: string;
    message: string;
    service_id: number;
    user_id: number;
    lawyer_id: string;
    status: string;
    summary: string;
    accepted_by: number | null;
    is_rated: number;
    service: Service;
    files?: string[];
    name?: string;
    email?: string;
    mobile?: string;
    accepted_by?:string | null;
    isSentOffer?:boolean;
    icon?:string | null;
      created_at: string;
  icon: string;
  price: string;
  updated_at: string;
 
}
interface HireRequestResponse {
  success: boolean;
  message: string;
  data: HireRequest;
  error?: string;
}
interface Service {
  id: number;
  name: string;
  description: string;
  translations: Translation[];
}

interface Translation {
  id: number;
  platform_services_id: number;
  locale: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}
interface RateFormData {
  rating: string;
  message: string;
}


declare interface PlatformService {
  id: number;
  icon: string;
  price: string;
  legal_field_id: number;
  max_price: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  locale: string;
}

declare interface lawyersService {
  offer_id: number;
  lawyer_id:number;
  price: string;
  is_active: boolean;
  offer_created_at: string;
  lawyer_name: string;
  email: string;
  mobile: string;
  rate: string;
  img: string;
}
